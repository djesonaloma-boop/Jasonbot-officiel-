document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("ordersList");

  const orders = JSON.parse(
    localStorage.getItem("jasonbot_orders") || "[]"
  );

  if (orders.length === 0) {

    container.innerHTML = `
      <div class="dashboard-card">
        <span>📦</span>
        <h3>Aucune commande</h3>
        <p>Vos commandes apparaîtront ici.</p>
      </div>
    `;

    return;
  }

  orders.forEach(order => {

    const item = document.createElement("div");

    item.className = "dashboard-card";

    item.innerHTML = `
      <span>📦</span>
      <h3>${order.service}</h3>
      <p>ID : ${order.id}</p>
      <p>Prix : ${order.price} FC</p>
      <strong>Statut : ${order.status}</strong>
    `;

    container.appendChild(item);

  });

});