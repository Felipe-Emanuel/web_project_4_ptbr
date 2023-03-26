import { renderCards, initialCards } from "./renderCards.js";

const modalEditContent = document.querySelector(".modal-edit");
const closeForm = modalEditContent.querySelector(".modal-edit__close-form");
const placeholderName = modalEditContent.querySelector(".modal-edit__form-input-name");
const placeholderAboutAndUrl = modalEditContent.querySelector(".modal-edit__form-input-about");
const modalTitle = modalEditContent.querySelector(".modal-edit__form-title");
const openEditForm = document.querySelector(".profile__eddit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const submitButton = document.querySelector(".modal-edit__form-submit");
const cards = document.querySelector(".cards");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const profileMobileSubTitle = document.querySelector(".profile__subtitle_mobile");
const error = document.querySelector(".modal-edit__error");
const showedImage = document.querySelector(".showedImage");
const closeShowedImage = showedImage.querySelector(".showedImage__close-image");
const imageShowed = showedImage.querySelector(".showedImage__image");
const imageShowedTitle = document.querySelector(".showedImage__title");

const isModalOpening = (element) => {
  element.classList.remove("closing");
  element.classList.add("opening");
  element.style.display = "flex";
}

function capitalizeName(value) {
  return value.value
    .replace(/\b\w/g, (letter) => {
      return letter.toUpperCase();
    })
    .trim();
}

const hideShowedImage = () => {
  showedImage.classList.add("closing");
  showedImage.classList.remove("opening");

  setTimeout(() => {
    showedImage.style.display = "none";
    imageShowed.setAttribute("src", "");
    imageShowedTitle.textContent = "";
  }, 450);
};

const hideForm = () => {
  modalEditContent.classList.add("closing");
  modalEditContent.classList.remove("opening");

  setTimeout(() => {
    modalEditContent.style.display = "none";
  }, 450);

};

const showForm = (e) => {
  error.textContent = "";
  modalTitle.textContent = "";

  isModalOpening(modalEditContent)

  e.target.getAttribute("id") == "edditBbutton"
    ? ((placeholderName.value = profileTitle.textContent),
      (placeholderAboutAndUrl.value = profileSubTitle.textContent),
      placeholderName.setAttribute("placeholder", "Insira seu nome"),
      placeholderAboutAndUrl.setAttribute("placeholder", "Explorar"),
      (modalTitle.textContent = "Editar Perfil"))
    : ((placeholderName.value = ""),
      (placeholderAboutAndUrl.value = ""),
      placeholderName.setAttribute("placeholder", "Nome do lugar"),
      placeholderAboutAndUrl.setAttribute("placeholder", "URL da imagem"),
      (modalTitle.textContent = "Novo Lugar"));

  modalEditContent.classList.add("modal-edit__hidden");

};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  const setNewName = () => {
  profileTitle.textContent = capitalizeName(placeholderName);
  profileSubTitle.textContent = capitalizeName(placeholderAboutAndUrl);
  profileMobileSubTitle.textContent = capitalizeName(placeholderAboutAndUrl);
  };

  const setNewCard = (name, link) => {
    const id = initialCards.length +1;
    const newCard = {
      id,
      name,
      link
    }

    initialCards.unshift(newCard);

    cards.innerHTML = renderCards();
    handleFillHeart();
    handleDeleteCard();
    showShowedImage();
  };

  if (
    placeholderName &&
    placeholderAboutAndUrl.value !== "" &&
    placeholderName.value !== ""
  ) {
    placeholderName.getAttribute("placeholder") == "Insira seu nome"
      ? setNewName()
      : setNewCard(placeholderName.value, placeholderAboutAndUrl.value);

    hideForm();
    error.textContent = "";
    return;
  }

  return (error.textContent = "Os campos não podem estar em branco!");
};

const handleFillHeart = () => {
  const hearts = document.querySelectorAll(".card__like-button");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      const attribute = heart.getAttribute("src");

      if (attribute === "./images/Heart.svg") {
        heart.setAttribute("src", "./images/filledHeart.svg");
        return;
      }

      heart.setAttribute("src", "./images/Heart.svg");
    });
  });
};

const handleDeleteCard = () => {
  const trashIcon = document.querySelectorAll(".card__trash-button");

  const handleDelet = (e) => {
    const id = e.currentTarget.parentNode.getAttribute("id")
    const index = initialCards.findIndex((item) => item.id == id);

    if (index !== -1) {
      initialCards.splice(index, 1);
      e.currentTarget.parentNode.remove();

      cards.innerHTML = renderCards();
      handleFillHeart();
      handleDeleteCard();
      showShowedImage();
    }
  };

  trashIcon.forEach((trashIcon) => {
    trashIcon.addEventListener("click", handleDelet);
  });
}

const showShowedImage = () => {
  const imageCard = document.querySelectorAll(".card__image");

  imageCard.forEach((image) => {
    image.addEventListener("click", () => {

      const id = image.getAttribute("data-index")
      imageShowed.setAttribute("src", initialCards[id].link);
      imageShowed.setAttribute("alt", `Imagem de ${initialCards[id].name}`);
      imageShowedTitle.textContent = initialCards[id].name;

      isModalOpening(showedImage)
    });
  });
};

const setMobileSubtitle = () => {
  return profileMobileSubTitle.textContent = profileSubTitle.textContent
}

const updateDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const dateFooter = document.querySelector(".year");

  dateFooter.textContent = year;
};

closeForm.addEventListener("click", hideForm);
openEditForm.addEventListener("click", showForm);
closeShowedImage.addEventListener("click", hideShowedImage);
addNewCardButton.addEventListener("click", showForm);
submitButton.addEventListener("click", handleProfileFormSubmit);
cards.innerHTML = renderCards();
updateDate();
handleFillHeart();
handleDeleteCard();
showShowedImage();
setMobileSubtitle();
