

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
    this._cardImage = this._element.querySelector('.element__image');
    this._cardName = this._element.querySelector('.element__name');
    this._likeButton = this._element.querySelector('.element__like-button');
    this._deleteButton = this._element.querySelector('.element__delete-button');
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    return this._element;
  }

  _handleLikeButtonClick() { // Обработчик клика по кнопке лайка
    this._likeButton.classList.toggle('element__like-button_active');
  }

  _handleDeleteButtonClick() { // Обработчик клика по кнопке удаления
    this._element.remove();
  }

  _setEventListeners() { // Добавляет слушателей событий
    const {name, image} = {name: this._cardName, image: this._cardImage};
    this._likeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));
    this._deleteButton.addEventListener('click', this._handleDeleteButtonClick.bind(this));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({name, image});
    });
  }
}