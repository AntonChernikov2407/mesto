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
function renderInitialElements() {
  elements.prepend(...initialCards.map(createElement));
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
    return;
  }
  if (evt.target.classList.contains('element__delete-button')) {
    deleteElement(evt);
    return;
  }
  if (evt.target.classList.contains('element__image')) {
    zoomImage(evt);
  }
}

// Закрывает открытый popup при нажатии клавиши esc
function closeByKey(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = evt.currentTarget.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

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
  page.addEventListener('keydown', closeByKey);
  closeByKey(popup);
}

// Закрывает popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', closeByKey);
}

// Закрывает открытый popup при нажатии кнопки закрытия или подложки
function addEventsForPopups(evt) {
  if (evt.target.classList.contains('popup__close-button') ||
      evt.target.classList.contains('popup__close-overlay')) {
    closePopup(evt.target.closest('.popup'));
  }
}

// Открывает popupEditProfile и заполняет поля ввода значениями со страницы
function editProfile() {
  setEventListeners(validationConfig, popupEditProfile);
  openPopup(popupEditProfile);
  inputName.value = profileName.textContent;
  inputAbout.value = profileAboutYourself.textContent;
}

// Открывает popupAddPlace
function openCardPopup() {
  setEventListeners(validationConfig, popupAddPlace);
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

renderInitialElements();
enableValidation(validationConfig);
editButton.addEventListener('click', editProfile);
addButton.addEventListener('click', openCardPopup);
formEditProfile.addEventListener('submit', handleProfileFormSubmit);
formAddPlace.addEventListener('submit', handlePlaceFormSubmit);
elements.addEventListener('click', addEventsForElements);
page.addEventListener('click', addEventsForPopups);