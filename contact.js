// contacts.js - Gère l'ajout, la suppression et l'affichage des contacts

// Initialisation avec quelques contacts par défaut
if (!localStorage.getItem('contacts')) {
    const initialContacts = [
        {nom:"Dupont", prenom:"Jean", email:"jean.dupont@email.com", telephone:"123456789"},
        {nom:"Martin", prenom:"Alice", email:"alice.martin@email.com", telephone:"987654321"},
        {nom:"Durand", prenom:"Paul", email:"paul.durand@email.com", telephone:"456789123"}
    ];
    localStorage.setItem('contacts', JSON.stringify(initialContacts));
}

// Fonction pour récupérer les contacts
function getContacts() {
    return JSON.parse(localStorage.getItem('contacts')) || [];
}

// Ajouter un contact
function addContact(contact) {
    const contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Supprimer un contact par index
function deleteContact(index) {
    const contacts = getContacts();
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
}
