<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="{{ asset('style/herder/herder-style.css') }}" />

</head>
<body>
    <header>
        <div id = "herder-div" >
            <img src="{{ asset('picture/logo.webp') }}" alt="Logo">
            <div>
                <a href=""><p>ACCEUEIL</p></a><p id='p'>//</p>
                <a href=""><p>MENU RESTAURANT</p></a><p id='p'>//</p>
                <a href=""><p>ESPACE TRAITEUR</p></a><p id='p'>//</p>
                <a href=""><p>CONTACT</p></a>
            </div>
            <button>Reservation</button>
        </div>
    </header>
  
    @yield('content')
    
   

    
</head>
<body>



</body>

</html>
