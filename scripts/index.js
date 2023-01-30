const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const page = document.querySelector('.page');
const profileName = page.querySelector('.profile__name');
const profileAboutYourself = page.querySelector('.profile__about-yourself');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddPlace = page.querySelector('.popup_type_add-place');
const popupZoomImage = page.querySelector('.popup_type_zoom-image');
const elementTemplate = page.querySelector('#element').content.querySelector('.element');
const elements = page.querySelector('.elements');

// Добавляет на страницу элементы массива
function renderElements() {
  const elementArr = initialCards.map(function (item) {
    return createElement(item);
  });
  elements.prepend(...elementArr);

};

// Создает новый элемент из шаблона и добавляет слушатели на кнопки
function createElement(item) {
  const element = elementTemplate.cloneNode(true);
  element.querySelector('.element__image').src = item.link;
  element.querySelector('.element__name').textContent = item.name;
  element.querySelector('.element__like-button').addEventListener('click', likeElement);
  element.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  element.querySelector('.element__image').addEventListener('click', zoomImage);
  return element;
};

// Включает/выключает кнопку лайка
function likeElement (evt) {
  evt.target.classList.toggle('element__like-button_active');
};

// Удаляет элемент
function deleteElement (evt) {
  evt.target.closest('.element').remove();
};

// Открывает editProfile, заполняет поля ввода значениями со страницы и добавляет слушатели на кнопки
function editProfile() {
  popupEditProfile.classList.add('popup_opened');
  popupEditProfile.querySelector('.form__input_item_name').value = profileName.textContent;
  popupEditProfile.querySelector('.form__input_item_about').value = profileAboutYourself.textContent;
  popupEditProfile.querySelector('.popup__close-button').addEventListener('click', closePopup);
  popupEditProfile.querySelector('.popup__overlay').addEventListener('click', closePopup);
  popupEditProfile.querySelector('.form').addEventListener('submit', editProfileSubmit);
}

// Открывает addPlace, заполняет поля ввода пустыми значениями и добавляет слушатели на кнопки
function addPlace() {
  popupAddPlace.classList.add('popup_opened');
  popupAddPlace.querySelector('.popup__close-button').addEventListener('click', closePopup);
  popupAddPlace.querySelector('.popup__overlay').addEventListener('click', closePopup);
  popupAddPlace.querySelector('.form__input_item_place').value = '';
  popupAddPlace.querySelector('.form__input_item_link').value = '';
  popupAddPlace.querySelector('.form').addEventListener('submit', addPlaceSubmit);
}

// Закрывает popup
function closePopup(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
}

// Открывает popup с увеличенным изображением
function zoomImage(evt) {
  popupZoomImage.classList.add('popup_opened');
  const link = evt.target.getAttribute('src');
  popupZoomImage.querySelector('.popup__image').src = link;
  const place = evt.target.nextElementSibling.textContent;
  popupZoomImage.querySelector('.popup__caption').textContent = place;
  popupZoomImage.querySelector('.popup__close-button').addEventListener('click', closePopup);
  popupZoomImage.querySelector('.popup__overlay').addEventListener('click', closePopup);
}

// Сохраняет новые значения полей ввода и закрывает popup
function editProfileSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = popupEditProfile.querySelector('.form__input_item_name').value;
  profileAboutYourself.textContent = popupEditProfile.querySelector('.form__input_item_about').value;
  popupEditProfile.classList.remove('popup_opened');
}

// Сохраняет новый элемент на странице и закрывает popup
function addPlaceSubmit(evt) {
  evt.preventDefault();
  const place = popupAddPlace.querySelector('.form__input_item_place').value;
  const link = popupAddPlace.querySelector('.form__input_item_link').value;
  const element = createElement({name: place, link: link});
  elements.prepend(element);
  popupAddPlace.classList.remove('popup_opened');
}

renderElements();

editButton.addEventListener('click', editProfile);

addButton.addEventListener('click', addPlace);