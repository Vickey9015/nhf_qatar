<?php
declare(strict_types=1);

require __DIR__ . "/bootstrap.php";

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

function load_enquiries(): array
{
    $pdo = database();
    if ($pdo) {
        $rows = $pdo->query("SELECT id, created_at, name, phone, email, property_label, service_label, message FROM enquiries ORDER BY created_at DESC LIMIT 500")->fetchAll();
        return array_map(fn ($row) => [
            "id" => $row["id"],
            "createdAt" => str_replace(" ", "T", (string) $row["created_at"]) . "Z",
            "name" => $row["name"],
            "phone" => $row["phone"],
            "email" => $row["email"],
            "property" => $row["property_label"],
            "service" => $row["service_label"],
            "message" => $row["message"],
        ], $rows);
    }
    $data = read_json("enquiries.json", ["items" => []]);
    return array_values($data["items"] ?? []);
}

if ($method === "GET") {
    if (!logged_in()) {
        json_response(["error" => "Sign in required."], 401);
    }
    json_response(["items" => load_enquiries(), "csrf" => csrf_token()]);
}

if ($method !== "POST") {
    json_response(["error" => "Method not allowed."], 405);
}

$body = request_body();
$action = $body["action"] ?? "create";

if ($action === "delete") {
    require_admin();
    $id = (string) ($body["id"] ?? "");
    $pdo = database();
    if ($pdo) {
        $statement = $pdo->prepare("DELETE FROM enquiries WHERE id = ?");
        $statement->execute([$id]);
        json_response(["ok" => true, "items" => load_enquiries()]);
    }
    $data = read_json("enquiries.json", ["items" => []]);
    $items = array_values(array_filter($data["items"] ?? [], fn ($item) => ($item["id"] ?? "") !== $id));
    write_json("enquiries.json", ["items" => $items]);
    json_response(["ok" => true, "items" => $items]);
}

if (!empty($body["website"])) {
    json_response(["ok" => true]);
}

$key = hash("sha256", (string) ($_SERVER["REMOTE_ADDR"] ?? "0"));
$pdo = database();
if ($pdo) {
    $statement = $pdo->prepare("SELECT last_at FROM rate_limits WHERE ip_hash = ?");
    $statement->execute([$key]);
    $row = $statement->fetch();
    $last = (int) (is_array($row) ? ($row["last_at"] ?? 0) : 0);
} else {
    $rate = read_json("rate.json", []);
    $last = (int) ($rate[$key] ?? 0);
}
if ($last > 0 && time() - $last < 20) {
    json_response(["error" => "Please wait a moment before sending another message."], 429);
}

$name = clean_text((string) ($body["name"] ?? ""), 120);
$phone = clean_text((string) ($body["phone"] ?? ""), 40);
$email = clean_text((string) ($body["email"] ?? ""), 160);
$message = clean_text((string) ($body["message"] ?? ""), 4000);
if ($name === "" || $phone === "" || $message === "") {
    json_response(["error" => "Name, phone, and message are required."], 422);
}
if ($email !== "" && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(["error" => "Enter a valid email, or leave it blank."], 422);
}

$item = [
    "id" => bin2hex(random_bytes(8)),
    "createdAt" => gmdate("c"),
    "name" => $name,
    "phone" => $phone,
    "email" => $email,
    "property" => clean_text((string) ($body["property"] ?? ""), 80),
    "service" => clean_text((string) ($body["service"] ?? ""), 80),
    "message" => $message,
];

if ($pdo) {
    $statement = $pdo->prepare("INSERT INTO enquiries (id, created_at, name, phone, email, property_label, service_label, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $statement->execute([
        $item["id"],
        gmdate("Y-m-d H:i:s"),
        $item["name"],
        $item["phone"],
        $item["email"],
        $item["property"],
        $item["service"],
        $item["message"],
    ]);
    $limit = $pdo->prepare("REPLACE INTO rate_limits (ip_hash, last_at) VALUES (?, ?)");
    $limit->execute([$key, time()]);
    json_response(["ok" => true]);
}
$data = read_json("enquiries.json", ["items" => []]);
$items = $data["items"] ?? [];
array_unshift($items, $item);
$items = array_slice($items, 0, 500);
write_json("enquiries.json", ["items" => $items]);
$rate[$key] = time();
write_json("rate.json", $rate);
json_response(["ok" => true]);
