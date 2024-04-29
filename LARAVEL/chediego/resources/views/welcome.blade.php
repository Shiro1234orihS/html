@extends('layouts.herder')

<link rel="stylesheet" type="text/css" href="{{ asset('style.css') }}">

@section('title', 'Motos')

@section('content')   
<section>
    <div class="container">
        <input required type="text" name="username" class="input" id="username"> <!-- Ajout de l'id pour le label -->
        <label for="username" class="label">Username</label> <!-- Associé à l'input via 'for' -->
    </div>  
    <h1>sakl</h1>
</section>
@endsection
