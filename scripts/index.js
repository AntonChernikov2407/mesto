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
const closeButtons = page.querySelectorAll('.popup__close-button');
const overlays = page.querySelectorAll('.popup__close-overlay');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddPlace = page.querySelector('.popup_type_add-place');
const formEditProfile = popupEditProfile.querySelector('.form');
const formAddPlace = popupAddPlace.querySelector('.form');
const inputName = popupEditProfile.querySelector('.form__input_item_name');
const inputAbout = popupEditProfile.querySelector('.form__input_item_about');
const inputPlace = popupAddPlace.querySelector('.form__input_item_place');
const inputLink = popupAddPlace.querySelector('.form__input_item_link');
const popupZoomImage = page.querySelector('.popup_type_zoom-image');
const popupImage = popupZoomImage.querySelector('.popup__image');
const popupCaption = popupZoomImage.querySelector('.popup__caption');
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
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__name');
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementName.textContent = item.name;
  element.querySelector('.element__like-button').addEventListener('click', toggleLike);
  element.querySelector('.element__delete-button').addEventListener('click', deleteElement);
  elementImage.addEventListener('click', zoomImage);
  return element;
};

// Включает/выключает кнопку лайка
function toggleLike (evt) {
  evt.target.classList.toggle('element__like-button_active');
};

// Удаляет элемент
function deleteElement (evt) {
  evt.target.closest('.element').remove();
};

// Открывает popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// Закрывает popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Добавляет слушатели на кнопку закрытия
closeButtons.forEach(function (buttons) {
  const popup = buttons.closest('.popup');
  buttons.addEventListener('click', function() {
    closePopup(popup);
  });
});

// Добавляет слушатели на подложку
overlays.forEach(function(element) {
  const popup = element.closest('.popup');
  element.addEventListener('click', function() {
    closePopup(popup);
  });
})

// Открывает popupEditProfile и заполняет поля ввода значениями со страницы
function editProfile() {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAboutYourself.textContent;
}

// Открывает popupAddPlace
function openCardPopup() {
  openPopup(popupAddPlace);
}

// Открывает popupZoomImage с изображением выбранной карточки
function zoomImage(evt) {
  openPopup(popupZoomImage);
  const link = evt.target.getAttribute('src');
  const place = evt.target.nextElementSibling.firstElementChild.textContent;
  popupImage.src = link;
  popupImage.alt = place;
  popupCaption.textContent = place;
}

// Сохраняет новые значения полей ввода и закрывает popup
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAboutYourself.textContent = inputAbout.value;
  closePopup(popupEditProfile);
}

// Сохраняет новый элемент на странице, сбрасывает значения полей ввода и закрывает popup
function handlePlaceFormSubmit(evt) {
  evt.preventDefault();
  const place = inputPlace.value;
  const link = inputLink.value;
  const element = createElement({name: place, link: link});
  elements.prepend(element);
  evt.target.reset();
  closePopup(popupAddPlace);
}

renderElements();
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', openCardPopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddPlace.addEventListener('submit', handlePlaceFormSubmit);