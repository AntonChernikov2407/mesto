import Popup from "./Popup.js";
import { inputName, inputAbout } from '../utils/constants.js';

export default class PopupWithForm extends Popup {

  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() { // Возвращает объект с полями ввода и их значениями
    this._inputList = this._popup.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    })
    return this._formValues;
  }

  setInputValues({name, about}) { // Устанавливает значения полей ввода при открытии формы
    inputName.value = name;
    inputAbout.value = about;
  }

  setEventListeners() { // Добавляет слушателей событий
    super.setEventListeners();
    this._popup.querySelector('.form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() { // Закрывает попап со сбросом полей ввода
    super.close();
    this._popup.querySelector('.form').reset();
  }

}