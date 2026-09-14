/* =========================================================
   JASONBOT AI — PROFIL.JS
   FIDÉLITÉ : 100 POINTS = 1 000 FC
========================================================= */

"use strict";

const POINTS_PAR_CONVERSION = 100;
const FC_PAR_CONVERSION = 1000;


/* =========================================================
   RÉCUPÉRER LE CLIENT
========================================================= */

function getClient(){

  try{

    const client = JSON.parse(
      localStorage.getItem("jasonbot_client") || "null"
    );

    if(!client){
      return null;
    }

    return client;

  }catch(error){

    console.error("Erreur récupération client :", error);

    return null;

  }

}


/* =========================================================
   SYNCHRONISER LE CLIENT
========================================================= */

function syncClient(client){

  if(!client) return;

  localStorage.setItem(
    "jasonbot_client",
    JSON.stringify(client)
  );

  let clients = [];

  try{

    clients = JSON.parse(
      localStorage.getItem("jasonbot_clients") || "[]"
    );

  }catch(error){

    clients = [];

  }

  if(!Array.isArray(clients)){
    clients = [];
  }

  if(client.id){

    const index = clients.findIndex(
      item => item.id === client.id
    );

    if(index !== -1){

      clients[index] = {
        ...clients[index],
        ...client,
        balance: Number(client.balance || 0),
        points: Number(client.points || 0)
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
    String(Number(client.balance || 0))
  );

  localStorage.setItem(
    "jasonbot_points",
    String(Number(client.points || 0))
  );

}


/* =========================================================
   FORMAT FC
========================================================= */

function formatFC(amount){

  return (
    Number(amount || 0)
      .toLocaleString("fr-FR") +
    " FC"
  );

}


/* =========================================================
   AFFICHER LE PROFIL
========================================================= */

function updateProfile(client){

  if(!client) return;

  const name =
    document.getElementById("fidelityName");

  if(name){

    name.textContent =
      client.name || "Client JASONBOT";

  }


  const code =
    document.getElementById("fidelityCode");

  if(code){

    code.textContent =
      client.fidelityCode || "JASON-XXXXXX";

  }


  const points =
    document.getElementById("fidelityPoints");

  if(points){

    points.textContent =
      Number(client.points || 0)
        .toLocaleString("fr-FR") +
      " pts";

  }


  const balance =
    document.getElementById("profileBalance");

  if(balance){

    balance.textContent =
      "Solde : " +
      formatFC(client.balance);

  }


  const email =
    document.getElementById("profileEmail");

  if(email){

    email.textContent =
      "E-mail : " +
      (client.email || "—");

  }


  const phone =
    document.getElementById("profilePhone");

  if(phone){

    phone.textContent =
      "Téléphone : " +
      (client.phone || "—");

  }


  const vip =
    document.getElementById("profileVip");

  if(vip){

    vip.textContent =
      "VIP : " +
      (client.vip || "Bronze");

  }


  const referrals =
    document.getElementById("referralCount");

  if(referrals){

    referrals.textContent =
      Number(client.referrals || 0);

  }


  const photo =
    document.getElementById("fidelityPhoto");

  if(photo){

    if(client.photo){

      photo.src = client.photo;

    }else{

      photo.src =
        "https://ui-avatars.com/api/?name=" +
        encodeURIComponent(
          client.name || "JASONBOT"
        ) +
        "&background=1683ff&color=ffffff&size=200";

    }

  }


  const qr =
    document.getElementById("fidelityQR");

  if(qr && client.fidelityCode){

    qr.src =
      "https://api.qrserver.com/v1/create-qr-code/" +
      "?size=300x300&data=" +
      encodeURIComponent(client.fidelityCode);

  }

}


/* =========================================================
   CONVERSION DES POINTS
========================================================= */

function convertPoints(){

  const client =
    getClient();

  if(!client){

    alert(
      "Tu dois être connecté."
    );

    return;

  }


  const availablePoints =
    Number(client.points || 0);


  const requestedPoints =
    Number(
      prompt(
        "Combien de points veux-tu convertir ?\n\n" +
        "100 points = 1 000 FC"
      )
    );


  if(
    !Number.isFinite(requestedPoints) ||
    requestedPoints <= 0
  ){

    return;

  }


  if(
    requestedPoints %
    POINTS_PAR_CONVERSION !== 0
  ){

    alert(
      "❌ Les points doivent être un multiple de 100."
    );

    return;

  }


  if(
    requestedPoints >
    availablePoints
  ){

    alert(
      "❌ Tu n'as pas assez de points."
    );

    return;

  }


  const amount =
    (
      requestedPoints /
      POINTS_PAR_CONVERSION
    ) *
    FC_PAR_CONVERSION;


  const oldBalance =
    Number(client.balance || 0);


  const newBalance =
    oldBalance + amount;


  const newPoints =
    availablePoints -
    requestedPoints;


  /*
    Mise à jour du compte
  */

  client.balance =
    newBalance;

  client.points =
    newPoints;


  /*
    Synchronisation
  */

  syncClient(client);


  /*
    Historique
  */

  let conversions = [];

  try{

    conversions = JSON.parse(
      localStorage.getItem(
        "jasonbot_point_conversions"
      ) || "[]"
    );

  }catch(error){

    conversions = [];

  }

  if(!Array.isArray(conversions)){
    conversions = [];
  }


  conversions.unshift({

    id:
      "CONV-" +
      Date.now(),

    clientId:
      client.id || null,

    clientName:
      client.name || "Client JASONBOT",

    pointsUsed:
      requestedPoints,

    amount:
      amount,

    balanceBefore:
      oldBalance,

    balanceAfter:
      newBalance,

    createdAt:
      new Date().toISOString()

  });


  localStorage.setItem(
    "jasonbot_point_conversions",
    JSON.stringify(conversions)
  );


  /*
    Actualiser l'écran
  */

  updateProfile(client);


  alert(
    "✅ Conversion réussie !\n\n" +

    requestedPoints.toLocaleString("fr-FR") +
    " points = " +
    formatFC(amount) +

    "\n\nNouveau solde : " +
    formatFC(newBalance) +

    "\nPoints restants : " +
    newPoints.toLocaleString("fr-FR")
  );

}


/* =========================================================
   AJOUTER LE BOUTON DE CONVERSION
========================================================= */

function createConversionButton(){

  if(
    document.getElementById(
      "convertPointsButton"
    )
  ){

    return;

  }


  const pointsElement =
    document.getElementById(
      "fidelityPoints"
    );

  if(!pointsElement){
    return;
  }


  const button =
    document.createElement("button");


  button.id =
    "convertPointsButton";


  button.type =
    "button";


  button.textContent =
    "💰 Convertir mes points en FC";


  button.style.marginTop =
    "12px";

  button.style.padding =
    "12px 18px";

  button.style.border =
    "none";

  button.style.borderRadius =
    "12px";

  button.style.cursor =
    "pointer";

  button.style.fontWeight =
    "bold";


  button.addEventListener(
    "click",
    convertPoints
  );


  pointsElement.parentElement
    ?.appendChild(button);

}


/* =========================================================
   COPIER LE CODE FIDÉLITÉ
========================================================= */

function setupCopyCode(){

  const button =
    document.getElementById(
      "copyCode"
    );

  if(!button) return;


  button.addEventListener(
    "click",
    async () => {

      const client =
        getClient();

      const code =
        client?.fidelityCode ||
        "JASON-XXXXXX";


      try{

        await navigator.clipboard
          .writeText(code);

      }catch(error){

        const input =
          document.createElement("input");

        input.value =
          code;

        document.body.appendChild(
          input
        );

        input.select();

        document.execCommand(
          "copy"
        );

        input.remove();

      }


      button.textContent =
        "✅ Code copié !";


      setTimeout(() => {

        button.textContent =
          "📋 Copier mon code";

      },2000);

    }
  );

}


/* =========================================================
   DÉCONNEXION
========================================================= */

function setupLogout(){

  const logout =
    document.getElementById("logout");

  if(!logout) return;


  logout.addEventListener(
    "click",
    () => {

      if(
        !confirm(
          "Voulez-vous vraiment vous déconnecter ?"
        )
      ){

        return;

      }


      localStorage.removeItem(
        "jasonbot_client"
      );


      window.location.href =
        "index.html";

    }
  );

}


/* =========================================================
   INITIALISATION
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const client =
      getClient();


    if(!client){

      alert(
        "Tu dois être connecté pour accéder à ton profil."
      );

      window.location.href =
        "index.html";

      return;

    }


    if(
      client.balance === undefined ||
      client.balance === null
    ){

      client.balance =
        Number(
          localStorage.getItem(
            "jasonbot_balance"
          ) || 0
        );

    }


    if(
      client.points === undefined ||
      client.points === null
    ){

      client.points =
        Number(
          localStorage.getItem(
            "jasonbot_points"
          ) || 0
        );

    }


    syncClient(client);

    updateProfile(client);

    createConversionButton();

    setupCopyCode();

    setupLogout();

  }
);