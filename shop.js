/* =========================================================
   JASONBOT AI — SHOP.JS
   Boutique + commandes + solde + fidélité
   ========================================================= */

"use strict";


/* =========================================================
   CONFIGURATION FIDÉLITÉ
   10 POINTS = 1 000 FC dépensés
   100 POINTS = 1 000 FC à la conversion
   ========================================================= */

const POINTS_PAR_1000_FC = 10;

const FC_PAR_CONVERSION = 1000;

const POINTS_MIN_CONVERSION = 100;


/* =========================================================
   SERVICES PAR DÉFAUT
   ========================================================= */

const DEFAULT_SERVICES = [

  {
    id:"site",
    name:"Création de site web",
    category:"creation",
    icon:"fa-solid fa-globe",
    description:"Site professionnel, vitrine, boutique ou plateforme.",
    price:10000
  },

  {
    id:"application",
    name:"Création d'application",
    category:"creation",
    icon:"fa-solid fa-mobile-screen-button",
    description:"Application mobile ou web adaptée à ton projet.",
    price:20000
  },

  {
    id:"chanson",
    name:"Création de chanson",
    category:"media",
    icon:"fa-solid fa-music",
    description:"Création musicale personnalisée avec IA et direction artistique.",
    price:10000
  },

  {
    id:"video",
    name:"Création vidéo IA",
    category:"media",
    icon:"fa-solid fa-video",
    description:"Vidéo publicitaire, musicale, storytelling ou réseaux sociaux.",
    price:15000
  },

  {
    id:"affiche",
    name:"Création d'affiche",
    category:"media",
    icon:"fa-solid fa-image",
    description:"Affiche professionnelle pour événement, concert ou publicité.",
    price:5000
  },

  {
    id:"logo",
    name:"Création de logo",
    category:"creation",
    icon:"fa-solid fa-pen-nib",
    description:"Logo moderne et identité visuelle.",
    price:5000
  },

  {
    id:"cv",
    name:"Création de CV",
    category:"redaction",
    icon:"fa-solid fa-file-lines",
    description:"CV professionnel et moderne.",
    price:5000
  },

  {
    id:"chatbot",
    name:"Création de chatbot",
    category:"ia",
    icon:"fa-solid fa-robot",
    description:"Assistant intelligent personnalisé.",
    price:25000
  },

  {
    id:"api",
    name:"Création d'API",
    category:"ia",
    icon:"fa-solid fa-code",
    description:"API et intégration de services.",
    price:20000
  },

  {
    id:"jeux",
    name:"Création de jeu",
    category:"creation",
    icon:"fa-solid fa-gamepad",
    description:"Concept et développement de jeu.",
    price:20000
  },

  {
    id:"traduction",
    name:"Traduction",
    category:"redaction",
    icon:"fa-solid fa-language",
    description:"Traduction de textes et documents.",
    price:3000
  },

  {
    id:"redaction",
    name:"Rédaction",
    category:"redaction",
    icon:"fa-solid fa-pen",
    description:"Textes, descriptions, publications et documents.",
    price:3000
  },

  {
    id:"marketing",
    name:"Marketing digital",
    category:"marketing",
    icon:"fa-solid fa-bullhorn",
    description:"Stratégie et contenu marketing.",
    price:5000
  },

  {
    id:"promotion-sociale",
    name:"Promotion réseaux sociaux",
    category:"marketing",
    icon:"fa-solid fa-share-nodes",
    description:"Préparation de campagnes et objectifs de promotion.",
    price:5000
  },

  {
    id:"projet-ia",
    name:"Projet IA",
    category:"ia",
    icon:"fa-solid fa-wand-magic-sparkles",
    description:"Conception d'un projet utilisant l'intelligence artificielle.",
    price:10000
  }

];


/* =========================================================
   RÉSEAUX SOCIAUX
   ========================================================= */

const SOCIAL_PLATFORMS = [

  {
    id:"facebook",
    name:"Facebook",
    icon:"fa-brands fa-facebook",
    color:"#1877F2"
  },

  {
    id:"instagram",
    name:"Instagram",
    icon:"fa-brands fa-instagram",
    color:"#E4405F"
  },

  {
    id:"tiktok",
    name:"TikTok",
    icon:"fa-brands fa-tiktok",
    color:"#ffffff"
  },

  {
    id:"youtube",
    name:"YouTube",
    icon:"fa-brands fa-youtube",
    color:"#FF0000"
  },

  {
    id:"whatsapp",
    name:"WhatsApp",
    icon:"fa-brands fa-whatsapp",
    color:"#25D366"
  },

  {
    id:"telegram",
    name:"Telegram",
    icon:"fa-brands fa-telegram",
    color:"#229ED9"
  },

  {
    id:"snapchat",
    name:"Snapchat",
    icon:"fa-brands fa-snapchat",
    color:"#FFD600"
  },

  {
    id:"x",
    name:"X / Twitter",
    icon:"fa-brands fa-x-twitter",
    color:"#ffffff"
  },

  {
    id:"linkedin",
    name:"LinkedIn",
    icon:"fa-brands fa-linkedin",
    color:"#0A66C2"
  },

  {
    id:"pinterest",
    name:"Pinterest",
    icon:"fa-brands fa-pinterest",
    color:"#E60023"
  },

  {
    id:"spotify",
    name:"Spotify",
    icon:"fa-brands fa-spotify",
    color:"#1DB954"
  }

];


/* =========================================================
   TARIFS SOCIAUX
   ========================================================= */

const SOCIAL_RATES = {

  facebook:{
    followers:1000,
    likes:500,
    comments:800,
    views:300,
    shares:600
  },

  instagram:{
    followers:1000,
    likes:500,
    comments:800,
    views:300,
    shares:600
  },

  tiktok:{
    followers:900,
    likes:400,
    comments:700,
    views:250,
    shares:500
  },

  youtube:{
    followers:1200,
    likes:600,
    comments:900,
    views:350,
    shares:700
  },

  whatsapp:{
    followers:1000,
    likes:500,
    comments:800,
    views:300,
    shares:600
  },

  telegram:{
    followers:800,
    likes:400,
    comments:700,
    views:300,
    shares:500
  },

  snapchat:{
    followers:1000,
    likes:500,
    comments:800,
    views:300,
    shares:600
  },

  x:{
    followers:1000,
    likes:500,
    comments:800,
    views:300,
    shares:600
  },

  linkedin:{
    followers:1500,
    likes:700,
    comments:1000,
    views:500,
    shares:800
  },

  pinterest:{
    followers:900,
    likes:450,
    comments:700,
    views:300,
    shares:500
  },

  spotify:{
    followers:1200,
    likes:600,
    comments:900,
    views:350,
    shares:700
  }

};


/* =========================================================
   VARIABLES
   ========================================================= */

let services = [];

let currentService = null;

let currentCategory = "all";

let selectedSocialPlatform = "";

let selectedSocialType = "";

let socialQuantity = 0;

let orderProcessing = false;


/* =========================================================
   DOM
   ========================================================= */

const servicesGrid =
  document.getElementById("servicesGrid");

const noResults =
  document.getElementById("noResults");

const searchInput =
  document.getElementById("searchInput");

const modal =
  document.getElementById("serviceModal");

const closeModal =
  document.getElementById("closeModal");

const modalTitle =
  document.getElementById("modalTitle");

const modalSubtitle =
  document.getElementById("modalSubtitle");

const selectedServiceId =
  document.getElementById("selectedServiceId");

const projectName =
  document.getElementById("projectName");

const projectType =
  document.getElementById("projectType");

const projectTypeGroup =
  document.getElementById("projectTypeGroup");

