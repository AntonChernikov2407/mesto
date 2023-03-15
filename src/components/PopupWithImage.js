import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
  }

  open(element) { // Откравает попап с изображением выбранной карточки
    super.open();
    this._popup.querySelector('.popup__image').src = element.querySelector('.element__image').src;
    this._popup.querySelector('.popup__image').alt = element.querySelector('.element__image').alt;
    this._popup.querySelector('.popup__caption').textContent = element.querySelector('.element__name').textContent;
  }

}