window.addEventListener('scroll', function() {

    console.log(window.scrollY);
    if(window.scrollY >= 0){
        let scrollValue = window.scrollY * 3; // Récupère la valeur de défilement
        let elements = document.querySelectorAll('#containerBonjour');
        elements.forEach(function(element) {
            element.style.transform = `translate(${scrollValue}px, -50%)`; // Déplace l'élément à droite
        });
    }
    
});