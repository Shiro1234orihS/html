//-------------------------------------------//
//          Initialize Variables            //
//-------------------------------------------//
let iduser;
let token;
//-------------------------------------------//
//       Initialize at Extension Load        //
//-------------------------------------------//
document.addEventListener('DOMContentLoaded', function () {
  // Check for stored credentials when the extension loads
  getCredentials(function (username) {
    if (username) {
      changeDisplayOnSuccess(username);
    } else {
      console.log("Utilisateur non connecté.");
    }
  });

  // Set initial display settings
  document.querySelectorAll('.ajoutPass').forEach(container => {
    container.style.display = 'none';
  });
  document.getElementById('erreurDeConnection').style.display = 'none';
});

//-------------------------------------------//
//          Function de Connexion            //
//-------------------------------------------//
document.getElementById('connection').addEventListener('click', () => {
  const username = document.querySelector('input[name="name"]').value;
  const password = document.querySelector('input[name="pass"]').value;

  const data = {
    name: username,
    password: password
  };

  // Send data to the API
  fetch('http://ricardonunesemilio.fr:8005/login', { // Replace with your API URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      if (data.length > 0 && data[0].IDUTILISTEUR) { // Check if data is returned and IDUTILISTEUR exists
        console.log('Success:', data);
        iduser = data[0].IDUTILISTEUR;
        token =  data[0].TOKEN;
        alert('Login successful');
        changeDisplayOnSuccess(username); // Call function to change display
        saveCredentials(iduser, username , token); 
      } else {
        alert('Login failed');
        erreurDeConnection(); 
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      erreurDeConnection(); 
      alert(error);
    });
});

//-------------------------------------------//
//          Save Credentials Function        //
//-------------------------------------------//
function saveCredentials(IDUTILISTEUR, USERNAME, TOKEN) {
  chrome.storage.local.set({
    credentials: {
      iduser: IDUTILISTEUR,
      username: USERNAME,
      token : TOKEN
    }
  }, function () {
    alert("Les informations de connexion ont été enregistrées.");
    console.log(TOKEN);
  });
 
}

//-------------------------------------------//
//    Function to Add Password to Database   //
//-------------------------------------------//
document.getElementById('myButton').addEventListener('click', () => {
  // Get input values
  const link = document.querySelector('input[name="link"]').value;
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;
  const commentaire = document.querySelector('input[name="commentaire"]').value;
  let iddonsier = document.getElementById('selectfichieer').value;

  if (iddonsier ==="null") {
    iddonsier = null
  }
  // Create data object
  const data = {
    IDUTILISTEUR: iduser,
    IDDOSSIER: iddonsier,
    NOMAPP: link,
    UTILISATEURAPP: username,
    COMMENTAIRE: commentaire,
    MOTPASSAPP: password,
    TOKEN : token 
  };

  console.log('Success:', data);
  // Send data to the API
  fetch('http://ricardonunesemilio.fr:8005/addapp', { // Replace with your API URL
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
     
      alert('Failed to send data');
    });
});

//-------------------------------------------//
//        Display Change on Success          //
//-------------------------------------------//
function changeDisplayOnSuccess(username) {
  // Hide the login fields
  document.querySelector('.connecter').style.display = 'none';

  // Show a welcome message
  document.getElementById('bonjour').textContent = `Bienvenue, ${username}!`;

  // Show other fields
  document.querySelectorAll('.ajoutPass').forEach(container => {
    container.style.display = 'block';
  });


  chercheDossier(iduser)
}

//-------------------------------------------//
//         Handle Connection Error           //
//-------------------------------------------//
function erreurDeConnection() {
  document.getElementById('erreurDeConnection').style.display = 'block'; // Change 'relative' to 'block'
}

//-------------------------------------------//
//         Get Credentials Function          //
//-------------------------------------------//
function getCredentials(callback) {
  chrome.storage.local.get(['credentials'], function (result) {
    if (result.credentials && result.credentials.username) {
      iduser = result.credentials.iduser;
      token = result.credentials.token;
      callback(result.credentials.username); // Call callback with the username
    } else {
      callback(null); // No credentials found
    }
  });
}

//-------------------------------------------//
//         Get Name DosSIER                  //
//-------------------------------------------//

function chercheDossier(iduser) {
  // Effectuer une requête GET avec l'ID utilisateur
  fetch(`http://ricardonunesemilio.fr:8005/getdossierid/${iduser}`)
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
      const selectElement = document.getElementById('selectfichieer'); // Récupérer l'élément <select>

      // Parcourir les données reçues et créer une option pour chaque élément
      data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.IDDOSSIER; // Utilisez l'attribut pertinent de votre réponse API
        option.text = item.NOMDOSSIER; // Utilisez l'attribut pertinent de votre réponse API
        selectElement.add(option); // Ajouter l'option au <select>
      });
    })
    .catch(error => console.error('Erreur:', error)); // Gérer les erreurs éventuelles
}
//-------------------------------------------//
//         Deconection du compte             //
//-------------------------------------------//
document.getElementById("deconnection").addEventListener("click",()=>{
    // Hide the login fields
    document.querySelector('.connecter').style.display = 'block';
    document.querySelectorAll('.ajoutPass').forEach(container => {
      container.style.display = 'none';
    });
    // Show other fields
    document.querySelectorAll('.ajoutPass').forEach(container => {
      container.style.display = 'none';
    });
    chrome.storage.local.remove('credentials')
});


document.getElementById('setPassword').addEventListener("click", () => {
  const length = parseInt(document.getElementById('nb').value); // Convertit la valeur en entier
  let charset = "abcdefghijklmnopqrstuvwxyz";
  
  // Vérifie si la checkbox pour les majuscules est cochée
  if (document.getElementById('maj').checked) {
    charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }
  // Vérifie si la checkbox pour les nombres est cochée
  if (document.getElementById('nb2').checked) {
    charset += "0123456789";
  }
  // Vérifie si la checkbox pour les caractères spéciaux est cochée
  if (document.getElementById('cs').checked) {
    charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
  }

  let password = "";
  for (let i = 0; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  // Assigne le mot de passe généré à l'élément avec l'ID 'pass'
  document.getElementById('pass').value = password;
});
