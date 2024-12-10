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
        $users = User::query();        
        return response()->json($users);
     }
     

    /**
     * Stores a User in the database
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'speudo' => 'required|string|max:255',
            'motDePasse' => 'required|integer|min:1900',
            'couleur' => 'nullable|string|max:255',
            'photoDeProli' => 'nullable|string|max:255',
        ]);
    
        
        $User = User::create($validatedData);
    
        return response()->json($User, 201);
    }
        
    /**
     * Returns a single User
     */
    public function show(User $User): JsonResponse
    {
        /**
         * Your implementation here
         */
        return response()->json(['data' => $User]);
    }

    /**
     * Updates a User
     */
    public function update(Request $request, User $User)
    {
        /**
         * Your implementation here
         */
 
        $validatedData = $request->validate([
            'speudo' => 'required|string|max:255',
            'motDePasse' => 'required|integer|min:1900',
            'couleur' => 'nullable|string|max:255',
            'photoDeProli' => 'nullable|string|max:255',
        ]);
    
        // Updates the provided fields
        $User->update($validatedData);
    
        return response()->json($User, 200); // Code 200 for a successful update
    }

    /**
     * Deletes a User
     */
    public function destroy(User $User)
    {
        /**
         * Your implementation here
         */
        $User->delete();
    }
}