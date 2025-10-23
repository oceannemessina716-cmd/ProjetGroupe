
// contacts.js - Gestion complète des contacts (ajout, suppression, affichage)

// Initialisation avec quelques contacts par défaut
if (!localStorage.getItem("contacts")) {
  const initialContacts = [
    { nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com", telephone: "123456789" },
    { nom: "Martin", prenom: "Alice", email: "alice.martin@email.com", telephone: "987654321" },
    { nom: "Durand", prenom: "Paul", email: "paul.durand@email.com", telephone: "456789123" },
  ];
  localStorage.setItem("contacts", JSON.stringify(initialContacts));
}

// ---- Fonctions principales ----
function getContacts() {
  return JSON.parse(localStorage.getItem("contacts")) || [];
}

function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

// Ajouter un contact
function addContact(contact) {
  const contacts = getContacts();
  contacts.push(contact);
  saveContacts(contacts);
}

// Supprimer un contact
function deleteContact(index) {
  const contacts = getContacts();
  contacts.splice(index, 1);
  saveContacts(contacts);
  displayContacts();
}

// Afficher tous les contacts (pour liste.html)
function displayContacts() {
  const container = document.getElementById("contactList");
  if (!container) return;

  const contacts = getContacts();
  container.innerHTML = "";

  contacts.forEach((c, i) => {
    const card = document.createElement("div");
    card.className = "card mb-3 p-3 shadow-sm";

    card.innerHTML = `
      <h5>${c.prenom} ${c.nom}</h5>
      <p>Email : ${c.email}</p>
      <p>Téléphone : ${c.telephone}</p>
      <button class="btn btn-danger btn-sm" onclick="deleteContact(${i})">Supprimer</button>
    `;

    container.appendChild(card);
  });
}

// ---- Ajout d’un contact via le formulaire (ajouter.html) ----
function handleAddContact(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const telephone = document.getElementById("telephone").value.trim();

  if (!nom || !prenom || !email || !telephone) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  const newContact = { nom, prenom, email, telephone };
  addContact(newContact);

  alert("✅ Contact ajouté avec succès !");
  document.getElementById("contactForm").reset();

  // Redirige automatiquement vers la liste
  setTimeout(() => {
    window.location.href = "liste.html";
  }, 1000);
}

// ---- Initialisation automatique pour la page liste.html ----
document.addEventListener("DOMContentLoaded", displayContacts);
