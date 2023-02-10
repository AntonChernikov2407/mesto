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
const popupOpened = page.querySelector('.popup_opened');
const popupEditProfile = page.querySelector('.popup_type_edit-profile');
const popupAddPlace = page.querySelector('.popup_type_add-place');
const formEditProfile = document.forms.editProfileForm;
const formAddPlace = document.forms.addPlaceForm;
const inputName = formEditProfile.elements.name;
const inputAbout = formEditProfile.elements.about;
const inputPlace = formAddPlace.elements.place;
const inputLink = formAddPlace.elements.link;
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

// Создает новый элемент из шаблона
function createElement(item) {
  const element = elementTemplate.cloneNode(true);
  const elementImage = element.querySelector('.element__image');
  const elementName = element.querySelector('.element__name');
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementName.textContent = item.name;
  return element;
};

// Добавляет события на элементы фотокарточек 
function addEventsForElements(evt) {
  if (evt.target.classList.contains('element__like-button')) {
    toggleLike(evt);
  }
  if (evt.target.classList.contains('element__delete-button')) {
    deleteElement(evt);
  }
  if (evt.target.classList.contains('element__image')) {
    zoomImage(evt);
  }
}

// Включает/выключает кнопку лайка
function toggleLike(evt) {
  evt.target.classList.toggle('element__like-button_active');
};

// Удаляет элемент
function deleteElement(evt) {
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

// Закрывает открытый popup при нажатии кнопки закрытия или подложки
function addEventsForPopups(evt) {
  if (evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup__close-overlay')) {
    closePopup(evt.target.closest('.popup'));
  }
}

// Закрывает открытый popup при нажатии клавиши esc
function closeByKey(evt) {
  if (evt.key === 'Escape') {
    const popupsList = page.querySelectorAll('.popup');
    popupsList.forEach((popup) => {
      if (popup.classList.contains('popup_opened')) {
        closePopup(popup);
      }
    });
  };
};

// Проверка значений полей
// function checkInputValue(popup) {
//   const inputsList = popup.querySelectorAll('.form__input');
//   const submitButton = popup.querySelector('.form__submit-button');
//   inputsList.forEach((input) => {
//     if (input.value === '') {
//       submitButton.classList.add('form__submit-button_inactive');
//     } else {
//       submitButton.classList.remove('form__submit-button_inactive');
//       input.classList.remove('form__input_type_error');
//       input.nextElementSibling.classList.remove('form__input-error_active');
//     }
//   });
// };

// Открывает popupEditProfile и заполняет поля ввода значениями со страницы
function editProfile() {
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAboutYourself.textContent;
  // checkInputValue(popupEditProfile);
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
  // checkInputValue(popupAddPlace);
  closePopup(popupAddPlace);
}

renderElements();
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', openCardPopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddPlace.addEventListener('submit', handlePlaceFormSubmit);
elements.addEventListener('click', addEventsForElements);
page.addEventListener('click', addEventsForPopups);
page.addEventListener('keydown', closeByKey);