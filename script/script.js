const profileName = document.querySelector('.profile__name');
const profileStatus = document.querySelector('.profile__subheading');

const editButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup__edit-profile');
const popupUsername = document.querySelector('.popup__input-username');
const popupUserstatus = document.querySelector('.popup__input-userstatus');

const addButton = document.querySelector('.profile__add-button');
const addPopup = document.querySelector('.popup__add-image');
const popupPlace = document.querySelector('.popup__input-place');
const popupLink = document.querySelector('.popup__input-link');

const popupCloseButtons = document.querySelectorAll('.popup__close-button');
const popupSaveButtons = document.querySelectorAll('.popup__save-button');

const likeButtons = document.querySelectorAll('.gallery__like-button');

function renderProfileInfo() {
  popupUsername.value = profileName.textContent;
  popupUserstatus.value = profileStatus.textContent;
}

function setProfileInfo() {
  profileName.textContent = popupUsername.value;
  profileStatus.textContent = popupUserstatus.value;
}

function clearImageInfo() {
  popupPlace.value = '';
  popupLink.value = '';
}

function openPopup(item) {
  item.classList.add('popup_opened');
}

function closePopup(item) {
  item.classList.remove('popup_opened');
}

function toggleLike() {
  this.classList.toggle('gallery__like-button_checked');
}

editButton.addEventListener('click', () => {
  openPopup(editPopup);
  renderProfileInfo();
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
});

popupSaveButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    closePopup(button.closest('.popup'));

    const currentPopupClasslist = button.closest('.popup').classList;
    if (currentPopupClasslist.contains('popup__edit-profile')) {
      setProfileInfo();
    } else if (currentPopupClasslist.contains('popup__add-image')) {
      clearImageInfo();
    }
  });
});

popupCloseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    closePopup(button.closest('.popup'));
  });
});

likeButtons.forEach((button) => {
  button.addEventListener('click', toggleLike);
});

renderProfileInfo();
