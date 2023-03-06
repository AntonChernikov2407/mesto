export default class FormValidator {

  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._selectedForm = form;
  }

  _showInputError(input) { // Показывает ошибки
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._inputErrorClass);
    this._errorElement.textContent = input.validationMessage;
    this._errorElement.classList.add(this._errorClass); 
  }

  _hideInputError(input) { // Скрывает ошибки
    this._errorElement = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._inputErrorClass);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  }

  _enableButton() { // Активирует кнопку сабмита
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  }

  _disableButton() { // Деактивирует кнопку сабмита
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  _hasInvalidInput() { // Проверка на наличие невалидных полей
    return this._inputList.some((input) => !input.validity.valid);
  }

  _toggleButtonState() { // Переключатель состояния кнопки
    this._hasInvalidInput()
      ? this._disableButton()
      : this._enableButton();
  }

  _checkInputValidity(input) { // Проверка валидности полей
    !input.validity.valid
      ? this._showInputError(input)
      : this._hideInputError(input);
  }

  _setEventListeners(input) { // Добавляет слушателей событий
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      this._toggleButtonState();
    })
  }

  _getInputList() { // Получает список полей ввода
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._inputList.forEach((input) => {
      this._hideInputError(input);
      this._setEventListeners(input);
    })
  }

  enableValidation() { // Включает валидацию
    this._form = this._selectedForm.querySelector(this._formSelector);
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._getInputList();
    this._toggleButtonState();
  }
}