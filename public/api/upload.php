<?php
declare(strict_types=1);

require __DIR__ . "/bootstrap.php";

if (($_SERVER["REQUEST_METHOD"] ?? "GET") !== "POST") {
    json_response(["error" => "Method not allowed."], 405);
}

require_admin();

$file = $_FILES["image"] ?? null;
if (!is_array($file) || ($file["error"] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
    json_response(["error" => "Choose an image to upload."], 422);
}
if (($file["size"] ?? 0) > 4 * 1024 * 1024) {
    json_response(["error" => "Use an image under 4 MB."], 422);
}

$info = @getimagesize((string) $file["tmp_name"]);
$allowed = [IMAGETYPE_JPEG => "jpg", IMAGETYPE_PNG => "png", IMAGETYPE_WEBP => "webp"];
$type = is_array($info) ? ($info[2] ?? 0) : 0;
if (!isset($allowed[$type])) {
    json_response(["error" => "Use a JPG, PNG, or WebP image."], 422);
}

$dir = dirname(__DIR__) . "/images/uploads";
if (!is_dir($dir) && !mkdir($dir, 0755, true)) {
    json_response(["error" => "The uploads folder is not writable."], 500);
}

$name = "blog-" . gmdate("Ymd-His") . "-" . bin2hex(random_bytes(3)) . "." . $allowed[$type];
$target = $dir . "/" . $name;
if (!move_uploaded_file((string) $file["tmp_name"], $target)) {
    json_response(["error" => "The image could not be saved."], 500);
}

json_response(["ok" => true, "image" => "/images/uploads/" . $name]);