const dynamicOptions =
  document.getElementById("dynamicOptions");

const colorOptions =
  document.getElementById("colorOptions");

const projectLinkGroup =
  document.getElementById("projectLinkGroup");

const contextualLink =
  document.getElementById("contextualLink");

const projectFiles =
  document.getElementById("projectFiles");

const fileLabel =
  document.getElementById("fileLabel");

const fileHelp =
  document.getElementById("fileHelp");

const fileList =
  document.getElementById("fileList");

const projectDescription =
  document.getElementById("projectDescription");

const descriptionCount =
  document.getElementById("descriptionCount");

const projectNotes =
  document.getElementById("projectNotes");

const projectSummary =
  document.getElementById("projectSummary");

const totalPrice =
  document.getElementById("totalPrice");

const submitOrder =
  document.getElementById("submitOrder");

const socialSection =
  document.getElementById("socialSection");

const socialPlatforms =
  document.getElementById("socialPlatforms");

const socialTypes =
  document.getElementById("socialTypes");

const socialQuantityInput =
  document.getElementById("socialQuantity");

const socialQuantityLabel =
  document.getElementById("socialQuantityLabel");

const socialSelectedPlatform =
  document.getElementById("socialSelectedPlatform");

const socialSelectedType =
  document.getElementById("socialSelectedType");

const socialSelectedQuantity =
  document.getElementById("socialSelectedQuantity");

const socialEstimatedPrice =
  document.getElementById("socialEstimatedPrice");

const aiHelp =
  document.getElementById("aiHelp");

const aiSuggestion =
  document.getElementById("aiSuggestion");


/* =========================================================
   CLIENT + SYNCHRONISATION
   ========================================================= */

function getClient(){

  try{

    let client =
      JSON.parse(
        localStorage.getItem(
          "jasonbot_client"
        ) || "null"
      );

    if(!client){

      return null;

    }


    let clients = [];

    try{

      clients =
        JSON.parse(
          localStorage.getItem(
            "jasonbot_clients"
          ) || "[]"
        );

    }catch(error){

      clients = [];

    }


    if(!Array.isArray(clients)){

      clients = [];

    }


    /*
      Le client actuellement connecté
      reste prioritaire pour son solde
      et ses points.
    */

    if(client.id){

      const index =
        clients.findIndex(
          item =>
            item.id === client.id
        );


      if(index !== -1){

        const storedClient =
          clients[index];


        client = {

          ...storedClient,

          ...client,

          balance:
            Number(
              client.balance ??
              storedClient.balance ??
              0
            ),

          points:
            Number(
              client.points ??
              storedClient.points ??
              0
            )

        };


        clients[index] =
          client;

      }

    }


    /*
      Sauvegarde du client connecté.
    */

    localStorage.setItem(
      "jasonbot_client",
      JSON.stringify(client)
    );


    localStorage.setItem(
      "jasonbot_clients",
      JSON.stringify(clients)
    );


    /*
      Anciennes clés.
    */

    localStorage.setItem(
      "jasonbot_balance",
      String(
        Number(client.balance || 0)
      )
    );


    localStorage.setItem(
      "jasonbot_points",
      String(
        Number(client.points || 0)
      )
    );


    return client;

  }catch(error){

    console.error(
      "Erreur récupération client :",
      error
    );

    return null;

  }

}


/* =========================================================
   SAUVEGARDER LE CLIENT
   ========================================================= */

function saveClient(client){

  if(!client){

    return false;

  }


  client.balance =
    Number(client.balance || 0);


  client.points =
    Number(client.points || 0);


  localStorage.setItem(
    "jasonbot_client",
    JSON.stringify(client)
  );


  let clients = [];

  try{

    clients =
      JSON.parse(
        localStorage.getItem(
          "jasonbot_clients"
        ) || "[]"
      );

  }catch(error){

    clients = [];

  }


  if(!Array.isArray(clients)){

    clients = [];

  }


  if(client.id){

    const index =
      clients.findIndex(
        item =>
          item.id === client.id
      );


    if(index !== -1){

      clients[index] = {

        ...clients[index],

        ...client,

        balance:
          client.balance,

        points:
          client.points

      };

    }else{

      clients.push(client);

    }

  }


  localStorage.setItem(
    "jasonbot_clients",
    JSON.stringify(clients)
  );


  localStorage.setItem(
    "jasonbot_balance",
    String(client.balance)
  );


  localStorage.setItem(
    "jasonbot_points",
    String(client.points)
  );


  return true;

}


/* =========================================================
   GAGNER DES POINTS
   ========================================================= */

function calculateEarnedPoints(price){

  const amount =
    Number(price || 0);


  if(
    !Number.isFinite(amount) ||
    amount <= 0
  ){

    return 0;

  }


  return Math.floor(
    amount / 1000
  ) *
  POINTS_PAR_1000_FC;

}


/* =========================================================
   AJOUTER LES POINTS
   ========================================================= */

function addLoyaltyPoints(
  client,
  price
){

  if(!client){

    return 0;

  }


  const earned =
    calculateEarnedPoints(price);


  if(earned <= 0){

    return 0;

  }


  client.points =
    Number(client.points || 0) +
    earned;


  return earned;

}


/* =========================================================
   DÉBITER LE SOLDE
   ========================================================= */

function debitBalance(
  client,
  price
){

  if(!client){

    return false;

  }


  const amount =
    Number(price || 0);


  const balance =
    Number(client.balance || 0);


  if(
    !Number.isFinite(amount) ||
    amount <= 0
  ){

    return false;

  }


  if(
    !Number.isFinite(balance) ||
    balance < amount
  ){

    return false;

  }


  client.balance =
    balance - amount;


  return true;

}


/* =========================================================
   CHARGER LES SERVICES
   ========================================================= */

function loadServices(){

  let saved = [];


  try{

    saved =
      JSON.parse(
        localStorage.getItem(
          "jasonbot_services"
        ) || "[]"
      );

  }catch(error){

    saved = [];

  }


  if(!Array.isArray(saved)){

    saved = [];

  }


  const savedMap =
    new Map(
      saved.map(
        item => [
          item.id,
          item
        ]
      )
    );


  services =
    DEFAULT_SERVICES.map(
      service => {

        const custom =
          savedMap.get(
            service.id
          );


        return {

          ...service,

          ...(custom || {})

        };

      }
    );


  renderServices();

}


/* =========================================================
   AFFICHAGE SERVICES
   ========================================================= */

function renderServices(){

  if(!servicesGrid){

    return;

  }


  const search =
    (
      searchInput?.value ||
      ""
    )
    .trim()
    .toLowerCase();


  const filtered =
    services.filter(
      service => {

        const categoryMatch =
          currentCategory === "all" ||
          service.category ===
          currentCategory;


        const text =
          `${service.name} ${service.description} ${service.category}`
          .toLowerCase();


        const searchMatch =
          !search ||
          text.includes(search);


        return (
          categoryMatch &&
          searchMatch
        );

      }
    );


  servicesGrid.innerHTML =
    "";


  if(noResults){

    noResults.classList.toggle(
      "hidden",
      filtered.length > 0
    );

  }


  filtered.forEach(
    service => {

      const card =
        document.createElement(
          "article"
        );


      card.className =
        "serviceCard";


      card.innerHTML = `

        <div class="serviceIcon">

          <i class="${escapeHTML(
            service.icon
          )}"></i>

        </div>

        <h3>
          ${escapeHTML(
            service.name
          )}
        </h3>

        <p>
          ${escapeHTML(
            service.description || ""
          )}
        </p>

        <div class="price">

          À partir de
          ${formatFC(service.price)}

        </div>

        <button
          class="openBtn"
          data-service="${escapeHTML(
            service.id
          )}"
          type="button"
        >
          Créer une commande
        </button>

      `;


      servicesGrid.appendChild(
        card
      );

    }
  );


  document
    .querySelectorAll(".openBtn")
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openService(
              button.dataset.service
            );

          }
        );

      }
    );

}


