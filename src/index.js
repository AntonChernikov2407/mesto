import './index.css';
import Card from './components/Card.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import {initialCards, 
  validationConfig, 
  buttonEditProfile, 
  buttonAddPlace,
  formEditProfile,
  formAddPlace
} from './utils/constants.js';

const formEditProfileValidator = new FormValidator(validationConfig, formEditProfile);
const formAddPlaceValidator = new FormValidator(validationConfig, formAddPlace);

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  aboutSelector: '.profile__about-yourself'
});

const popupWithImage = new PopupWithImage('.popup_type_zoom-image');

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (values) => {
    userInfo.setUserInfo(values);
    popupEditProfile.close();
  } 
});

const popupAddPlace = new PopupWithForm({
  popupSelector: '.popup_type_add-place',
  handleFormSubmit: (values) => {
    const {place: name, link} = values;
    const newCard = new Card({name, link}, '#element', {
      handleCardClick: (element) => {
        popupWithImage.open(element);
      }
    });
    const cardElement = newCard.generateCard();
    renderCardElements.addItem(cardElement);
    popupAddPlace.close();
  }
});

const renderCardElements = new Section({
  data: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#element', {
      handleCardClick: (element) => {
        popupWithImage.open(element);
      }
    });
    const cardElement = card.generateCard();
    renderCardElements.addItem(cardElement);
  }
}, '.elements');

renderCardElements.renderItems();

popupWithImage.setEventListeners();
popupAddPlace.setEventListeners();
popupEditProfile.setEventListeners();

formAddPlaceValidator.enableValidation();
formEditProfileValidator.enableValidation();

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formEditProfileValidator.resetValidation();
});

buttonAddPlace.addEventListener('click', () => {
  popupAddPlace.open();
});