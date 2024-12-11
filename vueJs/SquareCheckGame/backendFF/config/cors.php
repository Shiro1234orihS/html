<?php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // Autoriser toutes les méthodes (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['*'], // Autoriser toutes les origines (peut être restreint à ['https://example.com'])

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'], // Autoriser tous les headers

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
