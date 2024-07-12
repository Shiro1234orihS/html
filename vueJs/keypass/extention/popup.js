//-------------------------------------------//
//          Initialize the variables         //
//-------------------------------------------//
let iduser;



//-------------------------------------------//
//          Function de connection           //
//-------------------------------------------//
document.getElementById('connection').addEventListener('click', () => {
  const username = document.querySelector('input[name="name"]').value;
  const password = document.querySelector('input[name="pass"]').value;

  const data = {
    name: username,
    password: password
  };

  // Envoyer les données à l'API
  fetch('http://ricardonunesemilio.fr:8005/login', { // Remplacez par votre URL d'API
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.length > 0 && data[0].IDUTILISTEUR) { // Vérifier si des données sont retournées et si IDUTILISTEUR existe
      console.log('Success:', data);
      iduser = data[0].IDUTILISTEUR
      alert('Login successful');
      changeDisplayOnSuccess(username); // Appel de la fonction pour changer l'affichage
    } else {
      alert('Login failed');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Failed to send data');
  });
});

//-------------------------------------------//
//          Function de ajoute de pass       //
//-------------------------------------------//
document.getElementById('myButton').addEventListener('click', () => {
  // Récupérer les valeurs des champs de texte
  const link = document.querySelector('input[name="link"]').value;
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const commentaire = document.querySelector('input[name="commentaire"]').value;

  // Créer un objet avec les données
  const data = {
    IDUTILISTEUR: iduser,
    NOMAPP: link,
    UTILISATEURAPP: username,
    MOTPASSAPP: password,
    COMMENTAIRE: commentaire
  };

  // Envoyer les données à l'API
  fetch('http://ricardonunesemilio.fr:8005/addapp', { // Remplacez par votre URL d'API
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    alert('Data sent successfully');
  })
  .catch((error) => {
    console.error('Error:', error);
    alert('Failed to send data');
  });
});

//-------------------------------------------//
//          Function de changement           //
//-------------------------------------------//
function changeDisplayOnSuccess(username) {
  // Masquer les champs de connexion
  document.querySelector('input[name="name"]').style.display = 'none';
  document.querySelector('input[name="pass"]').style.display = 'none';
  document.getElementById('connection').style.display = 'none';

  // Afficher un message de bienvenue
  const welcomeMessage = document.createElement('h2');
  welcomeMessage.textContent = `Bienvenue, ${username}!`;
  document.querySelector('.wrapper').appendChild(welcomeMessage);

  // Afficher les autres champs
  document.querySelectorAll('.container').forEach(container => {
    container.style.display = 'block';
  });
}

//-------------------------------------------//
//          Function de inicianiation        //
//-------------------------------------------//
document.querySelectorAll('.container').forEach(container => {
  if (container.querySelector('input[name="link"]') || 
      container.querySelector('input[name="username"]') || 
      container.querySelector('input[name="password"]') || 
      container.querySelector('input[name="commentaire"]')) {
    container.style.display = 'none';
  }
});
