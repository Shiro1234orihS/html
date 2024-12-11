<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class UserController extends Controller
{
    /**
     * Returns a list of users
     */
    public function index(Request $request): JsonResponse
    {
        $users = User::all(); // Récupère tous les utilisateurs
        return response()->json($users, 200); // Renvoie le statut HTTP 200
    }

    /**
     * Stores a User in the database
     */
    public function store(Request $request): JsonResponse
    {
        $validatedData = $request->validate([
            'speudo' => 'required|string|max:255',
            'motDePasse' => 'required|string|min:6', // Mot de passe en string
            'couleur' => 'nullable|string|max:255',
            'photoDeProfil' => 'nullable|string|max:255', // Correction de photoDeProli en photoDeProfil
        ]);

        try {
            // Crée un nouvel utilisateur
            $user = User::create($validatedData);
            return response()->json($user, 201); // Succès de la création (201)
        } catch (\Exception $e) {
            return response()->json(['error' => 'Une erreur s\'est produite lors de la création de l\'utilisateur', 'message' => $e->getMessage()], 500);
        }
    }

    public function login($auth): JsonResponse
    {
        $validatedData = $request->validate([
            'speudo' => 'required|string|max:255',
            'motDePasse' => 'required|string|min:6',
        ]);

        try {
            // Rechercher l'utilisateur avec le speudo et le mot de passe
            $user = User::where('speudo', $validatedData['speudo'])
                        ->where('motDePasse', $validatedData['motDePasse'])
                        ->first();
    
            // Vérifie si l'utilisateur existe
            if (!$user) {
                return response()->json(['error' => 'Identifiants incorrects'], 401);
            }
    
            // Retourne l'utilisateur connecté
            return response()->json(['message' => 'Connexion réussie', 'user' => $user], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Une erreur s\'est produite lors de la tentative de connexion', 
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Returns a single User
     */
    public function show($id): JsonResponse
    {
        $user = User::find($id); // Récupère l'utilisateur par son ID

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }

        return response()->json(['data' => $user], 200);
    }

    /**
     * Updates a User
     */
    public function update(Request $request, $id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }

        $validatedData = $request->validate([
            'speudo' => 'sometimes|required|string|max:255',
            'motDePasse' => 'sometimes|required|string|min:6', // Correction du type integer à string
            'couleur' => 'nullable|string|max:255',
            'photoDeProfil' => 'nullable|string|max:255', // Correction de photoDeProli en photoDeProfil
        ]);

        try {
            // Met à jour les champs
            $user->update($validatedData);
            return response()->json($user, 200); // Succès de la mise à jour (200)
        } catch (\Exception $e) {
            return response()->json(['error' => 'Une erreur s\'est produite lors de la mise à jour de l\'utilisateur', 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Deletes a User
     */
    public function destroy($id): JsonResponse
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }

        try {
            $user->delete();
            return response()->json(['message' => 'Utilisateur supprimé avec succès'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Une erreur s\'est produite lors de la suppression de l\'utilisateur', 'message' => $e->getMessage()], 500);
        }
    }
}
