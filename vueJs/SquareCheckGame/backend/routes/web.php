<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\DB;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/test-db', function () {
    try {
        DB::connection()->getPdo();
        return "Connexion à la base de données réussie !";
    } catch (\Exception $e) {
        return "Erreur de connexion à la base de données : " . $e->getMessage();
    }
});

Route::get('/users', [UserController::class, 'index']); 
Route::get('/users/{user}', [UserController::class, 'show']); 
Route::post('/users', [UserController::class, 'store']); 
Route::patch('/users/{user}', [UserController::class, 'update']); 
Route::delete('/users/{user}', [UserController::class, 'destroy']);