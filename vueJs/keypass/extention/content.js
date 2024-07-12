document.addEventListener('input', (event) => {
    console.log('Input event detected'); // Ajoutez ceci
    if (event.target.type === 'password') {
      console.log('Password field detected'); // Ajoutez ceci
      chrome.runtime.sendMessage({type: 'passwordEntered'});
    }
  });
  