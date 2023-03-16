import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {

  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues() { // Возвращает объект с полями ввода и их значениями
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setInputValues(data) { // Устанавливает значения полей ввода при открытии формы
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }

  setEventListeners() { // Добавляет слушателей событий
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() { // Закрывает попап со сбросом полей ввода
    super.close();
    this._form.reset();
  }

}