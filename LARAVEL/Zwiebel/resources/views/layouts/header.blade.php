<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="{{ asset('css/layouts/styleheader.css') }}" rel="stylesheet">
   
</head>
<body>
    <header>

           
        <nav>
         
            <ul>
                <img src="{{ asset('pictures/layout/logo_emtreprise.webp') }}" alt="Logo">
                <li><a href="#menu">Menu</a></li>
                <li><a href="#about">À Propos</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
        <div id="mySidenav" class="sidenav">
            <a id="closeBtn" href="#" class="close">×</a>
            <ul>
              <li><a href="#">A propos</a></li>
              <li><a href="#">Nos services</a></li>
              <li><a href="#">Témoignages</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
        </div>

        <a href="#" id="openBtn">
          <span class="burger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </a>
  
        
    </header>

    <footer>
        <p>© 2024 Le Restaurant Gourmet</p>
    </footer>

    <script src="{{ asset('js/layout/script.js') }}"></script>
</body>
</html>