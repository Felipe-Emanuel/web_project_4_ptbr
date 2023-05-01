import { inputField } from "./inputField.js";
import { initialCards, Card } from "./cards.js";
import { FormValidator } from "./validate.js";

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

const inputs = {
  name: modalEditContent.querySelector(".modal-edit__form-input-name"),
  aboutAndUrl: modalEditContent.querySelector(".modal-edit__form-input-about"),
};

const config = {
  card: ".card",
  cardsTemplate: ".cards-template",
  cardTrashButton: ".card__trash-button",
  buttonLiked: "cardlike-button__liked",
  likeButton: ".cardlike-button",
  showedImage: ".showedImage",
  oppenedImage: ".showedImage__image",
  cardImage: ".card__image",
  cardTitle: ".card__title",
  closeImageButton: ".showedImage__close-image",
  showedImageTitle: ".showedImage__title",
  formSelector: ".modal-edit__form",
  inputSelector: ".modal-edit__form-input",
  submitButtonSelector: ".modal-edit__form-submit",
  inactiveButtonClass: "modal-edit__form-submit_inactive",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
};

const formElement = document.querySelector(config.formSelector);
const formValidator = new FormValidator(config, formElement);

const isModalOpening = (element) => {
  formValidator.enableValidation()

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
  formValidator.hideInputError(inputs.aboutAndUrl)
  formValidator.hideInputError(inputs.name)

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
  }
};

function renderCards() {
  cards.innerHTML = "";
  initialCards.forEach((item) => {
    const card = new Card(config, item, config.cardsTemplate);
    const cardElement = card.generateCard();
    cards.append(cardElement);
  });
}

const setPlaceholders = (title, subtitle) => {
  inputs.name.value = title ?? "";
  inputs.aboutAndUrl.value = subtitle ?? "";
};

const showModalEditContent = (e) => {
  const targetId = e.target.getAttribute("id");

  const {
    setInputType,
    removeInputAttribute,
    setMinMaxLength,
    changeTitlesByTargetId,
    setPlaceHoldersAtribute,
  } = inputField();

  modalTitle.textContent = "";

  isModalOpening(modalEditContent);

  setInputType(targetId, inputs.aboutAndUrl);
  removeInputAttribute(targetId, inputs.aboutAndUrl);
  setMinMaxLength(targetId, inputs.aboutAndUrl, inputs.name);
  changeTitlesByTargetId(targetId, modalTitle);

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
  renderCards();
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
addNewCardButton.addEventListener("click", showModalEditContent);
submitButton.addEventListener("click", handleProfileFormSubmit);
window.addEventListener("mousedown", closeModalOnBlur);
window.addEventListener("keydown", closeModalOnEsc);
updateDate();
setMobileSubtitle();
renderCards();
