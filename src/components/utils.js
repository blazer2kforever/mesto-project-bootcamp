const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  inputInvalidSelector: 'popup__input_invalid',
  errorVisibleSelector: 'popup__input-error_visible',
  buttonSelector: '.popup__save-button',
  buttonDisabledSelector: 'popup__save-button_disabled',
};

const networkConfig = {
  url: 'https://nomoreparties.co/v1/wbf-cohort-11',
  headers: {
    authorization: 'b4d4e0d1-d19b-4b35-891c-88f5710bd461',
    'Content-Type': 'application/json',
  },
};

export { validationConfig, networkConfig };
