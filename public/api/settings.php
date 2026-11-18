<?php
declare(strict_types=1);

require __DIR__ . "/bootstrap.php";

$defaults = [
    "phoneDisplay" => "+974 7769 9786",
    "email" => "Info@nhfarabia.com",
    "salesEmail" => "Sales@nhfarabia.com",
    "location" => "Doha, Qatar",
    "crNumber" => "CR NO. 253779",
    "topNote" => "24/7 Pest Control Across Doha Qatar",
    "hours" => "24/7 across Doha",
];

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

function load_settings(array $defaults): array
{
    $pdo = database();
    if ($pdo) {
        $stored = [];
        foreach ($pdo->query("SELECT setting_key, setting_value FROM settings") as $row) {
            $stored[$row["setting_key"]] = $row["setting_value"];
        }
        return array_merge($defaults, $stored);
    }
    return array_merge($defaults, read_json("settings.json", []));
}

if ($method === "GET") {
    json_response(["settings" => load_settings($defaults)]);
}

if ($method !== "POST") {
    json_response(["error" => "Method not allowed."], 405);
}

require_admin();
$body = request_body();
$input = is_array($body["settings"] ?? null) ? $body["settings"] : [];
$settings = [];
foreach ($defaults as $key => $fallback) {
    $value = clean_text((string) ($input[$key] ?? $fallback), 160);
    $settings[$key] = $value !== "" ? $value : $fallback;
}
if (!preg_match("/^[0-9 +()-]{7,24}$/", $settings["phoneDisplay"])) {
    json_response(["error" => "Enter the phone number with digits."], 422);
}
foreach (["email", "salesEmail"] as $key) {
    if (!filter_var($settings[$key], FILTER_VALIDATE_EMAIL)) {
        json_response(["error" => "Enter a valid email address."], 422);
    }
}
$pdo = database();
if ($pdo) {
    $statement = $pdo->prepare("REPLACE INTO settings (setting_key, setting_value) VALUES (?, ?)");
    foreach ($settings as $key => $value) {
        $statement->execute([$key, $value]);
    }
} else {
    write_json("settings.json", $settings);
}
json_response(["ok" => true, "settings" => $settings]);
