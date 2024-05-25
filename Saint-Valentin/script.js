let titreHerder = document.title;

var messages = [
    'Aller bebou 🥶', 
    'Rien qu une fois 🥶', 
    'Je prend les capotes 🥶', 
    'Un petit UNO 🥶', 
    'Dernière chance ! 🥶'
];

var currentIndex = 0;

document.getElementById('yesButton').addEventListener('click', function() {
    
    // Actions après réponse "oui"
    // Réinitialise le texte du bouton non pour la prochaine fois
    currentIndex = 0;
    document.getElementById('noButton').textContent = 'Non 🥶';
    yesButton.style.fontSize = taille2;
});

document.getElementById('noButton').addEventListener('click', function() {
    // Augmente la taille du bouton "oui"
   
    var currentFontSize = window.getComputedStyle(yesButton, null).getPropertyValue('font-size');
    var currentSize = parseFloat(currentFontSize);
    yesButton.style.fontSize = (currentSize + 2) + 'px'; // Augmente la taille de la police de 2px

    var currentPadding = window.getComputedStyle(yesButton, null).getPropertyValue('padding');
    var currentPaddingNumbers = currentPadding.match(/\d+/g).map(Number); // Extrait les nombres du padding
    yesButton.style.padding = `${currentPaddingNumbers[0] + 2}px ${currentPaddingNumbers[1] + 5}px`; // Augmente le padding verticalement et horizontalement

    // Change le texte du bouton "non" à chaque clic, parcourt la liste des messages
    var noButton = document.getElementById('noButton');
    if (currentIndex < messages.length) {
        noButton.textContent = messages[currentIndex++];
    } else {
        currentIndex = 0 
    }
});
function changeFavicon(src) {
    var link = document.createElement('link'),
    oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'icon';
    link.href = src;
    if (oldLink) {
     document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}
 
 
window.addEventListener("blur",()=>{
    document.title = "NON!!!!!!!!!!! REVIENT 😨😥"
    changeFavicon('lesIcons/iconAttention.png');
})

window.addEventListener("focus",() =>{
    document.title = titreHerder;  
    changeFavicon('lesIcons/Icon.png');
})


function createHearts(button) {
    var heartCount = 10;
    var rect = button.getBoundingClientRect();
    var buttonCenterX = rect.left + rect.width / 2;
    var buttonCenterY = rect.top + rect.height / 2;

    for (var i = 0; i < heartCount; i++) {
        // Créer l'élément cœur
        var heart = document.createElement('div');
        heart.classList.add('heart');

        // Positionner le cœur sur le bouton
        heart.style.top = buttonCenterY + 'px';
        heart.style.left = buttonCenterX + 'px';

        // Ajouter le cœur au corps de la page
        document.body.appendChild(heart);

        // Définir un délai pour que les cœurs apparaissent séquentiellement
        (function(heartEl, index) {
            setTimeout(function() {
                // Déterminer la position en X en fonction de l'index pour espacer horizontalement
                heartEl.style.left = (buttonCenterX + (index * 5) - (heartCount * 5) / 2) + 'px';
                heartEl.classList.add('is-active');

                // Retirer le cœur après l'animation
                setTimeout(function() {
                    heartEl.remove();
                }, 3000); // correspond à la durée de l'animation
            }, index * 100); // Chaque cœur apparaîtra avec un délai de 100ms
        })(heart, i);
    }
}


// N'oubliez pas d'ajouter cette fonction à l'événement onclick de votre bouton.

