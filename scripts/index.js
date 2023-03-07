import Card from './Card.js';
import FormValidator from './FormValidator.js';
import {initialCards, validationConfig} from './constants.js';

const page = document.querySelector('.page');
const profileName = page.querySelector('.profile__name');
const profileAboutYourself = page.querySelector('.profile__about-yourself');
const buttonEditProfile = page.querySelector('.profile__edit-button');
const buttonAddPlace = page.querySelector('.profile__add-button');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddPlace = page.querySelector('.popup_type_add-place');
const popupZoomImage = page.querySelector('.popup_type_zoom-image');
const popupCaption = popupZoomImage.querySelector('.popup__caption');
const popupImage = popupZoomImage.querySelector('.popup__image');
const formEditProfile = document.forms.editProfileForm;
const formAddPlace = document.forms.addPlaceForm;
const inputName = formEditProfile.elements.name;
const inputAbout = formEditProfile.elements.about;
const inputPlace = formAddPlace.elements.place;
const inputLink = formAddPlace.elements.link;
const elements = page.querySelector('.elements');
const popupList = Array.from(page.querySelectorAll('.popup'));
const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
const formAddPlaceValidator = new FormValidator(validationConfig, formAddPlace);

function renderCard(data) { // Отрисовывает карточку на странице
  const card = new Card(data, '#element');
  const cardElement = card.generateCard();
  elements.prepend(cardElement);
}

function renderCardElements(array) { // Отрисовывает карточки массива на странице
  array.forEach((item) => renderCard(item));
}

function closeByKey(evt) { // Закрывает открытый popup при нажатии клавиши esc
  if (evt.key === 'Escape') {
    const popupOpened = evt.currentTarget.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

function openPopup(popup) { // Открывает popup
  popup.classList.add('popup_opened');
  page.addEventListener('keydown', closeByKey);
}

function closePopup(popup) { // Закрывает popup
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', closeByKey);
}

function addEventsForPopups() { // Закрывает открытый popup при нажатии кнопки закрытия или подложки
  popupList.forEach((popup) => {
    popup.addEventListener('click', (evt) => { 
      if (evt.target.classList.contains('popup__close-button') ||
          evt.target.classList.contains('popup__close-overlay')) {
        closePopup(popup);
      }
    });
  });
}

function editProfile() { // Открывает popupEditProfile и заполняет поля ввода значениями со страницы
  formEditProfileValidator.resetValidation();
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAboutYourself.textContent;
}

function openCardPopup() { // Открывает popupAddPlace
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
  const name = inputPlace.value;
  const link = inputLink.value;
  renderCard({name, link});
  evt.target.reset();
  closePopup(popupAddPlace);
}

formAddPlaceValidator.enableValidation();
formEditProfileValidator.enableValidation();
renderCardElements(initialCards);
addEventsForPopups();
buttonEditProfile.addEventListener('click', editProfile);
buttonAddPlace.addEventListener('click', openCardPopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddPlace.addEventListener('submit', handlePlaceFormSubmit);

export {openPopup, popupZoomImage, popupCaption, popupImage};