

export default class UserInfo {

  constructor({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  getUserInfo() { // Возвращает объект с информацией о пользователе со страницы
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo({name, about}) { // Устанавливает новую информацию о пользователе на страницу
    this._name.textContent = name;
    this._about.textContent = about;
  }

}
