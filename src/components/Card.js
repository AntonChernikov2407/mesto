

export default class Card {

  constructor(data, templateSelector, {handleCardClick}) {
    this._name = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() { // Получает содержимое шаблона
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);
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

  _setEventListeners() { // Добавляет слушателей событий
    this._element.querySelector('.element__like-button').addEventListener('click', this._handleLikeButtonClick.bind(this));
    this._element.querySelector('.element__delete-button').addEventListener('click', this._handleDeleteButtonClick.bind(this));
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleCardClick(this._element);
    });
  }
}