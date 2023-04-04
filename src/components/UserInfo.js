

export default class UserInfo {

  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    // this._avatar = document.querySelector(avatarSelector); // Не понимаю почему так не работает
    this._avatar = document.querySelector('.profile__avatar');
  }

  getUserInfo() { // Возвращает объект с информацией о пользователе со страницы
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo({name, about, avatar}) { // Устанавливает новую информацию о пользователе на страницу
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }

}
