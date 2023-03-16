import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {initialCards, 
  validationConfig, 
  buttonEditProfile, 
  buttonAddPlace,
} from '../utils/constants.js';


const formValidators = {};
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  })
}

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

const createCard = (item) => {
  const card = new Card(item, '#element', {
    handleCardClick: (element) => {
      popupWithImage.open(element);
    }
  });
  return card.generateCard();
}

const popupAddPlace = new PopupWithForm({
  popupSelector: '.popup_type_add-place',
  handleFormSubmit: (values) => {
    const {place: name, link} = values;
    renderCardElements.addItem(createCard({name, link}));
    popupAddPlace.close();
  }
});

const renderCardElements = new Section({
  data: initialCards,
  renderer: (item) => {
    renderCardElements.addItem(createCard(item));
  }
}, '.elements');

renderCardElements.renderItems();

popupWithImage.setEventListeners();
popupAddPlace.setEventListeners();
popupEditProfile.setEventListeners();

enableValidation(validationConfig);

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formValidators['editProfileForm'].resetValidation();
});

buttonAddPlace.addEventListener('click', () => {
  popupAddPlace.open();
});