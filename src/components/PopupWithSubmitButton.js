import Popup from "./Popup.js";

export default class PopupWithSubmitButton extends Popup {

  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
  }

  setEventListeners() { // Добавляет слушателей событий
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._cardId, this._card);
    });
  }

  open(cardId, card) { // Открывает попап и передеает данные
    super.open();
    this._cardId = cardId;
    this._card = card;
  }

}