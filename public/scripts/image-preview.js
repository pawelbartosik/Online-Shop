const imageInputElement = document.querySelector("#image-preview input");
const imagePreviewElement = document.querySelector("#image-preview img");

function imagePreview() {
  const files = imageInputElement.files;

  if (!files || files.length === 0) {
    imagePreviewElement.style.display = "none";
    return;
  }
  const file = files[0];

  imagePreviewElement.src = URL.createObjectURL(file);
  imagePreviewElement.style.display = "block";
}

imageInputElement.addEventListener("change", imagePreview);
