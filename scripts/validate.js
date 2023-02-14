// Показывает ошибки
function showInputError(config, form, input, errorMessage) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(config['inputErrorClass']);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config['errorClass']);
};

// Скрывает ошибки
function hideInputError(config, form, input) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config['inputErrorClass']);
  errorElement.textContent = '';
  errorElement.classList.remove(config['errorClass']);
};

// Деактивирует кнопку сабмита
function disableButton(config, submitButton) {
  submitButton.classList.add(config['inactiveButtonClass']);
  submitButton.setAttribute('disabled', true);
}

// Активирует кнопку сабмита
function enableButton(config, submitButton) {
  submitButton.classList.remove(config['inactiveButtonClass']);
  submitButton.removeAttribute('disabled');
}

// Проверка на наличие невалидных полей
function hasInvalidInput(inputsList) {
  return inputsList.some((input) => {
    return !input.validity.valid;
  });
};

// Переключатель состояния кнопки
function toggleButtonState(config, inputsList, submitButton) {
  if (hasInvalidInput(inputsList)) {
    disableButton(config, submitButton);
  } else {
    enableButton(config, submitButton);
  }
};

// Проверка валидности полей
function checkValidity(config, form, input) {
  const errorMessage = input.validationMessage;
  if (!input.validity.valid) {
    showInputError(config, form, input, errorMessage);
  } else {
    hideInputError(config, form, input);
  }
};

// Добавляет слушатели событий
function setEventListeners(config, form) {
  const submitButton = form.querySelector(config['submitButtonSelector']);
  const inputsList = Array.from(form.querySelectorAll(config['inputSelector']));
  toggleButtonState(config, inputsList, submitButton);
  inputsList.forEach((input) => {
    disableButton(config, submitButton);
    hideInputError(config, form, input);
    input.addEventListener('input', function () {
      checkValidity(config, form, input);
      toggleButtonState(config, inputsList, submitButton);
    })
  });
};

// Включает валидацию форм
function enableValidation(config) {
    const formsList = Array.from(document.querySelectorAll(config['formSelector']));
    formsList.forEach((form) => {
      setEventListeners(config, form);
    });
  };