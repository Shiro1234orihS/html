<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class User extends Model
{
    use HasFactory;

    // Table associée au modèle
    protected $table = 'users';

    // Les colonnes pouvant être massivement attribuées
    protected $fillable = ['id', 'speudo', 'couleur', 'motDePasse', 'photoDeProfil'];

    // Indique que la clé primaire n'est pas auto-incrémentée
    public $incrementing = false;

    // Déclare que la clé primaire est un string
    protected $keyType = 'string';

    /**
     * Événement "creating" pour générer un token unique pour l'id
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($user) {
            if (empty($user->id)) {
                $user->id = Str::uuid()->toString(); // Génère un token unique (UUID)
            }
        });
    }
}
