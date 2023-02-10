// Показывает ошибки
function showInputError({form, input, inputErrorClass, errorClass, errorMessage}) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

// Скрывает ошибки
function hideInputError({form, input, inputErrorClass, errorClass}) {
  const errorElement = form.querySelector(`.${input.id}-error`);
  input.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

// Проверка на наличие невалидных полей
function hasInvalidInput(inputsList) {
  return inputsList.some((input) => {
    return !input.validity.valid;
  });
};

// Переключатель состояния кнопки
function toggleButtonState(inputsList, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputsList)) {
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
  }
};

// Проверка валидности полей
function checkValidity({form, input, inputErrorClass, errorClass}) {
  if (!input.validity.valid) {
    const errorMessage = input.validationMessage;
    showInputError({form, input, inputErrorClass, errorClass, errorMessage});
  } else {
    hideInputError({form, input, inputErrorClass, errorClass});
  }
};

// Добавляет слушатели событий
function setEventListeners({form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) {
  const submitButton = form.querySelector(submitButtonSelector);
  const inputsList = Array.from(form.querySelectorAll(inputSelector));
  toggleButtonState(inputsList, submitButton, inactiveButtonClass);
  inputsList.forEach((input) => {
    input.addEventListener('input', function () {
      checkValidity({form, input, inputErrorClass, errorClass});
      toggleButtonState(inputsList, submitButton, inactiveButtonClass);
    })
  });
};

// Включает валидацию форм
function enableValidation({ 
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass}) {
    const formsList = Array.from(document.querySelectorAll(formSelector));
    formsList.forEach((form) => {
      setEventListeners({form, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
    });
  };

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});