/* =========================================================
   CATÉGORIES
   ========================================================= */

document
  .querySelectorAll(".category")
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".category"
            )
            .forEach(
              btn =>
                btn.classList.remove(
                  "active"
                )
            );


          button.classList.add(
            "active"
          );


          currentCategory =
            button.dataset.category;


          renderServices();

        }
      );

    }
  );


if(searchInput){

  searchInput.addEventListener(
    "input",
    renderServices
  );

}


/* =========================================================
   OUVRIR SERVICE
   ========================================================= */

function openService(id){

  currentService =
    services.find(
      service =>
        service.id === id
    );


  if(!currentService){

    return;

  }


  resetForm();


  if(selectedServiceId){

    selectedServiceId.value =
      currentService.id;

  }


  if(modalTitle){

    modalTitle.textContent =
      currentService.name;

  }


  if(modalSubtitle){

    modalSubtitle.textContent =
      currentService.description ||
      "";

  }


  if(projectTypeGroup){

    projectTypeGroup.classList.remove(
      "hidden"
    );

  }


  setupProjectTypes();

  setupDynamicOptions();

  setupContextualReference();

  setupFiles();


  if(
    id === "promotion-sociale"
  ){

    if(socialSection){

      socialSection.classList.remove(
        "hidden"
      );

    }


    if(projectTypeGroup){

      projectTypeGroup.classList.add(
        "hidden"
      );

    }


    renderSocialPlatforms();

  }else{

    if(socialSection){

      socialSection.classList.add(
        "hidden"
      );

    }

  }


  updatePrice();

  updateSummary();


  if(modal){

    modal.classList.add(
      "show"
    );

  }


  document.body.style.overflow =
    "hidden";

}


/* =========================================================
   FERMER
   ========================================================= */

function closeServiceModal(){

  if(modal){

    modal.classList.remove(
      "show"
    );

  }


  document.body.style.overflow =
    "";

}


if(closeModal){

  closeModal.addEventListener(
    "click",
    closeServiceModal
  );

}


if(modal){

  modal.addEventListener(
    "click",
    event => {

      if(
        event.target === modal
      ){

        closeServiceModal();

      }

    }
  );

}


/* =========================================================
   RESET
   ========================================================= */

function resetForm(){

  if(projectName){

    projectName.value =
      "";

  }


  if(projectType){

    projectType.innerHTML =
      "";

  }


  if(dynamicOptions){

    dynamicOptions.innerHTML =
      "";

  }


  if(contextualLink){

    contextualLink.value =
      "";

  }


  if(projectDescription){

    projectDescription.value =
      "";

  }


  if(projectNotes){

    projectNotes.value =
      "";

  }


  if(projectFiles){

    projectFiles.value =
      "";

  }


  if(fileList){

    fileList.innerHTML =
      "";

  }


  if(colorOptions){

    colorOptions.classList.add(
      "hidden"
    );

  }


  if(projectLinkGroup){

    projectLinkGroup.classList.add(
      "hidden"
    );

  }


  if(descriptionCount){

    descriptionCount.textContent =
      "0";

  }


  if(aiSuggestion){

    aiSuggestion.textContent =
      "";

  }


  selectedSocialPlatform =
    "";

  selectedSocialType =
    "";

  socialQuantity =
    0;


  if(socialQuantityInput){

    socialQuantityInput.value =
      "";

  }


  if(socialSelectedPlatform){

    socialSelectedPlatform.textContent =
      "—";

  }


  if(socialSelectedType){

    socialSelectedType.textContent =
      "—";

  }


  if(socialSelectedQuantity){

    socialSelectedQuantity.textContent =
      "0";

  }


  if(socialEstimatedPrice){

    socialEstimatedPrice.textContent =
      "0 FC";

  }


  document
    .querySelectorAll(
      ".socialCard"
    )
    .forEach(
      card =>
        card.classList.remove(
          "active"
        )
    );


  document
    .querySelectorAll(
      ".socialType"
    )
    .forEach(
      button =>
        button.classList.remove(
          "active"
        )
    );

}


/* =========================================================
   TYPES DE PROJET
   ========================================================= */

function setupProjectTypes(){

  const types = {

    site:[
      "Site vitrine",
      "Boutique en ligne",
      "Portfolio",
      "Blog",
      "Plateforme",
      "Landing page",
      "Autre"
    ],

    application:[
      "Application Android",
      "Application iOS",
      "Application web",
      "Application hybride",
      "Plateforme complète",
      "Autre"
    ],

    chanson:[
      "Chanson originale",
      "Jingle",
      "Gospel",
      "Anniversaire",
      "Mariage",
      "Dédicace",
      "Hommage",
      "Publicité",
      "Autre"
    ],

    video:[
      "Clip musical",
      "Publicité",
      "Vidéo événementielle",
      "Storytelling",
      "Vidéo TikTok",
      "Vidéo YouTube",
      "Présentation",
      "Vidéo IA",
      "Autre"
    ],

    affiche:[
      "Concert",
      "Anniversaire",
      "Événement",
      "Publicité",
      "Église",
      "Entreprise",
      "Invitation",
      "Autre"
    ],

    logo:[
      "Logo entreprise",
      "Logo marque",
      "Logo association",
      "Logo artiste",
      "Logo événement",
      "Logo personnel",
      "Autre"
    ],

    cv:[
      "CV professionnel",
      "CV étudiant",
      "CV créatif",
      "CV simple",
      "CV international"
    ],

    chatbot:[
      "Assistant client",
      "Chatbot WhatsApp",
      "Chatbot site web",
      "Assistant IA",
      "Service client",
      "Assistant entreprise",
      "Autre"
    ],

    api:[
      "API IA",
      "API paiement",
      "API chatbot",
      "API musicale",
      "API réseaux sociaux",
      "API personnalisée",
      "Autre"
    ],

    jeux:[
      "Jeu mobile",
      "Jeu web",
      "Jeu éducatif",
      "Jeu arcade",
      "Jeu aventure",
      "Autre"
    ],

    traduction:[
      "Document",
      "Site web",
      "Sous-titres",
      "Audio",
      "Vidéo",
      "Texte"
    ],

    redaction:[
      "Article",
      "Description",
      "Publication",
      "Lettre",
      "Discours",
      "Biographie",
      "Publicité",
      "Autre"
    ],

    marketing:[
      "Campagne",
      "Publicité",
      "Stratégie",
      "Réseaux sociaux",
      "Lancement",
      "Promotion"
    ],

    "projet-ia":[
      "Chatbot IA",
      "Générateur de contenu",
      "Assistant IA",
      "Application IA",
      "API IA",
      "Automatisation",
      "Autre"
    ]

  };


  if(!projectType){

    return;

  }


  const list =
    types[
      currentService.id
    ] ||
    [
      "Projet personnalisé"
    ];


  list.forEach(
    type => {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        type;

      option.textContent =
        type;


      projectType.appendChild(
        option
      );

    }
  );

}


/* =========================================================
   OPTIONS DYNAMIQUES
   ========================================================= */

