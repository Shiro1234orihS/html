<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = ['idUser', 'speudo', 'couleur', 'motDePasse','photoDeProfil'];

    /**
     * get the reviews for the movie
     */
    public function reviews()
    {
        /**
        * Your implementation here
        */
        // return $this->hasMany(Review::class);
    }
}