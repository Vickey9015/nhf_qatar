<?php
declare(strict_types=1);

require __DIR__ . "/bootstrap.php";

function load_posts(): array
{
    $pdo = database();
    if ($pdo) {
        $rows = $pdo->query("SELECT slug, title, published_on, image, excerpt, paragraphs FROM posts ORDER BY position ASC, id ASC")->fetchAll();
        $posts = [];
        foreach ($rows as $row) {
            $paragraphs = json_decode((string) $row["paragraphs"], true);
            $posts[] = [
                "slug" => $row["slug"],
                "title" => $row["title"],
                "date" => $row["published_on"],
                "image" => $row["image"],
                "excerpt" => $row["excerpt"],
                "paragraphs" => is_array($paragraphs) ? $paragraphs : [],
            ];
        }
        return $posts;
    }
    $data = read_json("blogs.json", ["posts" => []]);
    $posts = $data["posts"] ?? [];
    return is_array($posts) ? array_values($posts) : [];
}

function store_posts(array $posts): void
{
    $pdo = database();
    if (!$pdo) {
        write_json("blogs.json", ["posts" => $posts]);
        return;
    }
    $pdo->beginTransaction();
    $pdo->exec("DELETE FROM posts");
    $statement = $pdo->prepare("INSERT INTO posts (slug, title, published_on, image, excerpt, paragraphs, position) VALUES (?, ?, ?, ?, ?, ?, ?)");
    foreach ($posts as $index => $post) {
        $statement->execute([
            $post["slug"],
            $post["title"],
            $post["date"],
            $post["image"],
            $post["excerpt"],
            json_encode($post["paragraphs"], JSON_UNESCAPED_UNICODE),
            $index,
        ]);
    }
    $pdo->commit();
}

function post_from(array $input): array
{
    $slug = strtolower(clean_text((string) ($input["slug"] ?? ""), 80));
    if (!preg_match("/^[a-z0-9]+(?:-[a-z0-9]+)*$/", $slug)) {
        json_response(["error" => "Use a short slug with letters, numbers, and hyphens."], 422);
    }
    $date = clean_text((string) ($input["date"] ?? ""), 10);
    if (!preg_match("/^\d{4}-\d{2}-\d{2}$/", $date)) {
        json_response(["error" => "Choose a valid date."], 422);
    }
    $image = trim((string) ($input["image"] ?? ""));
    if (!preg_match("#^/images/[A-Za-z0-9_./-]+$#", $image)) {
        json_response(["error" => "Choose an image from this site."], 422);
    }
    $paragraphs = [];
    foreach (($input["paragraphs"] ?? []) as $paragraph) {
        $text = clean_text((string) $paragraph, 4000);
        if ($text !== "") {
            $paragraphs[] = $text;
        }
    }
    if ($paragraphs === []) {
        json_response(["error" => "Add at least one paragraph."], 422);
    }
    $title = clean_text((string) ($input["title"] ?? ""), 160);
    $excerpt = clean_text((string) ($input["excerpt"] ?? ""), 400);
    if ($title === "" || $excerpt === "") {
        json_response(["error" => "Title and excerpt are required."], 422);
    }
    return [
        "slug" => $slug,
        "title" => $title,
        "date" => $date,
        "image" => $image,
        "excerpt" => $excerpt,
        "paragraphs" => $paragraphs,
    ];
}

$method = $_SERVER["REQUEST_METHOD"] ?? "GET";

if ($method === "GET") {
    json_response(["posts" => load_posts()]);
}

if ($method !== "POST") {
    json_response(["error" => "Method not allowed."], 405);
}

require_admin();
$body = request_body();
$action = $body["action"] ?? "";
$posts = load_posts();

if ($action === "delete") {
    $slug = (string) ($body["slug"] ?? "");
    $next = array_values(array_filter($posts, fn ($post) => ($post["slug"] ?? "") !== $slug));
    store_posts($next);
    json_response(["ok" => true, "posts" => $next]);
}

if ($action === "save") {
    $post = post_from(is_array($body["post"] ?? null) ? $body["post"] : []);
    $original = (string) ($body["originalSlug"] ?? $post["slug"]);
    $kept = [];
    $replaced = false;
    foreach ($posts as $existing) {
        $slug = $existing["slug"] ?? "";
        if ($slug === $original) {
            $kept[] = $post;
            $replaced = true;
            continue;
        }
        if ($slug === $post["slug"]) {
            json_response(["error" => "Another post already uses that slug."], 409);
        }
        $kept[] = $existing;
    }
    if (!$replaced) {
        array_unshift($kept, $post);
    }
    store_posts($kept);
    json_response(["ok" => true, "posts" => $kept]);
}

json_response(["error" => "Unknown action."], 400);
