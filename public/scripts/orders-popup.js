const openButtons = document.querySelectorAll("#open-popup");
const closeButtons = document.querySelectorAll("#close-popup");
const backgroundElement = document.getElementById("background");

function openPopup(event) {
  const button = event.target;
  const popupElement =
    button.parentElement.parentElement.querySelector(".popup");
  //   popupElement.style.display = "block";
  popupElement.classList.add("popup-open");
  backgroundElement.style.display = "block";
}

function closePopup(event) {
  const button = event.target;
  const popupElement = button.parentElement;
  //   popupElement.style.display = "none";
  popupElement.classList.remove("popup-open");
  backgroundElement.style.display = "none";
}

for (const button of openButtons) {
  button.addEventListener("click", openPopup);
}

for (const button of closeButtons) {
  button.addEventListener("click", closePopup);
}
