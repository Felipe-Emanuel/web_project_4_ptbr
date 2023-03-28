import { renderCards, initialCards } from "./renderCards.js";

const modalEditContent = document.querySelector(".modal-edit");
const closeForm = modalEditContent.querySelector(".modal-edit__close-form");
const placeholderName = modalEditContent.querySelector(
  ".modal-edit__form-input-name"
);
const placeholderAboutAndUrl = modalEditContent.querySelector(
  ".modal-edit__form-input-about"
);
const modalTitle = modalEditContent.querySelector(".modal-edit__form-title");
const openEditForm = document.querySelector(".profile__eddit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const submitButton = document.querySelector(".modal-edit__form-submit");
const cards = document.querySelector(".cards");
const profileTitle = document.querySelector(".profile__title");
const profileSubTitle = document.querySelector(".profile__subtitle");
const profileMobileSubTitle = document.querySelector(
  ".profile__subtitle_mobile"
);
const error = document.querySelector(".modal-edit__error");
const showedImage = document.querySelector(".showedImage");
const closeShowedImage = showedImage.querySelector(".showedImage__close-image");
const imageShowed = showedImage.querySelector(".showedImage__image");
const imageShowedTitle = document.querySelector(".showedImage__title");

const isModalOpening = (element) => {
  element.classList.remove("closing");
  element.classList.add("opening");
  element.style.display = "flex";
};

function capitalizeName(str) {
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const closeModalEditContent = () => {
  showedImage.classList.add("closing");
  showedImage.classList.remove("opening");

  setTimeout(() => {
    showedImage.style.display = "none";
    imageShowed.setAttribute("src", "");
    imageShowedTitle.textContent = "";
  }, 450);
};

const closeImageModal = () => {
  modalEditContent.classList.add("closing");
  modalEditContent.classList.remove("opening");

  setTimeout(() => {
    modalEditContent.style.display = "none";
  }, 450);
};

const setPlaceHoldersContent = (newProfileTitle, newProfileSubTitle) => {
  const defaultNewProfileTitle = newProfileTitle ?? "";
  const defaultNewProfileSubTitle = newProfileSubTitle ?? "";

  placeholderName.value = defaultNewProfileTitle;
  placeholderAboutAndUrl.value = defaultNewProfileSubTitle;
};

const setPlaceHoldersAtribute = (
  newPlaceholderTitleField,
  newPlaceholderSubTitleField
) => {
  const defaultPlaceholderSubTitleField =
    newPlaceholderSubTitleField ?? "Explorar";

  placeholderName.setAttribute("placeholder", newPlaceholderTitleField);
  placeholderAboutAndUrl.setAttribute(
    "placeholder",
    defaultPlaceholderSubTitleField
  );
};

const setModalTitle = (newModalTitle) =>
  (modalTitle.textContent = newModalTitle);

const checkButtonClickedByTargetId = (buttonTargetId) => {
  buttonTargetId === "addButton"
    ? (setPlaceHoldersContent(),
      setPlaceHoldersAtribute("Nome do lugar", "URL da imagem"),
      setModalTitle("Novo Lugar"))
    : (setPlaceHoldersContent(
        profileTitle.textContent,
        profileSubTitle.textContent
      ),
      setPlaceHoldersAtribute("Insira seu nome"),
      setModalTitle("Editar Perfil"));
};

const showModalEditContent = (e) => {
  const targetId = e.target.getAttribute("id");

  error.textContent = "";
  modalTitle.textContent = "";

  isModalOpening(modalEditContent);

  checkButtonClickedByTargetId(targetId);
};

const setNewName = () => {
  profileTitle.textContent = capitalizeName(placeholderName.value);
  profileSubTitle.textContent = capitalizeName(placeholderAboutAndUrl.value);
  profileMobileSubTitle.textContent = capitalizeName(
    placeholderAboutAndUrl.value
  );
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

  const placeholder = placeholderName.getAttribute("placeholder");

  if (
    placeholderName &&
    placeholderAboutAndUrl.value &&
    placeholderName.value
  ) {
    placeholder === "Insira seu nome"
      ? setNewName()
      : setNewCard(placeholderName.value, placeholderAboutAndUrl.value);

    closeImageModal();
    error.textContent = "";
    return;
  }

  return (error.textContent = "Os campos não podem estar em branco!");
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

closeForm.addEventListener("click", closeImageModal);
openEditForm.addEventListener("click", showModalEditContent);
closeShowedImage.addEventListener("click", closeModalEditContent);
addNewCardButton.addEventListener("click", showModalEditContent);
submitButton.addEventListener("click", handleProfileFormSubmit);
cards.innerHTML = renderCards();
updateDate();
toggleLikeOnCards();
deleteCard();
showShowedImage();
setMobileSubtitle();
