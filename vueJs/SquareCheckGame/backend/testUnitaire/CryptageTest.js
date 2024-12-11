async function testPasswordHashing() {
    const plainPassword = 'monMotDePasseSaisi';
 
    // Hacher le mot de passe
    let hashedPassword;
    try {
        hashedPassword = await cryptageMotsPasseUsers(plainPassword);
        console.log('Mot de passe haché:', hashedPassword);
    } catch (error) {
        console.error('Erreur lors du hachage du mot de passe:', error);
        return;
    }
 
    // Comparer le mot de passe
    try {
        const isMatch = await comparaition(plainPassword, hashedPassword);
        if (isMatch) {
            console.log('Le mot de passe est correct');
        } else {
            console.log('Le mot de passe est incorrect');
        }
    } catch (error) {
        console.error('Erreur lors de la comparaison des mots de passe:', error);
    }
 }