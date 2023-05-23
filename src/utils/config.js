export const config = {
  user: {
    section: ".profile",
    name: ".profile__title",
    about: ".profile__subtitle",
  },
  card: {
    card: ".card",
    sectionCard: ".cards",
    cardsUl: ".cards__ul",
    cardsTemplate: ".cards-template",
    cardImage: ".card__image",
    cardTitle: ".card__title",
  },
  buttons: {
    trash: {
      cardTrashButton: ".card__trash-button",
    },
    like: {
      buttonLiked: "cardlike-button__liked",
      likeButton: ".cardlike-button",
    },
    modal: {
      close: {
        closeImageButton: ".showedImage__close-form",
      },
    },
    validate: {
      inactive: "popup__submit_inactive",
    },
  },
  popups: {
    edit: {
      popupSelector: ".popup-edit",
      openButton: ".edit-profile",
    },
    addImage: {
      popupSelector: ".popup-addImage",
      openButton: ".add-image",
    },
    removeCard: {
      popupSelector: ".popup-removeCard",
      openButton: ".card__trash-button",
    },
    changeImageProfile: {
      popupSelector: ".popup-imageProfile",
      openButton: ".profile__eddit-image",
    },
    showedImages: {
      showedImage: ".showedImage",
      openedImage: ".showedImage__image",
      showedImageTitle: ".showedImage__title",
    },
  },
  forms: {
    editForm: ".popup-edit",
    addImageForm: ".popup-addImage",
    changeImageProfileForm: ".popup-imageProfile",
  },
  inputs: {
    input: ".popup__input",
    submit: ".popup__submit",
  },
  messages: {
    error: {
      errorClass: "form__input-error_active",
      inputErrorClass: "form__input_type_error",
    },
  },
};
