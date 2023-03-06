const modalEditContent = document.querySelector(".modal-edit");
const closeForm = modalEditContent.querySelector(".modal-edit__close-form");
const openForm = document.querySelector(".profile__eddit-button");
const placeholderName = modalEditContent.querySelector(".modal-edit__form-input-name");
const placeholderAbout = modalEditContent.querySelector(".modal-edit__form-input-about");
const submitButton = document.querySelector(".modal-edit__form-submit");

const hideForm = () => {
  modalEditContent.classList.remove("modal-edit__hidden");
};

const showForm = () => {
  const profileTitle = document.querySelector(".profile__title");
  const profileSubTitle = document.querySelector(".profile__subtitle");

  placeholderName.value = profileTitle.textContent;
  placeholderAbout.value = profileSubTitle.textContent;

  modalEditContent.classList.add("modal-edit__hidden");
};

const handleProfileFormSubmit = (e) => {
  e.preventDefault();

  const profileTitle = document.querySelector(".profile__title");
  const profileSubTitle = document.querySelector(".profile__subtitle");

  profileTitle.textContent = placeholderName.value;
  profileSubTitle.textContent = placeholderAbout.value;

  hideForm()
};

closeForm.addEventListener("click", hideForm);
openForm.addEventListener("click", showForm);
submitButton.addEventListener("click", handleProfileFormSubmit);
