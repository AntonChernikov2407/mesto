let page = document.querySelector('.page');
let editButton = page.querySelector('.profile__edit-button');
let closeButton = page.querySelector('.popup__close-button');
let popup = page.querySelector('.popup');
let form = popup.querySelector('.popup__container');
let submitButton = form.querySelector('.popup__submit-button');
let profileName = page.querySelector('.profile__name');
let popupName = form.querySelector('.popup__name');
let profileAboutYourself = page.querySelector('.profile__about-yourself');
let popupAboutYourself = form.querySelector('.popup__about-yourself');


function popupOpen() {
  popup.classList.add('popup_opened');
  popupName.value = profileName.textContent;
  popupAboutYourself.value = profileAboutYourself.textContent;
}

editButton.addEventListener('click', popupOpen);

function popupClose() {
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', popupClose);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupName.value;
  profileAboutYourself.textContent = popupAboutYourself.value;
  popupClose();
}

form.addEventListener('submit', handleFormSubmit);
