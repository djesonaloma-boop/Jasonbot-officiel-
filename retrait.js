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

  const withdrawForm =
    document.getElementById(
      "withdrawForm"
    );

  const withdrawMessage =
    document.getElementById(
      "withdrawMessage"
    );

  const withdrawHistory =
    document.getElementById(
      "withdrawHistory"
    );


  /* =====================================
     CLIENTS
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


  function saveClients(clients) {

    localStorage.setItem(
      "jasonbot_clients",
      JSON.stringify(clients)
    );

  }


  /* =====================================
     ACTUALISER LE CLIENT
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
        JSON.stringify(client)
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
     DEMANDES
  ===================================== */

  function getWithdrawals() {

    try {

      return JSON.parse(
        localStorage.getItem(
          "jasonbot_withdrawals"
        ) || "[]"
      );

    } catch (error) {

      return [];

    }

  }


  function saveWithdrawals(
    withdrawals
  ) {

    localStorage.setItem(
      "jasonbot_withdrawals",
      JSON.stringify(
        withdrawals
      )
    );

  }


  /* =====================================
     ID
  ===================================== */

  function generateId() {

    return (
      "RET-" +
      Date.now() +
      "-" +
      Math.random()
        .toString(36)
        .substring(
          2,
          8
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

    withdrawMessage.textContent =
      text;

    withdrawMessage.className =
      "message " + type;

  }


  /* =====================================
     FORMULAIRE
  ===================================== */

  withdrawForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();


      refreshClient();


      const amount =
        Number(
          document.getElementById(
            "withdrawAmount"
          ).value
        );


      const method =
        document.getElementById(
          "withdrawMethod"
        ).value;


      const phone =
        document.getElementById(
          "withdrawPhone"
        ).value.trim();


      const balance =
        Number(
          client.balance || 0
        );


      /* ===============================
         VALIDATION MONTANT
      =============================== */

      if (
        !amount ||
        amount <= 0
      ) {

        showMessage(
          "Veuillez entrer un montant valide.",
          "error"
        );

        return;

      }


      /* ===============================
         VALIDATION SOLDE
      =============================== */

      if (
        amount > balance
      ) {

        showMessage(
          "Le montant demandé dépasse votre solde disponible.",
          "error"
        );

        return;

      }


      /* ===============================
         VALIDATION MOYEN
      =============================== */

      if (!method) {

        showMessage(
          "Veuillez sélectionner un moyen de retrait.",
          "error"
        );

        return;

      }


      /* ===============================
         VALIDATION NUMÉRO
      =============================== */

      if (
        phone.length < 9
      ) {

        showMessage(
          "Veuillez entrer un numéro valide.",
          "error"
        );

        return;

      }


      /* ===============================
         RÉCUPÉRER LES DEMANDES
      =============================== */

      const withdrawals =
        getWithdrawals();


      /* ===============================
         CRÉER LA DEMANDE
      =============================== */

      const withdrawal = {

        id:
          generateId(),

        clientId:
          client.id,

        clientName:
          client.name || "",

        clientEmail:
          client.email || "",

        amount:
          amount,

        method:
          method,

        phone:
          phone,

        status:
          "En attente",

        createdAt:
          new Date()
            .toISOString()

      };


      withdrawals.unshift(
        withdrawal
      );


      saveWithdrawals(
        withdrawals
      );


      /* ===============================
         IMPORTANT
         Le solde n'est PAS modifié.
      =============================== */

      showMessage(
        "Votre demande a été enregistrée. Elle est en attente de vérification par l'administration.",
        "success"
      );


      withdrawForm.reset();


      renderHistory();

    }
  );


  /* =====================================
     HISTORIQUE
  ===================================== */

  function renderHistory() {

    const withdrawals =
      getWithdrawals();


    const myWithdrawals =
      withdrawals.filter(
        item =>
          item.clientId ===
          client.id
      );


    if (
      myWithdrawals.length === 0
    ) {

      withdrawHistory.innerHTML = `
        <div class="empty">
          Aucune demande de retrait.
        </div>
      `;

      return;

    }


    withdrawHistory.innerHTML =
      "";


    myWithdrawals.forEach(
      withdrawal => {

        const item =
          document.createElement(
            "div"
          );


        item.className =
          "history-item";


        const amount =
          Number(
            withdrawal.amount || 0
          ).toLocaleString(
            "fr-FR"
          );


        const date =
          new Date(
            withdrawal.createdAt
          ).toLocaleString(
            "fr-FR"
          );


        item.innerHTML = `

          <div class="history-title">
            💸 ${amount} FC
          </div>

          <div class="history-info">

            Moyen :
            ${escapeHTML(
              withdrawal.method
            )}

            <br>

            Numéro :
            ${escapeHTML(
              withdrawal.phone
            )}

            <br>

            Date :
            ${escapeHTML(
              date
            )}

          </div>

          <span class="status">
            ${escapeHTML(
              withdrawal.status
            )}
          </span>

        `;


        withdrawHistory.appendChild(
          item
        );

      }
    );

  }


  /* =====================================
     PROTECTION HTML
  ===================================== */

  function escapeHTML(value) {

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