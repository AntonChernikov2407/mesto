import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmitButton from '../components/PopupWithSubmitButton.js';
import Api from '../components/Api.js';
import {avatarElement, 
  validationConfig, 
  buttonEditProfile, 
  buttonAddPlace,
} from '../utils/constants.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: '00d3b65e-bd00-4c6d-a214-4372f39633e0',
    'Content-Type': 'application/json'
  }
});

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
  aboutSelector: '.profile__about-yourself',
  avatarSelector: '.profile__avatar' // Вот я слепой :)
});

const popupWithImage = new PopupWithImage('.popup_type_zoom-image');

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  handleFormSubmit: (values) => { // Обновление информации о пользователи
    popupEditProfile.renderLoading(true);
    api.patchUserInfo(values)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupEditProfile.renderLoading(false));
  } 
});

const createCard = (item, info) => { // Возвращает сгенерированную новую карточку
  const card = new Card(item, '#element', info, {
    handleCardClick: (element) => {
      popupWithImage.open(element);
    },
    handleDeleteButtonClick: (cardId, cardElement) => {
      popupDeleteCard.open(cardId, cardElement, card);
    },
    addLike: (cardId) => {
      putLike(cardId, card);
    },
    removeLike: (cardId) => {
      deleteLike(cardId, card);
    }
  });
  return card.generateCard();
}

const addPlace = (info) => {
  const popupAddPlace = new PopupWithForm({
    popupSelector: '.popup_type_add-place',
    handleFormSubmit: (values) => { // Добавление новой карточки
      popupAddPlace.renderLoading(true);
      const {place: name, link} = values;
      api.postNewCard({name, link})
        .then((data) => {
          renderCardElements.addItem(createCard(data, info));
          popupAddPlace.close();
        })
        .catch(err => console.log(err))
        .finally(() => popupAddPlace.renderLoading(false));
    }
  });
  popupAddPlace.setEventListeners();
  buttonAddPlace.addEventListener('click', () => {
    popupAddPlace.open();
  });
}

const popupDeleteCard = new PopupWithSubmitButton({
  popupSelector: '.popup_type_delete-card',
  handleFormSubmit: (cardId, cardElement, card) => { // Удаление карточки
    api.deleteCard(cardId)
      .then(() => {
        card.cardElementRemove(cardElement);
        popupDeleteCard.close(); 
      })
      .catch(err => console.log(err));
  }
})

const popupUpdateAvatar = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: (avatar) => { // Обновление аватара
    popupUpdateAvatar.renderLoading(true);
    api.patchUserAvatar(avatar)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupUpdateAvatar.close();
      })
      .catch(err => console.log(err))
      .finally(() => popupUpdateAvatar.renderLoading(false));
  }
})

const renderCardElements = new Section({
  renderer: (item, info) => { 
    renderCardElements.addItem(createCard(item, info));
  }
}, '.elements');

const getUserInfo = api.getUserInfo()
  .then((info) => {
    userInfo.setUserInfo(info);
    return info;
  })
  .catch(err => console.log(err));

const getInitialCards = api.getInitialCards()
  .then(data => data)
  .catch(err => console.log(err));

const promises = [getUserInfo, getInitialCards];  

Promise.all(promises)
  .then((res) => {
    const [info, cardsArray] = res;
    renderCardElements.renderItems(cardsArray, info);
    addPlace(info);
  })


const putLike = (cardId, card) => {
  api.putLike(cardId)
    .then((data) => {
      card.changeButtonState(data);
    })
    .catch(err => console.log(err));
}

const deleteLike = (cardId, card) => {
  api.deleteLike(cardId)
    .then((data) => {
      card.changeButtonState(data);
    })
    .catch(err => console.log(err));
}

avatarElement.addEventListener('click', () => {
  popupUpdateAvatar.open();
});

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupDeleteCard.setEventListeners();
popupUpdateAvatar.setEventListeners();

enableValidation(validationConfig);

buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  formValidators['editProfileForm'].resetValidation();
});