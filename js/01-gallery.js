import { galleryItems } from "./gallery-items.js";

const instance = basicLightbox.create(`
    <div class="modal">
        <img class="gallery__imageModal"
        src='https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg'
        alt="img"/>
    </div>
`)

const galleryCreate = document.querySelector("div.gallery");
const galleryCard = createCard(galleryItems);



galleryCreate.insertAdjacentHTML('beforeend', galleryCard);
galleryCreate.addEventListener('click', onCardGallery);


function createCard(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"/>
      </a>
    </div>
    `;
    })
    .join("");
}

function onCardGallery(event) {
  event.preventDefault();
  window.addEventListener('keydown', closeModalKeydown);
  const findGalleryCard = event.target.classList.contains('gallery__image');


  if(!findGalleryCard) {
    return;
  }
  const urlImgCard = event.target.getAttribute('data-source');
  const desImgCard = event.target.getAttribute('alt');
  openModal(urlImgCard, desImgCard);


}

function openModal(url, des) {
  const modalCard = instance.element().querySelector('.gallery__imageModal');

  modalCard.setAttribute('src', url);
  modalCard.setAttribute('alt', des);
instance.show()
}

function closeModalKeydown(e) {
  if (e.code === "Escape") {
    instance.close(() => {
      window.removeEventListener('keydown', closeModalKeydown);
    })
  }

}

