import '../pages/index.css';

const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subheading');

const avatarButton = document.querySelector('.profile__avatar-button');
const avatarPopup = document.querySelector('.popup__edit-avatar');
const avatarLink = document.querySelector('.popup__input-avatar');
const avatarImage = document.querySelector('.profile__avatar');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup__edit-profile');
const popupUsername = document.querySelector('.popup__input-username');
const popupUserstatus = document.querySelector('.popup__input-userstatus');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup__add-image');
const popupPlace = document.querySelector('.popup__input-place');
const popupLink = document.querySelector('.popup__input-link');

const avatarForm = document.querySelector('.popup__form-avatar');
const editForm = document.querySelector('.popup__form-profile');
const imageForm = document.querySelector('.popup__form-image');

export let userID = null;
let userData = null;

import { openPopup, closePopup } from './modal.js';
import { addNewCard, updateCards } from './card.js';
import { enableValidation, resetValidationErrors } from './validate.js';
import { validationConfig } from './utils.js';
import { getUserInfo, changeUserInfo, setAvatar } from '../components/api.js';

function setProfileInfoStartup() {
  getUserInfo().then((user) => {
    userData = user;
    userID = user._id;
    profileName.textContent = user.name;
    profileStatus.textContent = user.about;

    updateCards();
    updateAvatarInfo();
  });
}

function setButtonLoadingState(button, text) {
  button.textContent = text;
}

function setProfilePopup() {
  popupUsername.value = profileName.textContent;
  popupUserstatus.value = profileStatus.textContent;
}

function setProfileInfo() {
  profileName.textContent = popupUsername.value;
  profileStatus.textContent = popupUserstatus.value;
}

function updateAvatarInfo() {
  avatarImage.src = userData.avatar;
}

function setAvatarInfo() {
  avatarImage.src = avatarLink.value;
  setAvatar(avatarLink.value);
}

function clearForm(form) {
  form.reset();
}

avatarButton.addEventListener('click', () => {
  openPopup(avatarPopup);
  clearForm(avatarForm);
});

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  setProfilePopup();
  resetValidationErrors(editForm, validationConfig);
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
  clearForm(imageForm);
  resetValidationErrors(imageForm, validationConfig);
});

avatarForm.addEventListener('submit', () => {
  setButtonLoadingState(
    avatarForm.querySelector('.popup__save-button'),
    'Сохранение...'
  );
  setAvatarInfo();
  closePopup();
  setButtonLoadingState(
    avatarForm.querySelector('.popup__save-button'),
    'Сохранить'
  );
});

editForm.addEventListener('submit', () => {
  setButtonLoadingState(
    editForm.querySelector('.popup__save-button'),
    'Сохранение...'
  );
  setProfileInfo();
  changeUserInfo(popupUsername.value, popupUserstatus.value).then(() => {
    closePopup();
    setButtonLoadingState(
      editForm.querySelector('.popup__save-button'),
      'Cохранить'
    );
  });
});

imageForm.addEventListener('submit', () => {
  setButtonLoadingState(
    imageForm.querySelector('.popup__save-button'),
    'Сохранение...'
  );
  addNewCard(popupPlace.value, popupLink.value);
  closePopup();
  setButtonLoadingState(
    imageForm.querySelector('.popup__save-button'),
    'Cохранить'
  );
});

setProfileInfoStartup();
setProfilePopup();

enableValidation(validationConfig);