function setupDynamicOptions(){

  const id =
    currentService.id;

  let html =
    "";


  if(id === "site"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Nombre de pages
          </label>

          <input
            data-option="pages"
            type="number"
            min="1"
            placeholder="Ex : 5"
          >

        </div>

        <div class="formGroup">

          <label>
            Paiement
          </label>

          <select data-option="payment">

            <option>
              Pas de paiement
            </option>

            <option>
              Mobile Money
            </option>

            <option>
              Carte bancaire
            </option>

            <option>
              Les deux
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Connexion utilisateur
          </label>

          <select data-option="auth">

            <option>
              Non
            </option>

            <option>
              Oui
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            API
          </label>

          <select data-option="api">

            <option>
              Aucune
            </option>

            <option>
              API personnalisée
            </option>

            <option>
              API externe
            </option>

          </select>

        </div>

        <div class="formGroup full">

          <label>
            Fonctionnalités
          </label>

          <textarea
            data-option="features"
            placeholder="Ex : espace client, paiement, recherche, notifications..."
          ></textarea>

        </div>

      </div>

    `;

    showColors();

  }


  else if(id === "application"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Plateforme
          </label>

          <select data-option="platform">

            <option>
              Android
            </option>

            <option>
              iOS
            </option>

            <option>
              Web
            </option>

            <option>
              Android + iOS
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Connexion
          </label>

          <select data-option="auth">

            <option>
              Non
            </option>

            <option>
              Email
            </option>

            <option>
              Google
            </option>

            <option>
              Email + Google
            </option>

          </select>

        </div>

        <div class="formGroup full">

          <label>
            Fonctionnalités
          </label>

          <textarea
            data-option="features"
            placeholder="Décris les fonctionnalités de l'application..."
          ></textarea>

        </div>

        <div class="formGroup full">

          <label>
            Paiement
          </label>

          <textarea
            data-option="payment"
            placeholder="Ex : Airtel Money, Orange Money, M-Pesa..."
          ></textarea>

        </div>

      </div>

    `;

    showColors();

  }


  else if(id === "chanson"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Style musical
          </label>

          <input
            data-option="style"
            placeholder="Ex : Afrobeat gospel mélodique"
          >

        </div>

        <div class="formGroup">

          <label>
            Langue
          </label>

          <input
            data-option="language"
            placeholder="Français, Lingala, Anglais..."
          >

        </div>

        <div class="formGroup">

          <label>
            Voix
          </label>

          <select data-option="voice">

            <option>
              Homme
            </option>

            <option>
              Femme
            </option>

            <option>
              Duo
            </option>

            <option>
              Chœur
            </option>

            <option>
              Instrumental
            </option>

            <option>
              Libre
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Ambiance
          </label>

          <input
            data-option="mood"
            placeholder="Joy festive, triste, énergique..."
          >

        </div>

        <div class="formGroup">

          <label>
            Durée souhaitée
          </label>

          <select data-option="duration">

            <option>
              Courte
            </option>

            <option>
              Environ 2 min
            </option>

            <option>
              Environ 3 min
            </option>

            <option>
              Environ 4 min
            </option>

            <option>
              Longue
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Thème
          </label>

          <input
            data-option="theme"
            placeholder="Sujet de la chanson"
          >

        </div>

        <div class="formGroup">

          <label>
            Instruments
          </label>

          <input
            data-option="instruments"
            placeholder="Piano, guitare, batterie..."
          >

        </div>

        <div class="formGroup">

          <label>
            Structure
          </label>

          <input
            data-option="structure"
            placeholder="Intro, couplet, refrain..."
          >

        </div>

        <div class="formGroup full">

          <label>
            Paroles / idées
          </label>

          <textarea
            data-option="lyrics"
            placeholder="Écris tes paroles ou simplement tes idées..."
          ></textarea>

        </div>

      </div>

    `;

  }


  else if(id === "video"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Durée
          </label>

          <select data-option="duration">

            <option>
              15 secondes
            </option>

            <option>
              30 secondes
            </option>

            <option>
              1 minute
            </option>

            <option>
              2 minutes
            </option>

            <option>
              3 minutes
            </option>

            <option>
              Plus long
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Format
          </label>

          <select data-option="format">

            <option>
              9:16 — TikTok / Reels / Shorts
            </option>

            <option>
              16:9 — YouTube
            </option>

            <option>
              1:1 — Carré
            </option>

            <option>
              4:5
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Style
          </label>

          <input
            data-option="style"
            placeholder="Cinématique, réaliste, animé..."
          >

        </div>

        <div class="formGroup">

          <label>
            Voix
          </label>

          <select data-option="voice">

            <option>
              Aucune
            </option>

            <option>
              Voix masculine
            </option>

            <option>
              Voix féminine
            </option>

            <option>
              Libre
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Sous-titres
          </label>

          <select data-option="subtitles">

            <option>
              Non
            </option>

            <option>
              Oui
            </option>

            <option>
              Automatiques
            </option>

          </select>

        </div>

        <div class="formGroup full">

          <label>
            Scénario
          </label>

          <textarea
            data-option="script"
            placeholder="Décris les scènes, les personnages et ce qui doit se passer..."
          ></textarea>

        </div>

      </div>

    `;

  }


  else if(id === "affiche"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Titre de l'affiche
          </label>

          <input
            data-option="title"
            placeholder="Ex : Grande soirée"
          >

        </div>

        <div class="formGroup">

          <label>
            Date
          </label>

          <input
            data-option="date"
            placeholder="Ex : 12.12.2026"
          >

        </div>

        <div class="formGroup">

          <label>
            Heure
          </label>

          <input
            data-option="time"
            placeholder="Ex : 18h00"
          >

        </div>

        <div class="formGroup">

          <label>
            Lieu
          </label>

          <input
            data-option="venue"
            placeholder="Lieu de l'événement"
          >

        </div>

        <div class="formGroup">

          <label>
            Prix / billet
          </label>

          <input
            data-option="ticket"
            placeholder="Ex : 2500 FC"
          >

        </div>

        <div class="formGroup">

          <label>
            Contact
          </label>

          <input
            data-option="contact"
            placeholder="Numéro / contact"
          >

        </div>

        <div class="formGroup">

          <label>
            Format
          </label>

          <select data-option="format">

            <option>
              4:5
            </option>

            <option>
              1:1
            </option>

            <option>
              16:9
            </option>

            <option>
              A4
            </option>

            <option>
              Story 9:16
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Invités
          </label>

          <input
            data-option="guests"
            placeholder="Noms des invités"
          >

        </div>

        <div class="formGroup full">

          <label>
            Texte supplémentaire
          </label>

          <textarea
            data-option="text"
            placeholder="Toutes les informations à afficher..."
          ></textarea>

        </div>

      </div>

    `;

    showColors();

  }


  else if(id === "logo"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Nom de marque
          </label>

          <input
            data-option="brand"
            placeholder="Nom de la marque"
          >

        </div>

        <div class="formGroup">

          <label>
            Slogan
          </label>

          <input
            data-option="slogan"
            placeholder="Slogan facultatif"
          >

        </div>

        <div class="formGroup">

          <label>
            Activité
          </label>

          <input
            data-option="activity"
            placeholder="Ex : musique, boutique, technologie..."
          >

        </div>

        <div class="formGroup">

          <label>
            Style
          </label>

          <select data-option="style">

            <option>
              Moderne
            </option>

            <option>
              Minimaliste
            </option>

            <option>
              Luxe
            </option>

            <option>
              Technologique
            </option>

            <option>
              Créatif
            </option>

            <option>
              Sportif
            </option>

            <option>
              Libre
            </option>

          </select>

        </div>

        <div class="formGroup full">

          <label>
            Symbole / idée
          </label>

          <textarea
            data-option="symbol"
            placeholder="Explique le symbole ou l'idée que tu veux..."
          ></textarea>

        </div>

      </div>

    `;

    showColors();

  }


  else if(id === "cv"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Métier recherché
          </label>

          <input
            data-option="job"
            placeholder="Ex : développeur"
          >

        </div>

        <div class="formGroup">

          <label>
            Expérience
          </label>

          <textarea
            data-option="experience"
            placeholder="Expériences professionnelles..."
          ></textarea>

        </div>

        <div class="formGroup">

          <label>
            Formation
          </label>

          <textarea
            data-option="education"
            placeholder="Études et diplômes..."
          ></textarea>

        </div>

        <div class="formGroup">

          <label>
            Compétences
          </label>

          <textarea
            data-option="skills"
            placeholder="Compétences principales..."
          ></textarea>

        </div>

        <div class="formGroup full">

          <label>
            Langues
          </label>

          <input
            data-option="languages"
            placeholder="Français, Anglais..."
          >

        </div>

      </div>

    `;

  }


  else if(id === "chatbot"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Fonction
          </label>

          <input
            data-option="function"
            placeholder="Ex : assistant client"
          >

        </div>

        <div class="formGroup">

          <label>
            Plateforme
          </label>

          <input
            data-option="platform"
            placeholder="Site web, WhatsApp, application..."
          >

        </div>

        <div class="formGroup">

          <label>
            Langue
          </label>

          <input
            data-option="language"
            placeholder="Français, Lingala..."
          >

        </div>

        <div class="formGroup">

          <label>
            Modèle / API
          </label>

          <input
            data-option="model"
            placeholder="Si tu en as un souhaité"
          >

        </div>

        <div class="formGroup full">

          <label>
            Fonctionnalités
          </label>

          <textarea
            data-option="features"
            placeholder="Que doit faire le chatbot ?"
          ></textarea>

        </div>

      </div>

    `;

  }


  else if(id === "api"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Fonction de l'API
          </label>

          <input
            data-option="function"
            placeholder="Ex : génération musicale"
          >

        </div>

        <div class="formGroup">

          <label>
            Authentification
          </label>

          <select data-option="auth">

            <option>
              API Key
            </option>

            <option>
              Bearer Token
            </option>

            <option>
              OAuth
            </option>

            <option>
              Aucune
            </option>

          </select>

        </div>

        <div class="formGroup">

          <label>
            Base de données
          </label>

          <input
            data-option="database"
            placeholder="SQLite, Firebase, Supabase..."
          >

        </div>

        <div class="formGroup">

          <label>
            Modèle / fournisseur
          </label>

          <input
            data-option="provider"
            placeholder="Fournisseur ou modèle souhaité"
          >

        </div>

        <div class="formGroup full">

          <label>
            Endpoints / fonctionnalités
          </label>

          <textarea
            data-option="endpoints"
            placeholder="Décris les endpoints ou fonctions souhaitées..."
          ></textarea>

        </div>

      </div>

    `;

  }


  else if(id === "traduction"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Langue source
          </label>

          <input
            data-option="source"
            placeholder="Français"
          >

        </div>

        <div class="formGroup">

          <label>
            Langue cible
          </label>

          <input
            data-option="target"
            placeholder="Anglais"
          >

        </div>

        <div class="formGroup full">

          <label>
            Texte à traduire
          </label>

          <textarea
            data-option="text"
            placeholder="Colle le texte ici..."
          ></textarea>

        </div>

      </div>

    `;

  }


  else if(id === "redaction"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Type de texte
          </label>

          <input
            data-option="type"
            placeholder="Article, publication, lettre..."
          >

        </div>

        <div class="formGroup">

          <label>
            Ton
          </label>

          <input
            data-option="tone"
            placeholder="Professionnel, simple, dynamique..."
          >

        </div>

        <div class="formGroup">

          <label>
            Public
          </label>

          <input
            data-option="audience"
            placeholder="Clients, jeunes, entreprise..."
          >

        </div>

        <div class="formGroup">

          <label>
            Longueur
          </label>

          <input
            data-option="length"
            placeholder="Courte, moyenne, longue..."
          >

        </div>

      </div>

    `;

  }


  else if(id === "jeux"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Plateforme
          </label>

          <input
            data-option="platform"
            placeholder="Android, Web..."
          >

        </div>

        <div class="formGroup">

          <label>
            Genre
          </label>

          <input
            data-option="genre"
            placeholder="Arcade, aventure..."
          >

        </div>

        <div class="formGroup full">

          <label>
            Concept
          </label>

          <textarea
            data-option="concept"
            placeholder="Décris le jeu..."
          ></textarea>

        </div>

      </div>

    `;

  }


  else if(id === "marketing"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Objectif
          </label>

          <input
            data-option="objective"
            placeholder="Vendre, faire connaître..."
          >

        </div>

        <div class="formGroup">

          <label>
            Plateformes
          </label>

          <input
            data-option="platforms"
            placeholder="Facebook, Instagram..."
          >

        </div>

        <div class="formGroup full">

          <label>
            Public cible
          </label>

          <textarea
            data-option="audience"
            placeholder="Décris ton public cible..."
          ></textarea>

        </div>

      </div>

    `;

  }


  else if(id === "projet-ia"){

    html = `

      <div class="dynamicGrid">

        <div class="formGroup">

          <label>
            Type de projet IA
          </label>

          <input
            data-option="projectType"
            placeholder="Assistant, générateur..."
          >

        </div>

        <div class="formGroup">

          <label>
            Modèle / API souhaité
          </label>

          <input
            data-option="model"
            placeholder="Si tu en as un souhaité"
          >

        </div>

        <div class="formGroup full">

          <label>
            Fonctionnement souhaité
          </label>

          <textarea
            data-option="description"
            placeholder="Explique ce que ton IA doit faire..."
          ></textarea>

        </div>

      </div>

    `;

  }


  if(dynamicOptions){

    dynamicOptions.innerHTML =
      html;

  }

}


/* =========================================================
   COULEURS
   ========================================================= */

function showColors(){

  if(colorOptions){

    colorOptions.classList.remove(
      "hidden"
    );

  }

}


/* =========================================================
   RÉFÉRENCE
   ========================================================= */

function setupContextualReference(){

  if(!currentService){

    return;

  }


  const id =
    currentService.id;


  if(projectLinkGroup){

    projectLinkGroup.classList.add(
      "hidden"
    );

  }


  if(contextualLink){

    contextualLink.required =
      false;

    contextualLink.value =
      "";

  }


  if(
    id === "site" ||
    id === "application" ||
    id === "chatbot" ||
    id === "api" ||
    id === "projet-ia"
  ){

    if(projectLinkGroup){

      projectLinkGroup.classList.remove(
        "hidden"
      );

    }


    const label =
      document.getElementById(
        "projectLinkLabel"
      );


    const help =
      document.getElementById(
        "contextualLinkHelp"
      );


    if(label){

      label.textContent =
        "Lien du projet existant (facultatif)";

    }


    if(contextualLink){

      contextualLink.placeholder =
        "https://...";

    }


    if(help){

      help.textContent =
        "Facultatif : utile uniquement si tu as déjà un projet ou une référence.";

    }

  }

}


/* =========================================================
   FICHIERS
   ========================================================= */

function setupFiles(){

  if(!currentService){

    return;

  }


  const id =
    currentService.id;


  if(!projectFiles){

    return;

  }


  projectFiles.accept =
    "";


  if(fileLabel){

    fileLabel.textContent =
      "Fichiers de référence facultatifs";

  }


  if(fileHelp){

    fileHelp.textContent =
      "Tu peux envoyer des fichiers si tu en as.";

  }


  if(id === "chanson"){

    if(fileLabel){

      fileLabel.textContent =
        "Référence audio facultative";

    }


    if(fileHelp){

      fileHelp.textContent =
        "Maquette, voix, instrumental ou référence audio.";

    }


    projectFiles.accept =
      "audio/*";

  }


  else if(id === "video"){

    if(fileLabel){

      fileLabel.textContent =
        "Images / vidéos facultatives";

    }


    if(fileHelp){

      fileHelp.textContent =
        "Images ou vidéos de référence.";

    }


    projectFiles.accept =
      "image/*,video/*";

  }


  else if(
    id === "affiche" ||
    id === "logo"
  ){

    projectFiles.accept =
      "image/*,.pdf";

  }


  else if(
    id === "chatbot" ||
    id === "api" ||
    id === "projet-ia"
  ){

    projectFiles.accept =
      ".pdf,.doc,.docx,.txt,.csv,image/*";

  }


  else if(
    id === "site" ||
    id === "application"
  ){

    projectFiles.accept =
      "image/*,.pdf";

  }

}


/* =========================================================
   FICHIERS — AFFICHAGE
   ========================================================= */

if(projectFiles){

  projectFiles.addEventListener(
    "change",
    () => {

      const files =
        Array.from(
          projectFiles.files || []
        );


      if(!files.length){

        if(fileList){

          fileList.textContent =
            "";

        }

        return;

      }


      if(fileList){

        fileList.textContent =
          files
            .map(
              file =>
                `✓ ${file.name}`
            )
            .join(" • ");

      }


      updateSummary();

    }
  );

}


/* =========================================================
   RÉSEAUX SOCIAUX
   ========================================================= */

function renderSocialPlatforms(){

  if(!socialPlatforms){

    return;

  }


  socialPlatforms.innerHTML =
    "";


  SOCIAL_PLATFORMS.forEach(
    platform => {

      const button =
        document.createElement(
          "button"
        );


      button.type =
        "button";


      button.className =
        "socialCard";


      button.dataset.platform =
        platform.id;


      button.innerHTML = `

        <i
          class="${escapeHTML(
            platform.icon
          )}"
          style="color:${platform.color}"
        ></i>

        <small>
          ${escapeHTML(
            platform.name
          )}
        </small>

      `;


      button.addEventListener(
        "click",
        () => {

          selectSocialPlatform(
            platform.id
          );

        }
      );


      socialPlatforms.appendChild(
        button
      );

    }
  );

}


/* =========================================================
   PLATEFORME SOCIALE
   ========================================================= */

function selectSocialPlatform(id){

  selectedSocialPlatform =
    id;


  document
    .querySelectorAll(
      ".socialCard"
    )
    .forEach(
      card => {

        card.classList.toggle(
          "active",
          card.dataset.platform ===
          id
        );

      }
    );


  const platform =
    SOCIAL_PLATFORMS.find(
      item =>
        item.id === id
    );


  if(socialSelectedPlatform){

    socialSelectedPlatform.textContent =
      platform
        ? platform.name
        : "—";

  }


  calculateSocialPrice();

}


/* =========================================================
   TYPE SOCIAL
   ========================================================= */

document
  .querySelectorAll(
    ".socialType"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          selectedSocialType =
            button.dataset.socialType;


          document
            .querySelectorAll(
              ".socialType"
            )
            .forEach(
              btn =>
                btn.classList.remove(
                  "active"
                )
            );


          button.classList.add(
            "active"
          );


          const labels = {

            followers:
              "Nombre d'abonnés souhaités",

            likes:
              "Nombre de likes souhaités",

            comments:
              "Nombre de commentaires souhaités",

            views:
              "Nombre de vues souhaitées",

            shares:
              "Nombre de partages souhaités"

          };


          if(socialQuantityLabel){

            socialQuantityLabel.textContent =
              labels[
                selectedSocialType
              ] ||
              "Quantité souhaitée";

          }


          const names = {

            followers:
              "Abonnés",

            likes:
              "Likes",

            comments:
              "Commentaires",

            views:
              "Vues",

            shares:
              "Partages"

          };


          if(socialSelectedType){

            socialSelectedType.textContent =
              names[
                selectedSocialType
              ] ||
              "—";

          }


          calculateSocialPrice();

        }
      );

    }
  );


/* =========================================================
   QUANTITÉ SOCIALE
   ========================================================= */

if(socialQuantityInput){

  socialQuantityInput.addEventListener(
    "input",
    calculateSocialPrice
  );

}


/* =========================================================
   CALCUL SOCIAL
   ========================================================= */

function calculateSocialPrice(){

  socialQuantity =
    Math.max(
      0,
      Number(
        socialQuantityInput?.value ||
        0
      )
    );


  if(socialSelectedQuantity){

    socialSelectedQuantity.textContent =
      formatNumber(
        socialQuantity
      );

  }


  if(
    !selectedSocialPlatform ||
    !selectedSocialType ||
    socialQuantity <= 0
  ){

    if(socialEstimatedPrice){

      socialEstimatedPrice.textContent =
        "0 FC";

    }


    updatePrice();

    updateSummary();

    return;

  }


  const rates =
    SOCIAL_RATES[
      selectedSocialPlatform
    ];


  const rate =
    rates
      ? Number(
          rates[
            selectedSocialType
          ] || 0
        )
      : 0;


  const price =
    Math.ceil(
      (
        socialQuantity /
        1000
      ) *
      rate
    );


  if(socialEstimatedPrice){

    socialEstimatedPrice.textContent =
      formatFC(price);

  }


  updatePrice();

  updateSummary();

}


/* =========================================================
   CALCUL PRIX
   ========================================================= */

function calculatePrice(){

  if(!currentService){

    return 0;

  }


  if(
    currentService.id ===
    "promotion-sociale"
  ){

    const rates =
      SOCIAL_RATES[
        selectedSocialPlatform
      ];


    if(
      !rates ||
      !selectedSocialType ||
      socialQuantity <= 0
    ){

      return Number(
        currentService.price ||
        0
      );

    }


    return Math.ceil(
      (
        socialQuantity /
        1000
      ) *
      Number(
        rates[
          selectedSocialType
        ] || 0
      )
    );

  }


  let price =
    Number(
      currentService.price ||
      0
    );


  const id =
    currentService.id;


  if(id === "site"){

    const pages =
      Number(
        document.querySelector(
          '[data-option="pages"]'
        )?.value ||
        0
      );


    if(pages > 5){

      price +=
        (
          pages - 5
        ) *
        1000;

    }

  }


  if(id === "video"){

    const duration =
      document.querySelector(
        '[data-option="duration"]'
      )?.value ||
      "";


    if(
      duration ===
      "3 minutes"
    ){

      price +=
        5000;

    }


    if(
      duration ===
      "Plus long"
    ){

      price +=
        10000;

    }

  }


  if(id === "affiche"){

    const format =
      document.querySelector(
        '[data-option="format"]'
      )?.value ||
      "";


    if(format === "A4"){

      price +=
        1000;

    }

  }


  return price;

}


/* =========================================================
   AFFICHAGE PRIX
   ========================================================= */

function updatePrice(){

  const price =
    calculatePrice();


  if(totalPrice){

    totalPrice.textContent =
      formatFC(price);

  }

}


/* =========================================================
   DONNÉES DYNAMIQUES
   ========================================================= */

function getDynamicData(){

  const data = {};


  document
    .querySelectorAll(
      "[data-option]"
    )
    .forEach(
      element => {

        const key =
          element.dataset.option;


        data[key] =
          element.value;

      }
    );


  return data;

}


/* =========================================================
   RÉSUMÉ
   ========================================================= */

function updateSummary(){

  if(
    !currentService ||
    !projectSummary
  ){

    return;

  }


  const lines = [];


  lines.push(
    `Service : ${currentService.name}`
  );


  if(
    projectName?.value.trim()
  ){

    lines.push(
      `Projet : ${projectName.value.trim()}`
    );

  }


  if(
    projectType?.value
  ){

    lines.push(
      `Type : ${projectType.value}`
    );

  }


  if(
    currentService.id ===
    "promotion-sociale"
  ){

    const platform =
      SOCIAL_PLATFORMS.find(
        item =>
          item.id ===
          selectedSocialPlatform
      );


    lines.push(
      `Plateforme : ${
        platform
          ? platform.name
          : "—"
      }`
    );


    lines.push(
      `Objectif : ${
        socialSelectedType?.textContent ||
        "—"
      }`
    );


    lines.push(
      `Quantité : ${
        formatNumber(
          socialQuantity
        )
      }`
    );


    lines.push(
      `Lien : ${
        projectLinkValue()
      }`
    );

  }


  const dynamic =
    getDynamicData();


  Object.keys(
    dynamic
  ).forEach(
    key => {

      if(dynamic[key]){

        lines.push(
          `${formatOptionName(key)} : ${dynamic[key]}`
        );

      }

    }
  );


  if(
    currentService.id !==
      "promotion-sociale" &&
    contextualLink?.value.trim()
  ){

    lines.push(
      `Référence : ${contextualLink.value.trim()}`
    );

  }


  if(
    projectDescription?.value.trim()
  ){

    lines.push(
      `Description : ${projectDescription.value.trim()}`
    );

  }


  if(
    projectNotes?.value.trim()
  ){

    lines.push(
      `Notes : ${projectNotes.value.trim()}`
    );

  }


  const files =
    Array.from(
      projectFiles?.files || []
    );


  if(files.length){

    lines.push(
      `Fichiers : ${
        files
          .map(
            file =>
              file.name
          )
          .join(", ")
      }`
    );

  }


  lines.push(
    `Prix estimatif : ${formatFC(
      calculatePrice()
    )}`
  );


  projectSummary.textContent =
    lines.join("\n");

}


/* =========================================================
   LIEN SOCIAL
   ========================================================= */

function projectLinkValue(){

  return (
    contextualLink?.value.trim() ||
    "Non renseigné"
  );

}


/* =========================================================
   NOMS DES OPTIONS
   ========================================================= */

function formatOptionName(key){

  const names = {

    pages:"Pages",
    payment:"Paiement",
    auth:"Connexion",
    api:"API",
    features:"Fonctionnalités",
    platform:"Plateforme",
    style:"Style",
    language:"Langue",
    voice:"Voix",
    mood:"Ambiance",
    duration:"Durée",
    theme:"Thème",
    instruments:"Instruments",
    structure:"Structure",
    lyrics:"Paroles / idées",
    format:"Format",
    subtitles:"Sous-titres",
    script:"Scénario",
    title:"Titre",
    date:"Date",
    time:"Heure",
    venue:"Lieu",
    ticket:"Prix",
    contact:"Contact",
    guests:"Invités",
    text:"Texte",
    brand:"Marque",
    slogan:"Slogan",
    activity:"Activité",
    symbol:"Symbole",
    job:"Métier",
    experience:"Expérience",
    education:"Formation",
    skills:"Compétences",
    languages:"Langues",
    function:"Fonction",
    model:"Modèle/API",
    database:"Base de données",
    provider:"Fournisseur",
    endpoints:"Endpoints",
    source:"Langue source",
    target:"Langue cible",
    tone:"Ton",
    audience:"Public",
    length:"Longueur",
    genre:"Genre",
    concept:"Concept",
    objective:"Objectif",
    platforms:"Plateformes",
    projectType:"Type de projet",
    description:"Description"

  };


  return (
    names[key] ||
    key
  );

}


/* =========================================================
   DESCRIPTION
   ========================================================= */

if(projectDescription){

  projectDescription.addEventListener(
    "input",
    () => {

      if(descriptionCount){

        descriptionCount.textContent =
          projectDescription.value.length;

      }


      updateSummary();

    }
  );

}


/* =========================================================
   CHANGEMENTS FORMULAIRE
   ========================================================= */

document.addEventListener(
  "input",
  event => {

    if(
      event.target.closest(
        "#serviceModal"
      )
    ){

      updatePrice();

      updateSummary();

    }

  }
);


document.addEventListener(
  "change",
  event => {

    if(
      event.target.closest(
        "#serviceModal"
      )
    ){

      updatePrice();

      updateSummary();

    }

  }
);


/* =========================================================
   IA
   ========================================================= */

if(aiHelp){

  aiHelp.addEventListener(
    "click",
    async () => {

      const description =
        projectDescription?.value.trim() ||
        "";


      if(!description){

        if(aiSuggestion){

          aiSuggestion.textContent =
            "Écris d'abord ton idée du projet.";

        }

        return;

      }


      if(aiSuggestion){

        aiSuggestion.textContent =
          "✨ Analyse de ton idée...";

      }


      try{

        const response =
          await fetch(
            "/api/ai",
            {

              method:"POST",

              headers:{
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify({

                  message:
                    `Améliore cette idée pour une commande JASONBOT AI : ${description}`,

                  prompt:
                    "Transforme cette idée en brief professionnel clair."

                })

            }
          );


        if(response.ok){

          const data =
            await response.json();


          const result =
            data.answer ||
            data.message ||
            data.response ||
            data.text;


          if(result){

            projectDescription.value =
              result;


            if(descriptionCount){

              descriptionCount.textContent =
                result.length;

            }


            if(aiSuggestion){

              aiSuggestion.textContent =
                "✓ Idée améliorée avec l'assistant IA.";

            }


            updateSummary();

            return;

          }

        }

      }catch(error){

        console.log(
          "API IA indisponible."
        );

      }


      const improved =
        improveLocally(
          description
        );


      projectDescription.value =
        improved;


      if(descriptionCount){

        descriptionCount.textContent =
          improved.length;

      }


      if(aiSuggestion){

        aiSuggestion.textContent =
          "✓ Brief amélioré localement.";

      }


      updateSummary();

    }
  );

}


/* =========================================================
   AMÉLIORATION LOCALE
   ========================================================= */

function improveLocally(text){

  const service =
    currentService
      ? currentService.name
      : "projet";


  return (
    `Créer un ${service} professionnel et moderne. ` +
    `Objectif : ${text}. ` +
    `Le résultat doit être clair, propre, adapté au public cible ` +
    `et respecter les informations fournies par le client.`
  );

}


/* =========================================================
   ENVOYER LA COMMANDE
========================================================= */

if(submitOrder){

  submitOrder.addEventListener(
    "click",
    submitOrderHandler
  );

}


function submitOrderHandler(){

  /*
    Protection contre double clic.
  */

  if(orderProcessing){

    return;

  }


  if(!currentService){

    alert(
      "Service introuvable."
    );

    return;

  }


  const name =
    projectName?.value.trim() ||
    "";


  if(!name){

    alert(
      "Entre le nom de ton projet."
    );


    projectName?.focus();

    return;

  }


  /* =====================================================
     RÉSEAUX SOCIAUX
     ===================================================== */

  if(
    currentService.id ===
    "promotion-sociale"
  ){

    if(!selectedSocialPlatform){

      alert(
        "Choisis une plateforme."
      );

      return;

    }


    if(!selectedSocialType){

      alert(
        "Choisis un objectif."
      );

      return;

    }


    if(socialQuantity <= 0){

      alert(
        "Entre une quantité."
      );

      socialQuantityInput?.focus();

      return;

    }


    if(
      !contextualLink?.value.trim()
    ){

      alert(
        "Entre le lien du compte ou du contenu à promouvoir."
      );

      contextualLink?.focus();

      return;

    }

  }


  /* =====================================================
     CLIENT
     ===================================================== */

  const client =
    getClient();


  if(!client){

    alert(
      "Connecte-toi à ton compte client avant de commander."
    );

    return;

  }


  /* =====================================================
     PRIX
     ===================================================== */

  const price =
    Number(
      calculatePrice()
    );


  if(
    !Number.isFinite(price) ||
    price <= 0
  ){

    alert(
      "Prix de commande invalide."
    );

    return;

  }


  /* =====================================================
     SOLDE
     ===================================================== */

  const balanceBefore =
    Number(
      client.balance || 0
    );


  if(
    !Number.isFinite(
      balanceBefore
    )
  ){

    alert(
      "Solde invalide."
    );

    return;

  }


  if(
    balanceBefore < price
  ){

    alert(

      "❌ Solde insuffisant.\n\n" +

      "Prix : " +
      formatFC(price) +

      "\nSolde disponible : " +
      formatFC(balanceBefore) +

      "\n\nEffectue d'abord un dépôt."

    );

    return;

  }


  /* =====================================================
     CALCUL POINTS
     ===================================================== */

  const pointsBefore =
    Number(
      client.points || 0
    );


  const earnedPoints =
    calculateEarnedPoints(
      price
    );


  const balanceAfter =
    balanceBefore -
    price;


  const pointsAfter =
    pointsBefore +
    earnedPoints;


  /* =====================================================
     CONFIRMATION
     ===================================================== */

  const confirmation =
    confirm(

      "Confirmer la commande ?\n\n" +

      "Service : " +
      currentService.name +

      "\nPrix : " +
      formatFC(price) +

      "\nSolde actuel : " +
      formatFC(balanceBefore) +

      "\nNouveau solde : " +
      formatFC(balanceAfter) +

      "\n\n⭐ Points gagnés : +" +
      earnedPoints +

      "\nPoints après commande : " +
      pointsAfter

    );


  if(!confirmation){

    return;

  }


  orderProcessing =
    true;


  if(submitOrder){

    submitOrder.disabled =
      true;

    submitOrder.textContent =
      "Traitement...";

  }


  /* =====================================================
     DÉBIT
     ===================================================== */

  client.balance =
    balanceAfter;


  /* =====================================================
     AJOUT DES POINTS
     ===================================================== */

  client.points =
    pointsAfter;


  /*
    Compteur de commandes.
  */

  client.orders =
    Number(
      client.orders || 0
    ) + 1;


  /* =====================================================
     SAUVEGARDE CLIENT
     ===================================================== */

  saveClient(client);


  /* =====================================================
     CRÉER LA COMMANDE
     ===================================================== */

  const order = {

    id:
      "JB-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .slice(2,8)
        .toUpperCase(),

    createdAt:
      new Date().toISOString(),

    status:
      "En attente",

    clientId:
      client.id || null,

    clientName:
      client.name ||
      "Client JASONBOT",

    service:{

      id:
        currentService.id,

      name:
        currentService.name

    },

    project:{

      name:
        name,

      type:
        projectType?.value ||
        "",

      description:
        projectDescription?.value.trim() ||
        "",

      notes:
        projectNotes?.value.trim() ||
        "",

      options:
        getDynamicData(),

      contextualLink:
        contextualLink?.value.trim() ||
        "",

      files:
        Array.from(
          projectFiles?.files || []
        )
        .map(
          file => ({

            name:
              file.name,

            type:
              file.type,

            size:
              file.size

          })
        ),

      colors:{

        primary:
          document.getElementById(
            "primaryColor"
          )?.value ||
          "",

        secondary:
          document.getElementById(
            "secondaryColor"
          )?.value ||
          ""

      }

    },

    social:
      currentService.id ===
      "promotion-sociale"

        ? {

            platform:
              selectedSocialPlatform,

            objective:
              selectedSocialType,

            quantity:
              socialQuantity,

            estimatedPrice:
              price

          }

        : null,

    estimatedPrice:
      price,

    amountPaid:
      price,

    balanceBefore:
      balanceBefore,

    balanceAfter:
      balanceAfter,

    pointsBefore:
      pointsBefore,

    pointsEarned:
      earnedPoints,

    pointsAfter:
      pointsAfter

  };


  /* =====================================================
     SAUVEGARDER COMMANDE
     ===================================================== */

  let orders = [];


  try{

    orders =
      JSON.parse(
        localStorage.getItem(
          "jasonbot_orders"
        ) || "[]"
      );

  }catch(error){

    orders = [];

  }


  if(!Array.isArray(orders)){

    orders = [];

  }


  orders.unshift(
    order
  );


  localStorage.setItem(
    "jasonbot_orders",
    JSON.stringify(orders)
  );


  /* =====================================================
     HISTORIQUE DES POINTS
     ===================================================== */

  let pointHistory = [];


  try{

    pointHistory =
      JSON.parse(
        localStorage.getItem(
          "jasonbot_points_history"
        ) || "[]"
      );

  }catch(error){

    pointHistory = [];

  }


  if(!Array.isArray(pointHistory)){

    pointHistory = [];

  }


  pointHistory.unshift({

    id:
      "PTS-" +
      Date.now(),

    clientId:
      client.id || null,

    type:
      "purchase",

    description:
      "Points gagnés avec la commande " +
      order.id,

    amount:
      earnedPoints,

    orderId:
      order.id,

    price:
      price,

    createdAt:
      new Date().toISOString()

  });


  localStorage.setItem(
    "jasonbot_points_history",
    JSON.stringify(
      pointHistory
    )
  );


  /* =====================================================
     MESSAGE
     ===================================================== */

  alert(

    "✅ Commande enregistrée !\n\n" +

    "Numéro : " +
    order.id +

    "\n\nPrix payé : " +
    formatFC(price) +

    "\nSolde avant : " +
    formatFC(balanceBefore) +

    "\nSolde après : " +
    formatFC(balanceAfter) +

    "\n\n⭐ Points gagnés : +" +
    earnedPoints +

    "\nPoints disponibles : " +
    pointsAfter

  );


  closeServiceModal();


  orderProcessing =
    false;


  if(submitOrder){

    submitOrder.disabled =
      false;

    submitOrder.textContent =
      "Créer une commande";

  }

}


/* =========================================================
   OUTILS
   ========================================================= */

function formatNumber(value){

  return Number(
    value || 0
  )
  .toLocaleString(
    "fr-FR"
  );

}


function formatFC(value){

  return (
    Number(
      value || 0
    )
    .toLocaleString(
      "fr-FR"
    ) +
    " FC"
  );

}


function escapeHTML(value){

  return String(
    value ?? ""
  )
  .replace(
    /&/g,
    "&amp;"
  )
  .replace(
    /</g,
    "&lt;"
  )
  .replace(
    />/g,
    "&gt;"
  )
  .replace(
    /"/g,
    "&quot;"
  )
  .replace(
    /'/g,
    "&#039;"
  );

}


/* =========================================================
   INITIALISATION
   ========================================================= */

loadServices();


/* =========================================================
   DEBUG
   ========================================================= */

window.JASONBOT_SHOP = {

  services,

  socialPlatforms:
    SOCIAL_PLATFORMS,

  socialRates:
    SOCIAL_RATES,

  openService,

  calculatePrice,

  calculateSocialPrice,

  calculateEarnedPoints,

  getClient

};