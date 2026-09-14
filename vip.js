/* =====================================================
   JASONBOT AI
   VIP.JS — VERSION CORRIGÉE
   Débit automatique du solde VIP
===================================================== */

"use strict";

/* =====================================================
   PLANS VIP
===================================================== */

const vipPlans = {

  bronze:{
    name:"VIP Bronze",
    price:5000,
    icon:"🥉",
    description:"Une première expérience VIP avec des avantages essentiels."
  },

  silver:{
    name:"VIP Argent",
    price:10000,
    icon:"🥈",
    description:"Plus d'avantages et une meilleure expérience JASONBOT."
  },

  gold:{
    name:"VIP Or",
    price:20000,
    icon:"🥇",
    description:"Une expérience premium pour les utilisateurs réguliers."
  },

  diamond:{
    name:"VIP Diamant",
    price:50000,
    icon:"💎",
    description:"Le niveau VIP ultime de JASONBOT AI."
  }

};


/* =====================================================
   VARIABLES
===================================================== */

let selectedPlan = null;
let processingVip = false;


/* =====================================================
   DOM
===================================================== */

const vipModal =
  document.getElementById("vipModal");

const vipModalOverlay =
  document.getElementById("vipModalOverlay");

const closeVipModal =
  document.getElementById("closeVipModal");

const cancelVip =
  document.getElementById("cancelVip");

const confirmVip =
  document.getElementById("confirmVip");

const toast =
  document.getElementById("toast");


/* =====================================================
   FORMATAGE
===================================================== */

function formatPrice(amount){

  return (
    new Intl.NumberFormat("fr-FR")
      .format(Number(amount) || 0) +
    " FC"
  );

}


/* =====================================================
   RÉCUPÉRER + SYNCHRONISER LE CLIENT
===================================================== */

function getClientData(){

  try{

    let client =
      JSON.parse(
        localStorage.getItem("jasonbot_client") || "null"
      );

    if(!client){
      return null;
    }

    let clients = [];

    try{

      clients =
        JSON.parse(
          localStorage.getItem("jasonbot_clients") || "[]"
        );

    }catch(error){

      clients = [];

    }

    if(!Array.isArray(clients)){
      clients = [];
    }


    /*
      Synchronisation avec la liste des clients.
    */

    if(client.id){

      const index =
        clients.findIndex(
          item => item.id === client.id
        );

      if(index !== -1){

        const storedClient =
          clients[index];

        /*
          Le client connecté est prioritaire
          pour le solde et les points.
        */

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

        clients[index] = client;

      }

    }


    /*
      Sauvegarder partout.
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
      Anciennes clés conservées pour compatibilité.
    */

    localStorage.setItem(
      "jasonbot_balance",
      String(Number(client.balance || 0))
    );

    localStorage.setItem(
      "jasonbot_points",
      String(Number(client.points || 0))
    );

    return client;

  }catch(error){

    console.error(
      "Erreur client VIP :",
      error
    );

    return null;

  }

}


/* =====================================================
   SOLDE
===================================================== */

function getBalance(){

  const client =
    getClientData();

  if(!client){
    return 0;
  }

  const balance =
    Number(client.balance || 0);

  return Number.isFinite(balance)
    ? balance
    : 0;

}


/* =====================================================
   POINTS
===================================================== */

function getPoints(){

  const client =
    getClientData();

  if(!client){
    return 0;
  }

  const points =
    Number(client.points || 0);

  return Number.isFinite(points)
    ? points
    : 0;

}


/* =====================================================
   METTRE À JOUR L'AFFICHAGE
===================================================== */

function updateAccount(){

  const balance =
    getBalance();

  const points =
    getPoints();

  const balanceElement =
    document.getElementById("userBalance");

  const pointsElement =
    document.getElementById("userPoints");

  if(balanceElement){

    balanceElement.textContent =
      formatPrice(balance);

  }

  if(pointsElement){

    pointsElement.textContent =
      points.toLocaleString("fr-FR");

  }

}


