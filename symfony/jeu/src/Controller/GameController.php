<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\RawgApiService;

class GameController extends AbstractController
{
    #[Route('/game', name: 'app_game')]
    public function app_game(): Response
    {
        $games = $this->rawgApiService->getGames(['page_size' => 10]);  // Récupère les données de l'API
        return $this->render('games/index.html.twig', [
            'games' => $games['results'], // Assurez-vous que 'results' existe dans la réponse
        ]);
    }
}
