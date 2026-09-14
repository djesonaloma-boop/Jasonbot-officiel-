// ==========================================
// JASONBOT AI - SUPPORT
// ==========================================

const WHATSAPP_NUMBER = "243847500590";

const DEFAULT_WHATSAPP_MESSAGE =
  "Bonjour JASONBOT, j'ai besoin d'aide concernant votre plateforme.";

const supportForm = document.getElementById("supportForm");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("messageInput");
const successMessage = document.getElementById("successMessage");
const ticketsList = document.getElementById("ticketsList");
const whatsappLink = document.getElementById("whatsappLink");


// ==========================================
// WHATSAPP
// ==========================================

const whatsappMessage = encodeURIComponent(
  DEFAULT_WHATSAPP_MESSAGE
);

whatsappLink.href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;


// ==========================================
// RÉCUPÉRER LES DEMANDES
// ==========================================

function getTickets() {
  try {
    return JSON.parse(
      localStorage.getItem("jasonbot_support") || "[]"
    );
  } catch (error) {
    return [];
  }
}


// ==========================================
// SAUVEGARDER LES DEMANDES
// ==========================================

function saveTickets(tickets) {
  localStorage.setItem(
    "jasonbot_support",
    JSON.stringify(tickets)
  );
}


// ==========================================
// ID DE TICKET
// ==========================================

function generateTicketId() {
  const random = Math.floor(
    10000 + Math.random() * 90000
  );

  return `SUP-${random}`;
}


// ==========================================
// AFFICHER LES DEMANDES
// ==========================================

function renderTickets() {

  const tickets = getTickets();

  ticketsList.innerHTML = "";

  if (tickets.length === 0) {

    ticketsList.innerHTML = `
      <div class="empty">
        Aucune demande pour le moment.
      </div>
    `;

    return;
  }

  tickets
    .slice()
    .reverse()
    .forEach(ticket => {

      const div = document.createElement("div");

      div.className = "ticket";

      div.innerHTML = `
        <strong>${escapeHTML(ticket.id)}</strong>

        <p>
          <b>Sujet :</b>
          ${escapeHTML(ticket.subject)}
        </p>

        <p>
          ${escapeHTML(ticket.message)}
        </p>

        <span class="status">
          ${escapeHTML(ticket.status)}
        </span>
      `;

      ticketsList.appendChild(div);
    });
}


// ==========================================
// ENVOYER UNE DEMANDE
// ==========================================

supportForm.addEventListener("submit", function(event) {

  event.preventDefault();

  const subject = subjectInput.value.trim();
  const message = messageInput.value.trim();

  if (!subject || !message) {
    return;
  }

  const tickets = getTickets();

  const newTicket = {

    id: generateTicketId(),

    subject: subject,

    message: message,

    status: "En attente",

    createdAt: new Date().toISOString()
  };

  tickets.push(newTicket);

  saveTickets(tickets);

  supportForm.reset();

  successMessage.textContent =
    `✓ Demande ${newTicket.id} envoyée avec succès.`;

  renderTickets();

  setTimeout(() => {
    successMessage.textContent = "";
  }, 4000);
});


// ==========================================
// PROTECTION HTML
// ==========================================

function escapeHTML(value) {

  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// ==========================================
// INITIALISATION
// ==========================================

renderTickets();