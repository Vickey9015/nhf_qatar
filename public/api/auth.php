<?php
declare(strict_types=1);

require __DIR__ . "/bootstrap.php";

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

if ($method === "GET") {
    json_response([
        "setupRequired" => auth_hash() === null,
        "authenticated" => logged_in(),
        "csrf" => csrf_token(),
    ]);
}

if ($method !== "POST") {
    json_response(["error" => "Method not allowed."], 405);
}

$body = request_body();
$action = $body["action"] ?? "";

if ($action === "logout") {
    $_SESSION = [];
    session_destroy();
    json_response(["ok" => true]);
}

if ($action === "setup") {
    if (auth_hash() !== null) {
        json_response(["error" => "A password is already set."], 409);
    }
    $password = (string) ($body["password"] ?? "");
    if (strlen($password) < 8) {
        json_response(["error" => "Use at least 8 characters."], 422);
    }
    save_auth_hash(password_hash($password, PASSWORD_DEFAULT));
    session_regenerate_id(true);
    $_SESSION["admin"] = true;
    json_response(["ok" => true, "csrf" => csrf_token()]);
}

if ($action === "login") {
    $hash = auth_hash();
    if ($hash === null) {
        json_response(["error" => "Set a password first."], 409);
    }
    $fails = (int) ($_SESSION["fails"] ?? 0);
    if ($fails >= 8) {
        json_response(["error" => "Too many attempts. Try again later."], 429);
    }
    $password = (string) ($body["password"] ?? "");
    if (!password_verify($password, $hash)) {
        $_SESSION["fails"] = $fails + 1;
        json_response(["error" => "That password is not correct."], 401);
    }
    session_regenerate_id(true);
    $_SESSION["admin"] = true;
    $_SESSION["fails"] = 0;
    json_response(["ok" => true, "csrf" => csrf_token()]);
}

json_response(["error" => "Unknown action."], 400);
