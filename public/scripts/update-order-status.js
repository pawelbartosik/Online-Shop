const selectStatusElements = document.querySelectorAll("#change-status");

function changeStatus(event) {
  const selectElement = event.target;
  const statusParagraphElement =
    selectElement.parentElement.parentElement.querySelector("#order-status");
  statusParagraphElement.textContent = selectElement.value;
}

for (const element of selectStatusElements) {
  element.addEventListener("change", changeStatus);
}
