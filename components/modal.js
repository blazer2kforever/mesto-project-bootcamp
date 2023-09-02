import { resetValidationErrors } from './validate.js';
import { validationConfig } from './settings.js';

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('click', handleClickClose);
  document.addEventListener('keydown', handleEscClose);
}

function closePopup() {
  let popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleClickClose);
  document.removeEventListener('keydown', handleEscClose);
  resetValidationErrors(validationConfig);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    closePopup();
  }
}

function handleClickClose(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains('popup__close-button')
  ) {
    closePopup();
  }
}

export { openPopup, closePopup, handleEscClose };
