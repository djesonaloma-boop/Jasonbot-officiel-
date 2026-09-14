document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     ÉLÉMENTS
  ===================================== */

  const registerTab =
    document.getElementById("registerTab");

  const loginTab =
    document.getElementById("loginTab");

  const registerSection =
    document.getElementById("registerSection");

  const loginSection =
    document.getElementById("loginSection");

  const registerForm =
    document.getElementById("registerForm");

  const loginForm =
    document.getElementById("loginForm");

  const registerMessage =
    document.getElementById("registerMessage");

  const loginMessage =
    document.getElementById("loginMessage");

  const referralInput =
    document.getElementById("referralCode");

  const scanQR =
    document.getElementById("scanQR");

  const importQR =
    document.getElementById("importQR");

  const qrImageInput =
    document.getElementById("qrImageInput");

  const scannerBox =
    document.getElementById("scannerBox");

  const qrVideo =
    document.getElementById("qrVideo");

  const qrCanvas =
    document.getElementById("qrCanvas");

  const scannerStatus =
    document.getElementById("scannerStatus");

  const stopCamera =
    document.getElementById("stopCamera");

  const canvasContext =
    qrCanvas.getContext("2d");


  /* =====================================
     CAMÉRA
  ===================================== */

  let cameraStream = null;

  let scanning = false;


  /* =====================================
     STOCKAGE
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
     IDENTIFIANT
  ===================================== */

  function generateClientId() {

    return (
      "client_" +
      Date.now() +
      "_" +
      Math.random()
        .toString(36)
        .substring(2, 9)
    );

  }


  /* =====================================
     CODE PARRAINAGE
  ===================================== */

  function generateReferralCode() {

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let code = "JASON-";

    for (let i = 0; i < 6; i++) {

      code += characters.charAt(
        Math.floor(
          Math.random() *
          characters.length
        )
      );

    }

    return code;

  }


  function generateUniqueCode(clients) {

    let code;

    do {

      code =
        generateReferralCode();

    } while (
      clients.some(
        client =>
          client.fidelityCode === code
      )
    );

    return code;

  }


  /* =====================================
     MESSAGES
  ===================================== */

  function showMessage(
    element,
    text,
    type
  ) {

    element.textContent = text;

    element.className =
      "message " + type;

    element.style.display =
      "block";

  }


  function clearMessage(element) {

    element.textContent = "";

    element.className =
      "message";

    element.style.display =
      "none";

  }


  /* =====================================
     ONGLETS
  ===================================== */

  function showRegister() {

    stopQRScanner();

    registerSection.classList.remove(
      "hidden"
    );

    loginSection.classList.add(
      "hidden"
    );

    registerTab.classList.add(
      "active"
    );

    loginTab.classList.remove(
      "active"
    );

    clearMessage(
      registerMessage
    );

    clearMessage(
      loginMessage
    );

  }


  function showLogin() {

    stopQRScanner();

    registerSection.classList.add(
      "hidden"
    );

    loginSection.classList.remove(
      "hidden"
    );

    registerTab.classList.remove(
      "active"
    );

    loginTab.classList.add(
      "active"
    );

    clearMessage(
      registerMessage
    );

    clearMessage(
      loginMessage
    );

  }


  registerTab.addEventListener(
    "click",
    showRegister
  );


  loginTab.addEventListener(
    "click",
    showLogin
  );


  /* =====================================
     EXTRAIRE UN CODE JASON
  ===================================== */

  function extractJasonCode(text) {

    if (!text) {
      return null;
    }

    const value =
      String(text)
        .trim()
        .toUpperCase();


    /*
      Cherche un code du type :

      JASON-ABC123
    */

    const match =
      value.match(
        /JASON-[A-Z0-9]{6}/
      );


    if (match) {

      return match[0];

    }


    return null;

  }


  /* =====================================
     UTILISER LE QR TROUVÉ
  ===================================== */

  function useDetectedQR(text) {

    const code =
      extractJasonCode(text);


    if (!code) {

      scannerStatus.textContent =
        "QR détecté, mais ce n'est pas un code JASON valide.";

      return false;

    }


    referralInput.value =
      code;


    stopQRScanner();


    showMessage(
      registerMessage,
      "QR code reconnu : " + code,
      "success"
    );


    return true;

  }


  /* =====================================
     SCANNER AVEC CAMÉRA
  ===================================== */

  async function startQRScanner() {

    clearMessage(
      registerMessage
    );


    if (
      typeof jsQR ===
      "undefined"
    ) {

      showMessage(
        registerMessage,
        "Le scanner QR n'a pas pu être chargé. Vérifiez votre connexion Internet.",
        "error"
      );

      return;

    }


    if (
      !navigator.mediaDevices ||
      !navigator.mediaDevices.getUserMedia
    ) {

      showMessage(
        registerMessage,
        "La caméra n'est pas disponible sur ce navigateur.",
        "error"
      );

      return;

    }


    scannerBox.classList.remove(
      "hidden"
    );


    scannerStatus.textContent =
      "Demande d'accès à la caméra...";


    try {

      cameraStream =
        await navigator.mediaDevices.getUserMedia({

          video: {
            facingMode: {
              ideal: "environment"
            }
          },

          audio: false

        });


      qrVideo.srcObject =
        cameraStream;


      await qrVideo.play();


      scanning = true;


      scannerStatus.textContent =
        "Placez le QR code devant la caméra...";


      scanCameraFrame();


    } catch (error) {

      console.error(
        "Erreur caméra :",
        error
      );


      scannerStatus.textContent =
        "Impossible d'accéder à la caméra.";


      stopQRScanner();


      showMessage(
        registerMessage,
        "Autorisez l'accès à la caméra puis réessayez.",
        "error"
      );

    }

  }


  /* =====================================
     LECTURE DE LA CAMÉRA
  ===================================== */

  function scanCameraFrame() {

    if (!scanning) {
      return;
    }


    if (
      qrVideo.readyState !==
      qrVideo.HAVE_ENOUGH_DATA
    ) {

      requestAnimationFrame(
        scanCameraFrame
      );

      return;

    }


    const width =
      qrVideo.videoWidth;

    const height =
      qrVideo.videoHeight;


    if (
      width <= 0 ||
      height <= 0
    ) {

      requestAnimationFrame(
        scanCameraFrame
      );

      return;

    }


    qrCanvas.width =
      width;

    qrCanvas.height =
      height;


    canvasContext.drawImage(
      qrVideo,
      0,
      0,
      width,
      height
    );


    const imageData =
      canvasContext.getImageData(
        0,
        0,
        width,
        height
      );


    const result =
      jsQR(
        imageData.data,
        imageData.width,
        imageData.height,
        {
          inversionAttempts:
            "attemptBoth"
        }
      );


    if (result) {

      const success =
        useDetectedQR(
          result.data
        );


      if (success) {
        return;
      }

    }


    requestAnimationFrame(
      scanCameraFrame
    );

  }


  /* =====================================
     ARRÊTER LA CAMÉRA
  ===================================== */

  function stopQRScanner() {

    scanning = false;


    if (cameraStream) {

      cameraStream
        .getTracks()
        .forEach(track => {
          track.stop();
        });

      cameraStream = null;

    }


    if (qrVideo) {

      qrVideo.pause();

      qrVideo.srcObject = null;

    }


    if (scannerBox) {

      scannerBox.classList.add(
        "hidden"
      );

    }

  }


  scanQR.addEventListener(
    "click",
    startQRScanner
  );


  stopCamera.addEventListener(
    "click",
    stopQRScanner
  );


  /* =====================================
     IMPORTER UNE IMAGE QR
  ===================================== */

  importQR.addEventListener(
    "click",
    () => {

      qrImageInput.click();

    }
  );


  qrImageInput.addEventListener(
    "change",
    (event) => {

      const file =
        event.target.files[0];


      if (!file) {
        return;
      }


      if (
        typeof jsQR ===
        "undefined"
      ) {

        showMessage(
          registerMessage,
          "Le scanner QR n'a pas pu être chargé.",
          "error"
        );

        return;

      }


      const reader =
        new FileReader();


      reader.onload = () => {

        const image =
          new Image();


        image.onload = () => {

          const maxSize =
            1600;

          let width =
            image.width;

          let height =
            image.height;


          /*
            Réduit les très grandes images
            pour faciliter la lecture.
          */

          if (
            width > maxSize ||
            height > maxSize
          ) {

            const ratio =
              Math.min(
                maxSize / width,
                maxSize / height
              );

            width =
              Math.floor(
                width * ratio
              );

            height =
              Math.floor(
                height * ratio
              );

          }


          qrCanvas.width =
            width;

          qrCanvas.height =
            height;


          canvasContext.drawImage(
            image,
            0,
            0,
            width,
            height
          );


          const imageData =
            canvasContext.getImageData(
              0,
              0,
              width,
              height
            );


          const result =
            jsQR(
              imageData.data,
              imageData.width,
              imageData.height,
              {
                inversionAttempts:
                  "attemptBoth"
              }
            );


          if (result) {

            const success =
              useDetectedQR(
                result.data
              );


            if (success) {
              return;
            }

          }


          showMessage(
            registerMessage,
            "Aucun code JASON valide n'a été trouvé dans cette image.",
            "error"
          );

        };


        image.onerror = () => {

          showMessage(
            registerMessage,
            "Impossible de lire cette image.",
            "error"
          );

        };


        image.src =
          reader.result;

      };


      reader.onerror = () => {

        showMessage(
          registerMessage,
          "Impossible d'importer cette image.",
          "error"
        );

      };


      reader.readAsDataURL(file);


      /*
        Permet de sélectionner
        à nouveau la même image.
      */

      event.target.value = "";

    }
  );


  /* =====================================
     INSCRIPTION
  ===================================== */

  registerForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      clearMessage(
        registerMessage
      );


      const name =
        document
          .getElementById("name")
          .value
          .trim();


      const email =
        document
          .getElementById("email")
          .value
          .trim()
          .toLowerCase();


      const phone =
        document
          .getElementById("phone")
          .value
          .trim();


      const password =
        document
          .getElementById("password")
          .value;


      const confirmPassword =
        document
          .getElementById("confirmPassword")
          .value;


      const referralCode =
        referralInput.value
          .trim()
          .toUpperCase();


      /* =================================
         VALIDATION
      ================================= */

      if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword
      ) {

        showMessage(
          registerMessage,
          "Veuillez remplir tous les champs obligatoires.",
          "error"
        );

        return;

      }


      if (
        name.length < 2
      ) {

        showMessage(
          registerMessage,
          "Veuillez entrer votre nom complet.",
          "error"
        );

        return;

      }


      if (
        password.length < 6
      ) {

        showMessage(
          registerMessage,
          "Le mot de passe doit contenir au moins 6 caractères.",
          "error"
        );

        return;

      }


      if (
        password !==
        confirmPassword
      ) {

        showMessage(
          registerMessage,
          "Les deux mots de passe ne correspondent pas.",
          "error"
        );

        return;

      }


      const clients =
        getClients();


      /* =================================
         EMAIL UNIQUE
      ================================= */

      const emailExists =
        clients.some(
          client =>
            String(
              client.email || ""
            ).toLowerCase() ===
            email
        );


      if (emailExists) {

        showMessage(
          registerMessage,
          "Cette adresse e-mail possède déjà un compte.",
          "error"
        );

        return;

      }


      /* =================================
         TELEPHONE UNIQUE
      ================================= */

      const cleanPhone =
        phone.replace(
          /\s/g,
          ""
        );


      const phoneExists =
        clients.some(
          client =>
            String(
              client.phone || ""
            ).replace(
              /\s/g,
              ""
            ) === cleanPhone
        );


      if (phoneExists) {

        showMessage(
          registerMessage,
          "Ce numéro possède déjà un compte.",
          "error"
        );

        return;

      }


      /* =================================
         VERIFICATION PARRAINAGE
      ================================= */

      let referralOwner =
        null;


      if (referralCode) {

        if (
          !/^JASON-[A-Z0-9]{6}$/
            .test(referralCode)
        ) {

          showMessage(
            registerMessage,
            "Code de parrainage invalide. Exemple : JASON-7K4P9X",
            "error"
          );

          return;

        }


        referralOwner =
          clients.find(
            client =>
              client.fidelityCode ===
              referralCode
          );


        if (!referralOwner) {

          showMessage(
            registerMessage,
            "Ce code de parrainage n'existe pas.",
            "error"
          );

          return;

        }

      }


      /* =================================
         CRÉATION DU CLIENT
      ================================= */

      const newClient = {

        id:
          generateClientId(),

        name:
          name,

        email:
          email,

        phone:
          phone,

        password:
          password,

        balance:
          0,

        vip:
          "Bronze",

        points:
          0,

        referrals:
          0,

        fidelityCode:
          generateUniqueCode(
            clients
          ),

        usedReferralCode:
          referralCode ||
          null,

        createdAt:
          new Date()
            .toISOString()

      };


      /* =================================
         BONUS DU PARRAIN
      ================================= */

      if (
        referralOwner
      ) {

        const ownerIndex =
          clients.findIndex(
            client =>
              client.id ===
              referralOwner.id
          );


        if (
          ownerIndex !== -1
        ) {

          clients[
            ownerIndex
          ].points =
            Number(
              clients[
                ownerIndex
              ].points || 0
            ) + 20;


          clients[
            ownerIndex
          ].referrals =
            Number(
              clients[
                ownerIndex
              ].referrals || 0
            ) + 1;

        }

      }


      /*
        Le nouveau client :
        0 point.

        Le propriétaire :
        +20 points.
      */


      clients.push(
        newClient
      );


      saveClients(
        clients
      );


      /* =================================
         CONNEXION AUTOMATIQUE
      ================================= */

      localStorage.setItem(
        "jasonbot_client",
        JSON.stringify(
          newClient
        )
      );


      showMessage(
        registerMessage,
        "Compte créé avec succès !",
        "success"
      );


      setTimeout(
        () => {

          window.location.href =
            "dash.html";

        },
        1000
      );

    }
  );


  /* =====================================
     CONNEXION
  ===================================== */

  loginForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      clearMessage(
        loginMessage
      );


      const email =
        document
          .getElementById(
            "loginEmail"
          )
          .value
          .trim()
          .toLowerCase();


      const password =
        document
          .getElementById(
            "loginPassword"
          )
          .value;


      const clients =
        getClients();


      const client =
        clients.find(
          user =>
            String(
              user.email || ""
            ).toLowerCase() ===
            email &&
            user.password ===
            password
        );


      if (!client) {

        showMessage(
          loginMessage,
          "E-mail ou mot de passe incorrect.",
          "error"
        );

        return;

      }


      localStorage.setItem(
        "jasonbot_client",
        JSON.stringify(
          client
        )
      );


      showMessage(
        loginMessage,
        "Connexion réussie !",
        "success"
      );


      setTimeout(
        () => {

          window.location.href =
            "dash.html";

        },
        500
      );

    }
  );


  /* =====================================
     MOT DE PASSE OUBLIÉ
  ===================================== */

  document
    .getElementById(
      "forgotPassword"
    )
    .addEventListener(
      "click",
      () => {

        alert(
          "Pour récupérer votre compte, contactez le support JASONBOT au +243 847 500 590."
        );

      }
    );


  /* =====================================
     NETTOYAGE
  ===================================== */

  window.addEventListener(
    "beforeunload",
    () => {

      stopQRScanner();

    }
  );

});