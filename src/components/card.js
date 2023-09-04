import { openPopup } from './modal.js';
import { getCards, sendCard, deleteCard, likeCard, getCard } from './api.js';
import { userID } from './index.js';

const cards = document.querySelector('.gallery__list');

const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.gallery__item');

const imagePopup = document.querySelector('.popup__view-image');

const image = imagePopup.querySelector('.popup__image');
const description = imagePopup.querySelector('.popup__description');

let cardsArray = [];

function buildCard(item) {
  const node = card.cloneNode(true);
  const place = node.querySelector('.gallery__title');
  const image = node.querySelector('.gallery__image');
  const likeButton = node.querySelector('.gallery__like-button');
  const likes = node.querySelector('.gallery__likes-count');
  const trashButton = node.querySelector('.gallery__trash-button');

  place.textContent = item.place;
  image.src = item.link;
  image.alt = item.place;
  likes.textContent = item.likes.length;

  item.likes.forEach((like) => {
    if (like === userID) {
      likeButton.classList.add('gallery__like-button_checked');
    }
  });

  image.addEventListener('click', () => {
    openPopup(imagePopup);
    setImage(item.place, item.link);
  });

  likeButton.addEventListener('click', () => {
    toggleLike(item, likeButton, likes);
  });

  if (userID === item.ownerId) {
    trashButton.classList.add('gallery__trash-button_visible');
    trashButton.addEventListener('click', () => {
      deleteCard(item, node);
    });
  }

  return node;
}

function createCardTemplate(item) {
  const card = {
    place: item.name,
    link: item.link,
    cardId: item._id,
    ownerId: item.owner._id,
    likes: item.likes.map((like) => {
      return like._id;
    }),
  };
  return card;
}

function updateCards() {
  getCards()
    .then((cardsData) => {
      cardsArray = cardsData.map((item) => {
        return createCardTemplate(item);
      });
      cardsArray.forEach((item) => {
        cards.append(buildCard(item));
      });
    })
    .catch((err) => {
      alert(err);
    });
}

function setImage(place, link) {
  image.src = link;
  image.alt = place;
  description.textContent = place;
}

function toggleLike(card, button, count) {
  if (button.classList.contains('gallery__like-button_checked')) {
    likeCard(card, 'DELETE')
      .then((res) => {
        count.textContent = Number(res.likes.length);
        button.classList.remove('gallery__like-button_checked');
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    likeCard(card, 'PUT')
      .then((res) => {
        count.textContent = Number(res.likes.length);
        button.classList.add('gallery__like-button_checked');
      })
      .catch((err) => {
        alert(err);
      });
  }
}

function addNewCard(cardName, cardUrl) {
  return sendCard({ name: cardName, link: cardUrl })
    .then((res) => {
      const cardToArray = createCardTemplate(res);
      cardsArray.push(cardToArray);
      cards.prepend(buildCard(cardToArray));
    })
    .catch((err) => {
      alert(err);
    });
}

export { buildCard, addNewCard, updateCards };
