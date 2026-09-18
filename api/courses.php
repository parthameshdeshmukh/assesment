<?php
require_once __DIR__ . '/config.php';

$courses = [
    [
        "id" => 1,
        "title" => "Full-Stack Web Development Masterclass",
        "category" => "web-dev",
        "categoryName" => "Web Development",
        "description" => "Master HTML5, CSS3, Modern JavaScript, React, and PHP REST APIs.",
        "rating" => 4.9,
        "students" => "12,400",
        "duration" => "32 Hours",
        "badge" => "Bestseller",
        "image" => "assets/images/3d_avatar_laptop.svg"
    ],
    [
        "id" => 2,
        "title" => "Data Science & Machine Learning Fundamentals",
        "category" => "data-science",
        "categoryName" => "Data Science",
        "description" => "Learn Python, Pandas, Data Visualization, and predictive models.",
        "rating" => 4.8,
        "students" => "8,900",
        "duration" => "28 Hours",
        "badge" => "Popular",
        "image" => "assets/images/3d_avatar_waving.svg"
    ],
    [
        "id" => 3,
        "title" => "iOS & Android App Development with Flutter",
        "category" => "app-dev",
        "categoryName" => "App Development",
        "description" => "Build native cross-platform mobile apps for iOS and Android.",
        "rating" => 4.9,
        "students" => "6,750",
        "duration" => "24 Hours",
        "badge" => "Top Rated",
        "image" => "assets/images/3d_avatar_laptop.svg"
    ],
    [
        "id" => 4,
        "title" => "Modern UI/UX Design System Masterclass",
        "category" => "ui-ux",
        "categoryName" => "UI/UX Design",
        "description" => "Design human-centered web & mobile interfaces in Figma.",
        "rating" => 4.9,
        "students" => "15,200",
        "duration" => "20 Hours",
        "badge" => "Featured",
        "image" => "assets/images/3d_avatar_waving.svg"
    ]
];

$requestedCategory = isset($_GET['category']) ? $_GET['category'] : 'all';

if ($requestedCategory !== 'all') {
    $filtered = array_values(array_filter($courses, function($c) use ($requestedCategory) {
        return $c['category'] === $requestedCategory;
    }));
    sendJsonResponse(200, [
        "status" => "success",
        "count" => count($filtered),
        "data" => $filtered
    ]);
}

sendJsonResponse(200, [
    "status" => "success",
    "count" => count($courses),
    "data" => $courses
]);
