

export default class Api {

  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) { // Получает данные ответа
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json();
  }

  getUserInfo() { // Запрос на получение информации о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  patchUserInfo({name, about}) { // Запрос на обновление информации о пользователе
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => this._getResponseData(res));
  }

  getInitialCards() { // Запрос на получение всех карточек
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  postNewCard({name, link}) { // Запрос на добавление новой карточки
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) { // Запрос на удаление карточки
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  putLike(cardId) { // Запрос на добавление лайка
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  deleteLike(cardId) {// Запрос на удаление лайка
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res));
  }

  patchUserAvatar({avatar}) { // Запрос на обновление аватара
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => this._getResponseData(res));
  }

}



