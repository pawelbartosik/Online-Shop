const minusButtonElements = document.querySelectorAll(".minus");
const plusButtonElements = document.querySelectorAll(".plus");
const deleteButtonElements = document.querySelectorAll(".delete");

async function decreaseCartItem(event) {
  event.preventDefault();

  const button = event.target;

  const productId = button.dataset.productid;
  const csrfToken = button.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/decrease", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }
  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  const quantityParagraph =
    button.parentElement.querySelector(".quantity-value");
  quantityParagraph.textContent =
    responseData.updatedCartData.updatedItemQuantity;

  const itemPriceSpan =
    button.parentElement.parentElement.querySelector(".total-item-price");
  itemPriceSpan.textContent = responseData.updatedCartData.updatedItemPrice;

  const cartPriceSpan = document.getElementById("total-price");
  cartPriceSpan.textContent = responseData.updatedCartData.newTotalPrice;

  const cartBadge = document.getElementById("badge-id");
  cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
}

async function increaseCartItem(event) {
  event.preventDefault();

  const button = event.target;

  const productId = button.dataset.productid;
  const csrfToken = button.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/increase", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }
  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  const quantityParagraph =
    button.parentElement.querySelector(".quantity-value");
  quantityParagraph.textContent =
    responseData.updatedCartData.updatedItemQuantity;

  const itemPriceSpan =
    button.parentElement.parentElement.querySelector(".total-item-price");
  itemPriceSpan.textContent = responseData.updatedCartData.updatedItemPrice;

  const cartPriceSpan = document.getElementById("total-price");
  cartPriceSpan.textContent = responseData.updatedCartData.newTotalPrice;

  const cartBadge = document.getElementById("badge-id");
  cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
}

async function deleteCartItem(event) {
  event.preventDefault();

  const button = event.target;

  const productId = button.dataset.productid;
  const csrfToken = button.dataset.csrf;

  let response;
  try {
    response = await fetch("/cart/remove", {
      method: "PATCH",
      body: JSON.stringify({
        productId: productId,
        _csrf: csrfToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    alert("Something went wrong!");
    return;
  }
  if (!response.ok) {
    alert("Something went wrong!");
    return;
  }

  const responseData = await response.json();

  button.parentElement.parentElement.remove();

  const cartPriceSpan = document.getElementById("total-price");
  cartPriceSpan.textContent = responseData.updatedCartData.newTotalPrice;

  const cartBadge = document.getElementById("badge-id");
  cartBadge.textContent = responseData.updatedCartData.newTotalQuantity;
}

for (const minusElement of minusButtonElements) {
  minusElement.addEventListener("click", decreaseCartItem);
}

for (const plusElement of plusButtonElements) {
  plusElement.addEventListener("click", increaseCartItem);
}

for (const deleteElement of deleteButtonElements) {
  deleteElement.addEventListener("click", deleteCartItem);
}
