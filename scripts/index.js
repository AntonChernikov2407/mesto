import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, validationConfig} from './constants.js';

const page = document.querySelector('.page');
const profileName = page.querySelector('.profile__name');
const profileAboutYourself = page.querySelector('.profile__about-yourself');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddPlace = page.querySelector('.popup_type_add-place');
const formEditProfile = document.forms.editProfileForm;
const formAddPlace = document.forms.addPlaceForm;
const inputName = formEditProfile.elements.name;
const inputAbout = formEditProfile.elements.about;
const inputPlace = formAddPlace.elements.place;
const inputLink = formAddPlace.elements.link;
const elements = page.querySelector('.elements');

function renderCardElement(array) { // Отрисовывает карточки на странице
  array.forEach((item) => {
    const card = new Card(item, '#element');
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
  })
}

function enableFormValidation(popup) { // Включает валидацию форм
  const formValidator = new FormValidator(validationConfig, popup);
  formValidator.enableValidation();
}

function closeByKey(evt) { // Закрывает открытый popup при нажатии клавиши esc
  if (evt.key === 'Escape') {
    const popupOpened = evt.currentTarget.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

export function openPopup(popup) { // Открывает popup
  popup.classList.add('popup_opened');
  page.addEventListener('keydown', closeByKey);
}

function closePopup(popup) { // Закрывает popup
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', closeByKey);
}

function addEventsForPopups(evt) { // Закрывает открытый popup при нажатии кнопки закрытия или подложки
  if (evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup__close-overlay')) {
    closePopup(evt.target.closest('.popup'));
  }
}

function editProfile() { // Открывает popupEditProfile и заполняет поля ввода значениями со страницы
  enableFormValidation(popupEditProfile);
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAboutYourself.textContent;
}

function openCardPopup() { // Открывает popupAddPlace
  enableFormValidation(popupAddPlace);
  openPopup(popupAddPlace);
}

function handleProfileFormSubmit(evt) { // Обработчик кнопки сабмита popupEditProfile
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutYourself.textContent = inputAbout.value;
  closePopup(popupEditProfile);
}

function handlePlaceFormSubmit(evt) { // Обработчик кнопки сабмита popupAddPlace
  evt.preventDefault();
  const place = inputPlace.value;
  const link = inputLink.value;
  renderCardElement([{name: place, link: link}]);
  evt.target.reset();
  closePopup(popupAddPlace);
}

renderCardElement(initialCards);
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', openCardPopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddPlace.addEventListener('submit', handlePlaceFormSubmit);
page.addEventListener('click', addEventsForPopups);