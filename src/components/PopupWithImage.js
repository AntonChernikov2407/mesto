import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open({name, image}) { // Откравает попап с изображением выбранной карточки
    super.open();
    this._popupImage.src = image.src;
    this._popupImage.alt = image.alt;
    this._popupCaption.textContent = name.textContent;
  }

}