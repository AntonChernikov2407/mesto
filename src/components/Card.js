

export default class Card {

  constructor(data, templateSelector, info, {handleCardClick, handleDeleteButtonClick, addLike, removeLike}) {
    this._name = data.name;
    this._image = data.link;
    this._arrayLikes = data.likes;
    this._cardOwnerId = data.owner._id;
    this._cardId = data._id;
    this._userId = info._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._addLike = addLike;
    this._removeLike = removeLike;
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
    this._likeCount = this._element.querySelector('.element__like-count');
    this._setEventListeners();
    this._checkOwnerCard();
    this._checkWhoLiked();
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;
    this._likeCount.textContent = this._arrayLikes.length;

    return this._element;
  }

  _checkOwnerCard() { // Проверка владельца карточки
    if (this._userId !== this._cardOwnerId) {
      this._deleteButton.classList.add('element__delete-button_hide');
    }
  }

  _checkWhoLiked() { // Проверка кто лайкнул карточку
    if (this._haveMyLike()) {
      this._likeButton.classList.add('element__like-button_active');
    }
  }

  _haveMyLike() { // Есть ли мой лайк
    return this._arrayLikes.some((user) => {
      if (user._id === this._userId) {
        return true;
      }
    })
  }

  _returnObj() { // Возвращает объект с данными
    return {
      cardId: this._cardId,
      likeCount: this._likeCount,
      likeButton: this._likeButton
    }
  }

  _handleLikeButtonClick() { // Обработчик клика по кнопке лайка
    if (!this._likeButton.classList.contains('element__like-button_active')) {
      this._addLike(this._returnObj());
    } else {
      this._removeLike(this._returnObj());
    }
  }

  _setEventListeners() { // Добавляет слушателей событий
    const {name, image} = {name: this._cardName, image: this._cardImage};
    this._likeButton.addEventListener('click', this._handleLikeButtonClick.bind(this));
    this._deleteButton.addEventListener('click', () => {
      this._handleDeleteButtonClick(this._cardId, this._element);
    });
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick({name, image});
    });
  }
}