/* =====================================================
   DÉDUIRE L'ARGENT DU COMPTE
===================================================== */

function debitBalance(amount){

  const client =
    getClientData();

  if(!client){
    return false;
  }

  const oldBalance =
    Number(client.balance || 0);

  const price =
    Number(amount || 0);

  if(!Number.isFinite(oldBalance)){
    return false;
  }

  if(!Number.isFinite(price) || price <= 0){
    return false;
  }

  if(oldBalance < price){
    return false;
  }


  /*
    NOUVEAU SOLDE
  */

  const newBalance =
    oldBalance - price;


  /*
    Mise à jour du client connecté.
  */

  client.balance =
    newBalance;


  localStorage.setItem(
    "jasonbot_client",
    JSON.stringify(client)
  );


  /*
    Mise à jour de la liste des clients.
  */

  try{

    let clients =
      JSON.parse(
        localStorage.getItem("jasonbot_clients") || "[]"
      );

    if(!Array.isArray(clients)){
      clients = [];
    }

    if(client.id){

      const index =
        clients.findIndex(
          item => item.id === client.id
        );

      if(index !== -1){

        clients[index] = {
          ...clients[index],
          ...client,
          balance:newBalance
        };

      }

    }

    localStorage.setItem(
      "jasonbot_clients",
      JSON.stringify(clients)
    );

  }catch(error){

    console.error(
      "Erreur synchronisation solde :",
      error
    );

  }


  /*
    Ancienne clé de compatibilité.
  */

  localStorage.setItem(
    "jasonbot_balance",
    String(newBalance)
  );


  updateAccount();

  return true;

}


/* =====================================================
   OUVRIR MODAL VIP
===================================================== */

function openVipModal(planId){

  const plan =
    vipPlans[planId];

  if(!plan){
    return;
  }

  selectedPlan =
    planId;


  const iconElement =
    document.getElementById("selectedVipIcon");

  const nameElement =
    document.getElementById("selectedVipName");

  const priceElement =
    document.getElementById("selectedVipPrice");

  const descriptionElement =
    document.getElementById("selectedVipDescription");

  const modalBalanceElement =
    document.getElementById("modalBalance");


  if(iconElement){

    iconElement.textContent =
      plan.icon;

  }

  if(nameElement){

    nameElement.textContent =
      plan.name;

  }

  if(priceElement){

    priceElement.textContent =
      formatPrice(plan.price);

  }

  if(descriptionElement){

    descriptionElement.textContent =
      plan.description;

  }

  if(modalBalanceElement){

    modalBalanceElement.textContent =
      formatPrice(getBalance());

  }


  if(vipModal){

    vipModal.classList.remove("hidden");

  }

  document.body.style.overflow =
    "hidden";

}


/* =====================================================
   FERMER MODAL
===================================================== */

function closeModal(){

  if(vipModal){

    vipModal.classList.add("hidden");

  }

  document.body.style.overflow =
    "";

  selectedPlan =
    null;

}


/* =====================================================
   BOUTONS FERMETURE
===================================================== */

if(closeVipModal){

  closeVipModal.addEventListener(
    "click",
    closeModal
  );

}

if(cancelVip){

  cancelVip.addEventListener(
    "click",
    closeModal
  );

}

if(vipModalOverlay){

  vipModalOverlay.addEventListener(
    "click",
    closeModal
  );

}


/* =====================================================
   CHOIX DU PLAN
===================================================== */

document
  .querySelectorAll(".choose-vip")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const planId =
          button.dataset.vip;

        openVipModal(planId);

      }
    );

  });


/* =====================================================
   CONFIRMATION VIP
===================================================== */

