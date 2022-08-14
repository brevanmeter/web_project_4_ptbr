const editButton = document.querySelector(".editbutton");
const addButton = document.querySelector(".profile__add-button");
const saveButtonAddCard = document.querySelector(".popup__save-button_card");
const popupSaveButton = document.querySelector(".popup__button");


const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const cardTemplate = document.querySelector(".card-template").content;
const elements = document.querySelector(".elements");

const formEditProfile = document.forms.formEditProfile;
const formAddCard = document.forms.formAddCard;

const insertTitle = formAddCard.elements.title;
const insertLink = formAddCard.elements.link;
const insertButton = formAddCard.elements.button;

const insertName = formEditProfile.elements.name;
const insertAbout = formEditProfile.elements.about;

const popupEditProfile = document.querySelector(".popup-editprofile");
const popupAddCard = document.querySelector(".popup-addcard");
const popupImage = document.querySelector(".popup-image");


const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function callInitialCards() {
  elements.innerHTML = "";
  initialCards.map(function (item) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    cardElement.querySelector(".card__text").textContent = item.name;
    cardElement.querySelector(".card__image").src = item.link;
    cardElement.querySelector(".card__image").alt = item.name;
    return elements.append(cardElement);
  });
  callPopupImage();
  handleLikeIcon();
  deleteCard();
}


function handleProfile() {
  popupEditProfile.classList.toggle("popup_opened");
}

function savePopupProfile(evt) {
  profileName.textContent = insertName.value;
  profileDescription.textContent = insertAbout.value;
}

editButton.addEventListener("click", handleProfile);
popupSaveButton.addEventListener("click", savePopupProfile);



function handleAddCard() {
  popupAddCard.classList.add("popup_opened");
}

addButton.addEventListener("click", handleAddCard);


function callPopupImage() {
  const cardImage = document.querySelectorAll(".card__image");
  cardImage.forEach(function (item) {
    item.addEventListener("click", createPopupImage);
  });
}

function createPopupImage(evt) {
  const imageView = document.querySelector(".popup__image-view");
  imageView.src = evt.target.src;
  imageView.alt = evt.target.alt;
  const imageTitle = document.querySelector(".popup__caption");
  imageTitle.textContent = evt.target.alt;
  popupImage.classList.add("popup_opened");
}

const closePopupIcon = document.querySelectorAll(".popup__close-icon");

closePopupIcon.forEach(function (item) {
  item.addEventListener("click", function () {
    closePopup(item.closest(".popup"));
  });
});

function closePopup(item) {
  item.classList.remove("popup_opened");
  formAddCard.reset();
}

const popup = document.querySelectorAll(".popup");

popup.forEach(function (item) {
  item.addEventListener("click", function (evt) {
    if (!evt.target.closest(".popup__container")) {
      closePopup(item);
    }
  });
});

popup.forEach(function (item) {
  document.addEventListener("keydown", function (evt) {
    if (item.classList.contains("popup_opened") && evt.key === "Escape") {
      closePopup(item);
    }
  });
});


formEditProfile.addEventListener("submit", function (evt) {
  evt.preventDefault();
  profileName.textContent = insertName.value;
  profileDescription.textContent = insertAbout.value;
  closePopup(popupEditProfile);
  formEditProfile.reset();
});

formAddCard.addEventListener("submit", addCard);

function addCard(evt) {
  const newCard = {
    name: insertTitle.value,
    link: insertLink.value,
  };
  initialCards.unshift(newCard);
  callInitialCards();
  closePopup(popupAddCard);
  clearAddCardPopup();
}

function clearAddCardPopup() {
  closePopup(popupAddCard);
  formAddCard.reset();
  insertButton.disabled = false;
}

function handleLikeIcon() {
  const likeButton = document.querySelectorAll(".card__like-button");
  likeButton.forEach(function (item) {
    item.addEventListener("click", function (evt) {
      item.classList.toggle("card__like-button_active");
    });
  });
}


function deleteCard() {
  const deleteButton = document.querySelectorAll(".card__trash");
  deleteButton.forEach(function (item) {
    item.addEventListener("click", function () {
      item.closest(".card").remove();
    });
  });
}


callInitialCards();
