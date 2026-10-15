<?php

declare(strict_types=1);

require_once __DIR__ . '/../config/bootstrap.php';

$q = trim((string) ($_GET['q'] ?? ''));
$category = trim((string) ($_GET['category'] ?? ''));
$mood = trim((string) ($_GET['mood'] ?? ''));
$budget = trim((string) ($_GET['budget'] ?? ''));

$sql = 'SELECT * FROM places WHERE 1 = 1';

$params = [];

if ($q !== '') {
    $sql .= ' AND (
        name LIKE :q1 ESCAPE \'!\'
        OR description LIKE :q2 ESCAPE \'!\'
        OR city LIKE :q3 ESCAPE \'!\'
        OR address LIKE :q4 ESCAPE \'!\'
        OR category LIKE :q5 ESCAPE \'!\'
    )';

    $escapedQuery = str_replace(
        ['!', '%', '_'],
        ['!!', '!%', '!_'],
        $q
    );

    foreach (['q1', 'q2', 'q3', 'q4', 'q5'] as $key) {
        $params[$key] = '%' . $escapedQuery . '%';
    }
}

if ($category !== '') {
    $sql .= ' AND category = :category';
    $params['category'] = $category;
}

if ($mood !== '') {
    $sql .= ' AND atmosphere = :mood';
    $params['mood'] = $mood;
}

if ($budget === 'free') {
    $sql .= ' AND price = 0';
} elseif ($budget === 'under10') {
    $sql .= ' AND price IS NOT NULL AND price <= 10';
} elseif ($budget === 'under20') {
    $sql .= ' AND price IS NOT NULL AND price <= 20';
}

$sql .= ' ORDER BY name ASC LIMIT 100';

try {
    $stmt = db()->prepare($sql);
    $stmt->execute($params);

    json_response([
        'places' => $stmt->fetchAll()
    ]);
} catch (PDOException $error) {
    error_log($error->getMessage());

    json_response([
        'error' => 'Unable to load places. Please try again.'
    ], 500);
}