if(confirmVip){

  confirmVip.addEventListener(
    "click",
    () => {

      if(processingVip){
        return;
      }

      if(!selectedPlan){

        showToast(
          "Choisis d'abord un niveau VIP.",
          "error"
        );

        return;

      }


      const plan =
        vipPlans[selectedPlan];

      if(!plan){

        showToast(
          "Plan VIP introuvable.",
          "error"
        );

        return;

      }


      const client =
        getClientData();

      if(!client){

        showToast(
          "Connecte-toi à ton compte.",
          "error"
        );

        return;

      }


      const balance =
        Number(client.balance || 0);


      /*
        Vérification du solde.
      */

      if(balance < plan.price){

        showToast(
          "⚠️ Solde insuffisant. Effectue d'abord un dépôt.",
          "error"
        );

        return;

      }


      processingVip =
        true;

      confirmVip.disabled =
        true;

      confirmVip.textContent =
        "Traitement...";


      /*
        ANCIEN SOLDE
      */

      const balanceBefore =
        balance;


      /*
        NOUVEAU SOLDE
      */

      const balanceAfter =
        balance - plan.price;


      /*
        Débit réel.
      */

      const debited =
        debitBalance(plan.price);


      if(!debited){

        processingVip =
          false;

        confirmVip.disabled =
          false;

        confirmVip.textContent =
          "Confirmer";

        showToast(
          "❌ Impossible de débiter le solde.",
          "error"
        );

        return;

      }


      /* =================================================
         CRÉER LA DEMANDE VIP
      ================================================= */

      const request = {

        id:
          "VIP-" +
          Date.now() +
          "-" +
          Math.random()
            .toString(36)
            .slice(2,7)
            .toUpperCase(),

        clientId:
          client.id || null,

        clientName:
          client.name ||
          "Client JASONBOT",

        plan:
          selectedPlan,

        name:
          plan.name,

        price:
          plan.price,

        balanceBefore:
          balanceBefore,

        balanceAfter:
          balanceAfter,

        status:
          "pending",

        createdAt:
          new Date().toISOString()

      };


      /* =================================================
         SAUVEGARDER DEMANDE
      ================================================= */

      let requests = [];

      try{

        requests =
          JSON.parse(
            localStorage.getItem(
              "jasonbot_vip_requests"
            ) || "[]"
          );

        if(!Array.isArray(requests)){
          requests = [];
        }

      }catch(error){

        requests = [];

      }


      requests.unshift(request);


      localStorage.setItem(
        "jasonbot_vip_requests",
        JSON.stringify(requests)
      );


      /*
        Actualiser l'affichage.
      */

      updateAccount();


      /*
        Message de confirmation.
      */

      showToast(
        "✅ " +
        plan.name +
        " acheté avec succès. Nouveau solde : " +
        formatPrice(balanceAfter),
        "success"
      );


      /*
        Fermer après un petit délai.
      */

      setTimeout(() => {

        closeModal();

        processingVip =
          false;

        confirmVip.disabled =
          false;

        confirmVip.textContent =
          "Confirmer";

      },1000);

    }
  );

}


/* =====================================================
   NOTIFICATIONS
===================================================== */

const notificationButton =
  document.getElementById(
    "notificationButton"
  );

if(notificationButton){

  notificationButton.addEventListener(
    "click",
    () => {

      showToast(
        "🔔 Aucune nouvelle notification.",
        "info"
      );

    }
  );

}


/* =====================================================
   TOAST
===================================================== */

function showToast(
  message,
  type = "info"
){

  if(!toast){

    alert(message);

    return;

  }


  toast.textContent =
    message;

  toast.className =
    "toast " + type;

  toast.classList.add(
    "show"
  );


  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

  },3500);

}


/* =====================================================
   SYNCHRONISATION ENTRE PAGES
===================================================== */

window.addEventListener(
  "storage",
  () => {

    updateAccount();

  }
);


/* =====================================================
   INITIALISATION
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    updateAccount();

  }
);


updateAccount();


/* =====================================================
   DEBUG
===================================================== */

window.JASONBOT_VIP = {

  vipPlans,

  getClientData,

  getBalance,

  getPoints,

  debitBalance,

  updateAccount,

  openVipModal

};