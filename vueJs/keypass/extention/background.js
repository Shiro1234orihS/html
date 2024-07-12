chrome.runtime.onInstalled.addListener(() => {
  console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message); // Ajoutez ceci
  if (message.type === 'passwordEntered') {
    console.log('Un mot de passe a été entré.');
    // Vous pouvez ajouter d'autres actions ici
  }
});
