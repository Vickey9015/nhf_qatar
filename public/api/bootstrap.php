<?php
declare(strict_types=1);

session_name("NHFADMIN");
session_set_cookie_params([
    "lifetime" => 0,
    "path" => "/",
    "httponly" => true,
    "samesite" => "Lax",
    "secure" => !empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off",
]);
session_start();

set_exception_handler(function (Throwable $error): void {
    $missing = $error instanceof PDOException;
    json_response([
        "error" => $missing
            ? "The database tables are missing. Import nhf.sql in phpMyAdmin."
            : "Something went wrong on the server.",
    ], 500);
});

const DATA_DIR = __DIR__ . "/../data";

function json_response(array $data, int $code = 200): void
{
    http_response_code($code);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

function read_json(string $name, array $fallback): array
{
    $path = DATA_DIR . "/" . $name;
    if (!is_file($path)) {
        return $fallback;
    }
    $decoded = json_decode((string) file_get_contents($path), true);
    return is_array($decoded) ? $decoded : $fallback;
}

function write_json(string $name, array $data): void
{
    if (!is_dir(DATA_DIR) && !mkdir(DATA_DIR, 0755, true)) {
        json_response(["error" => "The data folder is not writable on the server."], 500);
    }
    $path = DATA_DIR . "/" . $name;
    $tmp = $path . ".tmp";
    $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
    if ($json === false || file_put_contents($tmp, $json) === false || !rename($tmp, $path)) {
        json_response(["error" => "Could not save. Make the data folder writable."], 500);
    }
}

function request_body(): array
{
    $decoded = json_decode((string) file_get_contents("php://input"), true);
    return is_array($decoded) ? $decoded : [];
}

function csrf_token(): string
{
    if (empty($_SESSION["csrf"])) {
        $_SESSION["csrf"] = bin2hex(random_bytes(16));
    }
    return $_SESSION["csrf"];
}

function require_csrf(): void
{
    $sent = $_SERVER["HTTP_X_CSRF_TOKEN"] ?? "";
    $known = $_SESSION["csrf"] ?? "";
    if ($sent === "" || $known === "" || !hash_equals($known, $sent)) {
        json_response(["error" => "Session expired. Sign in again."], 403);
    }
}

function logged_in(): bool
{
    return !empty($_SESSION["admin"]);
}

function require_admin(): void
{
    if (!logged_in()) {
        json_response(["error" => "Sign in required."], 401);
    }
    require_csrf();
}

function clean_text(string $value, int $max): string
{
    $value = trim(strip_tags($value));
    if (function_exists("mb_substr")) {
        return mb_substr($value, 0, $max);
    }
    return substr($value, 0, $max);
}

function database(): ?PDO
{
    static $ready = false;
    static $pdo = null;
    if ($ready) {
        return $pdo;
    }
    $ready = true;
    $path = DATA_DIR . "/db.php";
    if (!is_file($path)) {
        return null;
    }
    $config = require $path;
    try {
        $pdo = new PDO(
            "mysql:host=" . $config["host"] . ";dbname=" . $config["name"] . ";charset=utf8mb4",
            (string) $config["user"],
            (string) $config["pass"],
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
    } catch (Throwable $error) {
        json_response(["error" => "Could not connect to the database. Import nhf.sql, then check the database login."], 500);
    }
    return $pdo;
}

function auth_hash(): ?string
{
    $pdo = database();
    if ($pdo) {
        $row = $pdo->query("SELECT password_hash FROM admins ORDER BY id ASC LIMIT 1")->fetch();
        $hash = is_array($row) ? (string) ($row["password_hash"] ?? "") : "";
        return $hash !== "" ? $hash : null;
    }
    $record = read_json("auth.json", []);
    $hash = $record["hash"] ?? "";
    return is_string($hash) && $hash !== "" ? $hash : null;
}

function save_auth_hash(string $hash): void
{
    $pdo = database();
    if ($pdo) {
        $pdo->exec("DELETE FROM admins");
        $statement = $pdo->prepare("INSERT INTO admins (password_hash) VALUES (?)");
        $statement->execute([$hash]);
        return;
    }
    write_json("auth.json", ["hash" => $hash]);
}
