import { openPopup } from './modal.js';

const cards = document.querySelector('.gallery__list');

const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.gallery__item');

const imagePopup = document.querySelector('.popup__view-image');

const image = imagePopup.querySelector('.popup__image');
const description = imagePopup.querySelector('.popup__description');

function buildCard(item) {
  const node = card.cloneNode(true);
  const place = node.querySelector('.gallery__title');
  const image = node.querySelector('.gallery__image');
  const likeButton = node.querySelector('.gallery__like-button');
  const trashButton = node.querySelector('.gallery__trash-button');

  place.textContent = item.place;
  image.src = item.link;
  image.alt = item.place;

  image.addEventListener('click', () => {
    openPopup(imagePopup);
    setImage(item.place, item.link);
  });

  likeButton.addEventListener('click', toggleLike);
  trashButton.addEventListener('click', () => {
    node.remove();
  });

  return node;
}

function setImage(place, link) {
  image.src = link;
  image.alt = place;
  description.textContent = place;
}

function toggleLike() {
  this.classList.toggle('gallery__like-button_checked');
}

function addDefaultCards(cardlist) {
  cardlist.forEach((item) => {
    cards.append(buildCard(item));
  });
}

function addNewCard(name, url) {
  cards.prepend(buildCard({ place: name, link: url }));
}

export { buildCard, addDefaultCards, addNewCard };
