<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('id'); // Supprime la colonne existante
        });

        Schema::table('users', function (Blueprint $table) {
            $table->string('id')->primary(); // Ajoute une nouvelle colonne ID de type string
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('id'); // Supprime l'identifiant actuel

            // Rétablit la colonne ID comme un entier auto-incrémenté
            $table->id();
        });
    }
};
