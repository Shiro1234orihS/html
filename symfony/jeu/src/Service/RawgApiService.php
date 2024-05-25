<?php
// src/Service/RawgApiService.php

namespace App\Service;

use GuzzleHttp\Client;

class RawgApiService
{
    private $client;
    private $apiKey;

    public function __construct(string $apiKey)
    {
        $this->apiKey = $apiKey;
        $this->client = new Client([
            'base_uri' => 'https://api.rawg.io/api/',
            'timeout'  => 2.0,
        ]);
    }

    public function getGames(array $parameters = [])
    {
        $parameters['key'] = $this->apiKey;
        $response = $this->client->request('GET', 'games', [
            'query' => $parameters
        ]);

        return json_decode($response->getBody()->getContents(), true);
    }
}
