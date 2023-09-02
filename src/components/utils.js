const defaultImagesLinks = [
  new URL('../images/arkhyz.jpg', import.meta.url),
  new URL('../images/chelyabinsk-oblast.jpg', import.meta.url),
  new URL('../images/ivanovo.jpg', import.meta.url),
  new URL('../images/kamchatka.jpg', import.meta.url),
  new URL('../images/kholmogorsky-rayon.jpg', import.meta.url),
  new URL('../images/baikal.jpg', import.meta.url),
];

const defaultCards = [
  {
    place: 'Архыз',
    link: defaultImagesLinks[0],
  },
  {
    place: 'Челябинская область',
    link: defaultImagesLinks[1],
  },
  {
    place: 'Иваново',
    link: defaultImagesLinks[2],
  },
  {
    place: 'Камчатка',
    link: defaultImagesLinks[3],
  },
  {
    place: 'Холмогорский район',
    link: defaultImagesLinks[4],
  },
  {
    place: 'Байкал',
    link: defaultImagesLinks[5],
  },
];

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidSelector: 'popup__input_invalid',
  errorVisibleSelector: 'popup__input-error_visible',
  buttonSelector: '.popup__save-button',
  buttonDisabledSelector: 'popup__save-button_disabled',
};

export { defaultCards, validationConfig };
