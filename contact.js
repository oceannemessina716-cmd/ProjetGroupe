// contacts.js - Gestion complète des contacts (ajout, suppression, affichage)

// Initialisation avec quelques contacts par défaut
if (!localStorage.getItem("contacts")) {
  const initialContacts = [
    { nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com", telephone: "123456789", adresse: "Paris, France", dateNaissance: "1990-05-12", lieuNaissance: "Lyon" },
    { nom: "Martin", prenom: "Alice", email: "alice.martin@email.com", telephone: "987654321", adresse: "Marseille, France", dateNaissance: "1992-08-24", lieuNaissance: "Bordeaux" },
    { nom: "Durand", prenom: "Paul", email: "paul.durand@email.com", telephone: "456789123", adresse: "Toulouse, France", dateNaissance: "1988-02-10", lieuNaissance: "Nice" },
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
      <p>Adresse : ${c.adresse || "Non renseignée"}</p>
      <p>Date de naissance : ${c.dateNaissance || "Non renseignée"}</p>
      <p>Lieu de naissance : ${c.lieuNaissance || "Non renseigné"}</p>
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
  const adresse = document.getElementById("adresse")?.value.trim() || "";
  const dateNaissance = document.getElementById("dateNaissance")?.value.trim() || "";
  const lieuNaissance = document.getElementById("lieuNaissance")?.value.trim() || "";

  if (!nom || !prenom || !email || !telephone) {
    alert("Veuillez remplir tous les champs obligatoires !");
    return;
  }

  const newContact = { nom, prenom, email, telephone, adresse, dateNaissance, lieuNaissance };
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
