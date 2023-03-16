

export default class Popup {

  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() { // Открывает попап
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() { // Закрывает попап
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) { // Обработчик закрытия клавишей Esc
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() { // Добавляет слушателей событий
    this._popup.querySelector('.popup__close-button').addEventListener('click', this.close.bind(this));
    this._popup.querySelector('.popup__close-overlay').addEventListener('click', this.close.bind(this));
  }

}