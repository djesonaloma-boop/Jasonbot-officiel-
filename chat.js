document.addEventListener("DOMContentLoaded", () => {

  const messagesBox = document.getElementById("messages");
  const input = document.getElementById("messageInput");
  const button = document.getElementById("sendBtn");

  let messages = JSON.parse(
    localStorage.getItem("jasonbot_messages") || "[]"
  );

  function displayMessages() {

    messagesBox.innerHTML = "";

    messages.forEach(message => {

      const div = document.createElement("div");

      div.style.padding = "12px";
      div.style.marginBottom = "10px";
      div.style.borderRadius = "10px";
      div.style.background =
        message.sender === "client"
          ? "#10345a"
          : "#172536";

      div.innerHTML = `
        <strong>
          ${message.sender === "client" ? "Vous" : "JASONBOT"}
        </strong>
        <br>
        ${message.text}
      `;

      messagesBox.appendChild(div);

    });

    messagesBox.scrollTop = messagesBox.scrollHeight;
  }

  button.addEventListener("click", () => {

    const text = input.value.trim();

    if (!text) return;

    messages.push({
      sender: "client",
      text,
      date: new Date().toISOString()
    });

    localStorage.setItem(
      "jasonbot_messages",
      JSON.stringify(messages)
    );

    input.value = "";

    displayMessages();

  });

  displayMessages();

});