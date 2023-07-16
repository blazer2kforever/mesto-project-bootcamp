const addButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupCloseButton = document.querySelector('.popup__close-button');
const likeButtons = document.querySelectorAll('.gallery__like-button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function toggleLike() {
  this.classList.toggle('gallery__like-button_checked');
}

addButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
likeButtons.forEach((button) => {
  button.addEventListener('click', toggleLike);
});
