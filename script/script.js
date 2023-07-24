const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subheading');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup__edit-profile');
const popupUsername = document.querySelector('.popup__input-username');
const popupUserstatus = document.querySelector('.popup__input-userstatus');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup__add-image');
const popupPlace = document.querySelector('.popup__input-place');
const popupLink = document.querySelector('.popup__input-link');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupSaveButtons = document.querySelectorAll('.popup__save-button');

const cards = document.querySelector('.gallery__list');
const cardTemplate = document.querySelector('#card').content;
const card = cardTemplate.querySelector('.gallery__item');

const defaultCards = [
  {
    place: 'Карачаевск',
    link: './images/karachaevsk.jpg',
  },
  {
    place: 'Гора Эльбрус',
    link: './images/elbrus.jpg',
  },
  {
    place: 'Домбай',
    link: './images/dombai.jpg',
  },
  {
    place: 'Гора Эльбрус',
    link: './images/elbrus.jpg',
  },
  {
    place: 'Домбай',
    link: './images/dombai.jpg',
  },
  {
    place: 'Карачаево-Черкессия',
    link: './images/karachaevsk.jpg',
  },
];

function buildCard(item) {
  const node = card.cloneNode(true);
  const place = node.querySelector('.gallery__title');
  const image = node.querySelector('.gallery__image');
  const likeButton = node.querySelector('.gallery__like-button');
  const trashButton = node.querySelector('.gallery__trash-button');

  place.textContent = item.place;
  image.src = item.link;
  image.alt = item.place;

  likeButton.addEventListener('click', toggleLike);
  trashButton.addEventListener('click', () => {
    node.remove();
  });

  return node;
}

function addDefaultCards() {
  defaultCards.forEach((item) => {
    cards.append(buildCard(item));
  });
}

function renderProfileInfo() {
  popupUsername.value = profileName.textContent;
  popupUserstatus.value = profileStatus.textContent;
}

function setProfileInfo() {
  profileName.textContent = popupUsername.value;
  profileStatus.textContent = popupUserstatus.value;
}

function clearImageInfo() {
  popupPlace.value = '';
  popupLink.value = '';
}

function addNewCard() {
  cards.prepend(buildCard({ place: popupPlace.value, link: popupLink.value }));
}

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function toggleLike() {
  this.classList.toggle('gallery__like-button_checked');
}

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  renderProfileInfo();
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

popupSaveButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    closePopup(button.closest('.popup'));

    const currentPopupClasslist = button.closest('.popup').classList;
    if (currentPopupClasslist.contains('popup__edit-profile')) {
      setProfileInfo();
    } else if (currentPopupClasslist.contains('popup__add-image')) {
      addNewCard();
      clearImageInfo();
    }
  });
});

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});

renderProfileInfo();
addDefaultCards();
