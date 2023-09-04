function checkInputValidity(form, input, config) {
  if (!input.validity.valid) {
    showInputError(form, input, config);
  } else {
    hideInputError(form, input, config);
  }
}

function showInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(config.errorVisibleSelector);
  input.classList.add(config.inputInvalidSelector);
}

function hideInputError(form, input, config) {
  const errorElement = form.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorVisibleSelector);
  input.classList.remove(config.inputInvalidSelector);
}

function hasInputError(inputsArray) {
  return inputsArray.some((input) => {
    return !input.validity.valid;
  });
}

function changeButtonState(button, inputsArray, config) {
  if (hasInputError(inputsArray)) {
    button.setAttribute('disabled', true);
    button.classList.add(config.buttonDisabledSelector);
  } else {
    button.removeAttribute('disabled');
    button.classList.remove(config.buttonDisabledSelector);
  }
}

function resetValidationErrors(form, config) {
  const inputsArray = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonsArray = Array.from(form.querySelectorAll(config.buttonSelector));
  inputsArray.forEach((input) => {
    hideInputError(form, input, config);
  });
  buttonsArray.forEach((button) => {
    button.setAttribute('disabled', true);
    button.classList.add(config.buttonDisabledSelector);
  });
}

function setListeners(form, config) {
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  const inputsArray = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.buttonSelector);
  inputsArray.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(form, input, config);
      changeButtonState(button, inputsArray, config);
    });
  });
}

function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);
  forms.forEach((form) => {
    setListeners(form, config);
  });
}

export { enableValidation, resetValidationErrors };
