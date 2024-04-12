@extends('layouts.header')
@section('title', 'Le Restaurant Gourmet')

<link href="{{ asset('css/home/styleHome.css') }}" rel="stylesheet">

   
@section('content')
    <section id="menu">
        <h2>Notre Menu</h2>
        <!-- Vous pouvez ajouter ici des détails sur votre menu -->
    </section>

    <section id="about">
        <h2>À Propos de Nous</h2>
        <!-- Informations sur le restaurant -->
    </section>

    <section id="contact">
        <h2>Contactez-Nous</h2>
        <!-- Détails de contact -->
    </section>

    <footer>
        <p>© 2024 Le Restaurant Gourmet</p>
    </footer>
@endsection