// NIE KORZYSTAM Z TEGO SKRYPTU 568!!!!!!

const allDeleteButtonElements = document.getElementById("delete-btn");

function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;
}

for (const element of allDeleteButtonElements) {
  element.addEventListener("click", deleteProduct);
}
