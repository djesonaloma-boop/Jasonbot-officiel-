document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     CLIENT CONNECTÉ
  ===================================== */

  let client = null;

  try {

    client = JSON.parse(
      localStorage.getItem(
        "jasonbot_client"
      ) || "null"
    );

  } catch (error) {

    client = null;

  }


  /*
    Si aucun compte n'est connecté,
    retour vers index.html.
  */

  if (!client) {

    alert(
      "Veuillez vous connecter à votre compte JASONBOT."
    );

    window.location.href =
      "index.html";

    return;

  }


  /* =====================================
     ÉLÉMENTS
  ===================================== */

  const balanceElement =
    document.getElementById(
      "balance"
    );

  const depositForm =
    document.getElementById(
      "depositForm"
    );

  const depositMessage =
    document.getElementById(
      "depositMessage"
    );

  const depositHistory =
    document.getElementById(
      "depositHistory"
    );


  /* =====================================
     RÉCUPÉRER LES CLIENTS
  ===================================== */

  function getClients() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "jasonbot_clients"
        ) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  /* =====================================
     ENREGISTRER LES CLIENTS
  ===================================== */

  function saveClients(
    clients
  ) {

    localStorage.setItem(
      "jasonbot_clients",
      JSON.stringify(
        clients
      )
    );

  }


  /* =====================================
     ACTUALISER LE COMPTE
  ===================================== */

  function refreshClient() {

    const clients =
      getClients();


    const currentClient =
      clients.find(
        item =>
          item.id === client.id
      );


    if (currentClient) {

      client =
        currentClient;


      localStorage.setItem(
        "jasonbot_client",
        JSON.stringify(
          client
        )
      );

    }


    const balance =
      Number(
        client.balance || 0
      );


    balanceElement.textContent =
      balance.toLocaleString(
        "fr-FR"
      ) + " FC";

  }


  refreshClient();


  /* =====================================
     DEMANDES DE DÉPÔT
  ===================================== */

  function getDeposits() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "jasonbot_deposits"
        ) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  function saveDeposits(
    deposits
  ) {

    localStorage.setItem(
      "jasonbot_deposits",
      JSON.stringify(
        deposits
      )
    );

  }


  /* =====================================
     ID DU DÉPÔT
  ===================================== */

  function generateDepositId() {

    return (
      "DEP-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .substring(
          2,
          7
        )
        .toUpperCase()
    );

  }


  /* =====================================
     MESSAGE
  ===================================== */

  function showMessage(
    text,
    type
  ) {

    depositMessage.textContent =
      text;

    depositMessage.className =
      "message " + type;

  }


  /* =====================================
     CHOIX DU MOYEN DE PAIEMENT
  ===================================== */

  document
    .querySelectorAll(
      ".method"
    )
    .forEach(
      method => {

        method.addEventListener(
          "click",
          () => {

            /*
              Orange Money est le seul
              actuellement disponible.
            */

            if (
              method.classList.contains(
                "disabled"
              )
            ) {

              alert(
                "Ce moyen de paiement n'est pas encore disponible. Le numéro sera ajouté par l'administration."
              );

              return;

            }


            document
              .querySelectorAll(
                ".method"
              )
              .forEach(
                item => {

                  item.classList.remove(
                    "active"
                  );

                }
              );


            method.classList.add(
              "active"
            );

          }
        );

      }
    );


  /* =====================================
     ENVOYER UN DÉPÔT
  ===================================== */

  depositForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const amount =
        Number(
          document.getElementById(
            "depositAmount"
          ).value
        );


      const phone =
        document.getElementById(
          "depositPhone"
        ).value.trim();


      const transactionId =
        document.getElementById(
          "transactionId"
        ).value.trim();


      /* =================================
         VALIDATION MONTANT
      ================================= */

      if (
        !amount ||
        amount < 2000
      ) {

        showMessage(
          "Le montant minimum du dépôt est de 2 000 FC.",
          "error"
        );

        return;

      }


      /* =================================
         VALIDATION NUMÉRO
      ================================= */

      if (
        phone.length < 9
      ) {

        showMessage(
          "Veuillez entrer un numéro de téléphone valide.",
          "error"
        );

        return;

      }


      /* =================================
         VALIDATION TRANSACTION
      ================================= */

      if (
        transactionId.length < 3
      ) {

        showMessage(
          "Veuillez entrer la référence de votre transaction.",
          "error"
        );

        return;

      }


      /* =================================
         MOYEN SÉLECTIONNÉ
      ================================= */

      const selectedMethod =
        document.querySelector(
          ".method.active"
        );


      const method =
        selectedMethod
          ? selectedMethod.dataset.method
          : "Orange Money";


      /* =================================
         RÉCUPÉRER LES DÉPÔTS
      ================================= */

      const deposits =
        getDeposits();


      /* =================================
         EMPÊCHER DOUBLON
      ================================= */

      const duplicate =
        deposits.some(
          deposit =>
            deposit.clientId ===
              client.id &&
            String(
              deposit.transactionId
            ).toLowerCase() ===
              transactionId.toLowerCase()
        );


      if (duplicate) {

        showMessage(
          "Cette référence de transaction a déjà été envoyée.",
          "error"
        );

        return;

      }


      /* =================================
         CRÉER LA DEMANDE
      ================================= */

      const deposit = {

        id:
          generateDepositId(),

        clientId:
          client.id,

        clientName:
          client.name || "",

        clientEmail:
          client.email || "",

        clientPhone:
          client.phone || "",

        method:
          method,

        amount:
          amount,

        paymentPhone:
          phone,

        transactionId:
          transactionId,

        status:
          "En attente",

        createdAt:
          new Date()
            .toISOString()

      };


      deposits.unshift(
        deposit
      );


      saveDeposits(
        deposits
      );


      /* =================================
         SUCCÈS
      ================================= */

      showMessage(
        "Votre demande de dépôt a été envoyée. Elle sera vérifiée par l'administration avant l'ajout au solde.",
        "success"
      );


      depositForm.reset();


      /*
        Orange Money reste sélectionné
        après l'envoi.
      */

      document
        .querySelectorAll(
          ".method"
        )
        .forEach(
          item => {

            item.classList.remove(
              "active"
            );

          }
        );


      const orange =
        document.querySelector(
          '[data-method="Orange Money"]'
        );


      if (orange) {

        orange.classList.add(
          "active"
        );

      }


      renderHistory();

    }
  );


  /* =====================================
     HISTORIQUE
  ===================================== */

  function renderHistory() {

    const deposits =
      getDeposits();


    const myDeposits =
      deposits.filter(
        deposit =>
          deposit.clientId ===
          client.id
      );


    if (
      myDeposits.length === 0
    ) {

      depositHistory.innerHTML = `
        <div class="empty">
          Aucun dépôt pour le moment.
        </div>
      `;

      return;

    }


    depositHistory.innerHTML =
      "";


    myDeposits.forEach(
      deposit => {

        const item =
          document.createElement(
            "div"
          );


        item.className =
          "history-item";


        const amount =
          Number(
            deposit.amount || 0
          ).toLocaleString(
            "fr-FR"
          );


        const date =
          new Date(
            deposit.createdAt
          ).toLocaleString(
            "fr-FR"
          );


        item.innerHTML = `

          <div class="history-title">
            💰 Dépôt — ${amount} FC
          </div>

          <div class="history-info">

            Moyen :
            ${escapeHTML(
              deposit.method
            )}

            <br>

            Numéro :
            ${escapeHTML(
              deposit.paymentPhone
            )}

            <br>

            Référence :
            ${escapeHTML(
              deposit.transactionId
            )}

            <br>

            Date :
            ${escapeHTML(
              date
            )}

          </div>

          <span class="status">
            ${escapeHTML(
              deposit.status
            )}
          </span>

        `;


        depositHistory.appendChild(
          item
        );

      }
    );

  }


  /* =====================================
     PROTECTION HTML
  ===================================== */

  function escapeHTML(
    value
  ) {

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


  /* =====================================
     AFFICHAGE INITIAL
  ===================================== */

  renderHistory();

});