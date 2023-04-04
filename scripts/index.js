import { inputField } from "./inputField.js";
import { renderCards, initialCards } from "./renderCards.js";
import { enableValidation, setError, resetErrorMessage } from "./validate.js";

const modalEditContent = document.querySelector(".modal-edit");
const closeForm = modalEditContent.querySelector(".modal-edit__close-form");
const modalTitle = modalEditContent.querySelector(".modal-edit__form-title");
const openEditForm = document.querySelector(".profile__eddit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const submitButton = document.querySelector(".modal-edit__form-submit");
const cards = document.querySelector(".cards");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const profileMobileSubTitle = document.querySelector(".profile__subtitle_mobile");
const showedImage = document.querySelector(".showedImage");
const closeShowedImage = showedImage.querySelector(".showedImage__close-image");
const imageShowed = showedImage.querySelector(".showedImage__image");
const imageShowedTitle = document.querySelector(".showedImage__title");

const inputs = {
  name: modalEditContent.querySelector(".modal-edit__form-input-name"),
  aboutAndUrl: modalEditContent.querySelector(".modal-edit__form-input-about"),
};

const isModalOpening = (element) => {
  element.classList.remove("closing");
  element.classList.add("opening");
  element.style.display = "flex";
};

const capitalizeName = (str) => {
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const closeModal = (modal) => {
  modal.classList.add("closing");
  modal.classList.remove("opening");

  setTimeout(() => {
    modal.style.display = "none";
  }, 450);
};

const closeModalOnBlur = (e) => {
  if (e.target === modalEditContent || e.target === showedImage) {
    closeModal(e.target);
  }
};

const closeModalOnEsc = (e) => {
  if (e.key === "Escape") {
    closeModal(modalEditContent);
    closeModal(showedImage);
  }
};

const setPlaceholders = (title, subtitle) => {
  inputs.name.value = title ?? "";
  inputs.aboutAndUrl.value = subtitle ?? "";
};

const showModalEditContent = (e) => {
  const targetId = e.target.getAttribute("id");
  const form = document.querySelector(".modal-edit__form");
  const inputElement = form.querySelectorAll(".modal-edit__form-input");

  const {
    setInputType,
    removeInputAttribute,
    setMinMaxLength,
    changeTitlesByTargetId,
    setPlaceHoldersAtribute,
  } = inputField();

  modalTitle.textContent = "";

  resetErrorMessage(inputElement, form);

  isModalOpening(modalEditContent);

  setInputType(targetId, inputs.aboutAndUrl);
  removeInputAttribute(targetId, inputs.aboutAndUrl);
  setMinMaxLength(targetId, inputs.aboutAndUrl, inputs.name);
  changeTitlesByTargetId(targetId, modalTitle.textContent);

  targetId === "addButton"
    ? (setPlaceholders(),
      setPlaceHoldersAtribute(
        inputs.name,
        inputs.aboutAndUrl,
        "Nome do lugar",
        "URL da imagem"
      ))
    : (setPlaceholders(profileTitle.textContent, profileSubTitle.textContent),
      setPlaceHoldersAtribute(
        inputs.name,
        inputs.aboutAndUrl,
        "Insira seu nome"
      ));

  enableValidation();
};

const setNewName = () => {
  profileTitle.textContent = capitalizeName(inputs.name.value);
  profileSubTitle.textContent = capitalizeName(inputs.aboutAndUrl.value);
  profileMobileSubTitle.textContent = capitalizeName(inputs.aboutAndUrl.value);
};

const setNewCard = (name, link) => {
  const id = initialCards.length + 1;
  const newCard = {
    id,
    name,
    link,
  };

  initialCards.unshift(newCard);

  cards.innerHTML = renderCards();
  toggleLikeOnCards();
  deleteCard();
  showShowedImage();
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  const placeholder = inputs.name.getAttribute("placeholder");

  if (inputs.name.validity.valid && inputs.aboutAndUrl.validity.valid) {
    placeholder === "Insira seu nome"
      ? setNewName()
      : setNewCard(inputs.name.value, inputs.aboutAndUrl.value);

    closeModal(modalEditContent);
    return;
  }

  return setError(modalEditContent);
};

const handleChoiseImage = (image) => {
  const id = image.getAttribute("data-index");

  imageShowed.setAttribute("src", initialCards[id].link);
  imageShowed.setAttribute("alt", `Imagem de ${initialCards[id].name}`);
  imageShowedTitle.textContent = initialCards[id].name;

  isModalOpening(showedImage);
};

const handleDelete = (e) => {
  const id = e.currentTarget.parentNode.getAttribute("id");
  const index = initialCards.findIndex((item) => item.id == id);

  if (index !== -1) {
    initialCards.splice(index, 1);
    e.currentTarget.parentNode.remove();

    cards.innerHTML = renderCards();
    toggleLikeOnCards();
    deleteCard();
    showShowedImage();
  }
};

const showShowedImage = () => {
  const imageCard = document.querySelectorAll(".card__image");

  imageCard.forEach((image) => {
    image.addEventListener("click", () => handleChoiseImage(image));
  });
};

const deleteCard = () => {
  const trashIcon = document.querySelectorAll(".card__trash-button");

  trashIcon.forEach((trashIcon) => {
    trashIcon.addEventListener("click", handleDelete);
  });
};

const handleLike = (heart) => heart.classList.toggle("cardlike-button__liked");

const toggleLikeOnCards = () => {
  const hearts = document.querySelectorAll(".cardlike-button");

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => handleLike(heart));
  });
};

const setMobileSubtitle = () => {
  return (profileMobileSubTitle.textContent = profileSubTitle.textContent);
};

const updateDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const dateFooter = document.querySelector(".year");

  dateFooter.textContent = year;
};

closeForm.addEventListener("click", () => closeModal(modalEditContent));
openEditForm.addEventListener("click", showModalEditContent);
closeShowedImage.addEventListener("click", () => closeModal(showedImage));
addNewCardButton.addEventListener("click", showModalEditContent);
submitButton.addEventListener("click", handleProfileFormSubmit);
cards.innerHTML = renderCards();
window.addEventListener("mousedown", closeModalOnBlur);
window.addEventListener("keydown", closeModalOnEsc);
updateDate();
toggleLikeOnCards();
deleteCard();
showShowedImage();
setMobileSubtitle();
