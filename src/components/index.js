import '../pages/index.css';

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

const editForm = document.querySelector('.popup__form-profile');
const imageForm = document.querySelector('.popup__form-image');

import { openPopup, closePopup } from './modal.js';
import { addDefaultCards, addNewCard } from './card.js';
import { enableValidation } from './validate.js';
import { defaultCards, validationConfig } from './utils.js';

function updateProfileInfo() {
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

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  updateProfileInfo();
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
  clearImageInfo();
});

editForm.addEventListener('submit', () => {
  setProfileInfo();
  closePopup();
});

imageForm.addEventListener('submit', () => {
  addNewCard(popupPlace.value, popupLink.value);
  clearImageInfo();
  closePopup();
});

updateProfileInfo();
addDefaultCards(defaultCards);
enableValidation(validationConfig);
