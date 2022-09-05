const selectStatusElements = document.querySelectorAll("#change-status");

async function changeStatus(event) {
  const selectElement = event.target;
  const orderId = selectElement.dataset.orderid;
  const csrfToken = selectElement.dataset.csrf;

  let response;

  try {
    response = await fetch(`/admin/orders/${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({
        newStatus: selectElement.value,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something wrong!");
    return;
  }

  if (!response.ok) {
    alert("Something wrong!");
    return;
  }

  const statusParagraphElement =
    selectElement.parentElement.parentElement.querySelector("#order-status");
  statusParagraphElement.textContent = selectElement.value;
}

for (const element of selectStatusElements) {
  element.addEventListener("change", changeStatus);
}
