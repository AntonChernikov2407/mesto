let page = document.querySelector('.page');
let profileName = page.querySelector('.profile__name');
let profileAboutYourself = page.querySelector('.profile__about-yourself');
let editButton = page.querySelector('.profile__edit-button');
let closeButton = page.querySelector('.popup__close-button');
let popup = page.querySelector('.popup');
let form = popup.querySelector('.form');
let submitButton = form.querySelector('.form__submit-button');
let formInput = form.querySelectorAll('.form__input');

// Открывает popup и заполняет поля ввода значениями со страницы
function openPopup() {
  popup.classList.add('popup_opened');
  formInput[0].value = profileName.textContent;
  formInput[1].value = profileAboutYourself.textContent;
}
// Закрывает popup
function closePopup() {
  popup.classList.remove('popup_opened');
}
// Сохраняет новые значения полей ввода и закрывает popup
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = formInput[0].value;
  profileAboutYourself.textContent = formInput[1].value;
  closePopup();
}

editButton.addEventListener('click', openPopup);

closeButton.addEventListener('click', closePopup);

form.addEventListener('submit', handleFormSubmit);
