import {openPopup} from './index.js';

const popupZoomImage = document.querySelector('.popup_type_zoom-image');
const popupCaption = popupZoomImage.querySelector('.popup__caption');
const popupImage = popupZoomImage.querySelector('.popup__image');

export default class Card {

  constructor(data, templateSelector) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() { // Получает содержимое шаблона
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
      
    return cardElement;
  }

  generateCard() { // Генерирует новую карточку
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  _handleLikeButtonClick() { // Обработчик клика по кнопке лайка
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleDeleteButtonClick() { // Обработчик клика по кнопке удаления
    this._element.remove();
  }

  _handleImageClick() { // Обработчик клика по изображению карточки
    openPopup(popupZoomImage);
    popupImage.src = this._image;
    popupImage.alt = this._name;
    popupCaption.textContent = this._name;
  }

  _setEventListeners() { // Добавляет слушателей событий
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeButtonClick();
    });
    this._element.querySelector('.element__delete-button').addEventListener('click', () => {
      this._handleDeleteButtonClick();
    });
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }
}