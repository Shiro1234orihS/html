if (window.innerWidth > 600) {
    document.querySelectorAll('.sidebar a').forEach(function(link) {
        link.onmouseover = function() {
            this.querySelector('.text').style.display = 'inline';
        };
        link.onmouseout = function() {
            this.querySelector('.text').style.display = 'none';
        };
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.sidebar a');
    let cursor = document.querySelector(".custom-cursor");
    let cursorbefore = document.querySelector(".custom-cursor-before");

    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        sections.forEach(section => section.classList.add('hidden'));
        
        const id = link.getAttribute('href').substring(1); 
        document.getElementById(id).classList.remove('hidden');
      });

      // Ajouter un événement pour changer l'apparence du curseur lorsqu'il survole un lien
      link.addEventListener('mouseover', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorbefore.style.transform = 'scale(1.5)';
        cursor.style.backgroundColor = 'white'; 
        cursorbefore.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; 
      });

      link.addEventListener('mouseout', () => {
        cursor.style.transform = 'scale(1)';
        cursorbefore.style.transform = 'scale(1)';
        cursor.style.backgroundColor = 'black'; // Revenir à la couleur originale
        cursorbefore.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'; // Revenir à la couleur originale

      });
    });
    
    document.addEventListener("mousemove",function(e){
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
  
        cursorbefore.style.left = e.clientX + 'px';
        cursorbefore.style.top = e.clientY + 'px';
    });
});

function ouvrirPDF() {
    window.open('ressource/cv/cv_anglais.pdf');
}

function ouvrirPDF1() {
    window.open('ressource/cv/cv_français.pdf');
}


document.getElementById('francais').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirige vers la version français
});

document.getElementById('portugais').addEventListener('click', function() {
    window.location.href = 'index-pt.html'; // Redirige vers la version portugais
});

document.getElementById('anglais').addEventListener('click', function() {
    window.location.href = 'index-an.html'; // Redirige vers la version anglaise
});
