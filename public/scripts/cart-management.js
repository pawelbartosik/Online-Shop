const addToCartButtonElement = document.querySelector(
  ".detail-description button"
);
const cartBadgeElements = document.querySelectorAll("nav .badge");

async function addToCart() {
  const productId = addToCartButtonElement.dataset.productid;
  const csrfToken = addToCartButtonElement.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/items", {
      method: "POST",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Semething went wrong!");
    return;
  }

  if (!response.ok) {
    alert("Semething went wrong!");
    return;
  }

  const responseData = await response.json();

  const newTotalQuantity = responseData.newTotalItems;

  for (const element of cartBadgeElements) {
    element.textContent = newTotalQuantity;
  }
}

addToCartButtonElement.addEventListener("click", addToCart);
