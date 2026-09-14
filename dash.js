document.addEventListener("DOMContentLoaded", () => {

  const client = JSON.parse(
    localStorage.getItem("jasonbot_client") || "{}"
  );

  document.getElementById("clientName").textContent =
    client.name || "Client JASONBOT";

  document.getElementById("balance").textContent =
    `${client.balance || 0} FC`;

  document.getElementById("vip").textContent =
    client.vip || "Bronze";

  document.getElementById("points").textContent =
    client.points || 0;

  document.getElementById("orders").textContent =
    client.orders || 0;

});