import { config } from "./config";

export const { cardsUl, cardsTemplate, sectionCard, card } = config.card;
export const cardUl = document.querySelector(cardsUl);
export const loading = document.querySelector(config.loading);
export const skeletonLoading = document.querySelector(config.skeletonLoading);
export const cardSkeleton = document.querySelector(config.cardsLoad);
export const addButton = document.querySelector(config.buttons.addButton);

export const { submit } = config.inputs

const { addImageForm, editForm, changeImageProfileForm } = config.forms;
export const formsArr = [addImageForm, editForm, changeImageProfileForm];

const { user } = config;
export const userInfo = {
  userName: user.name,
  userAbout: user.about,
  userAboutMobile: user.aboutModile,
  avatar: user.avatar,
};

export const userAboutMobile = document.querySelector(userInfo.userAboutMobile)
export const profileImage = document.querySelector(userInfo.avatar)

export const { showedImage } = config.popups.showedImages;
export const { popups } = config;
export const { addImage, edit, changeImageProfile, removeCard } = popups;
export const popupsArr = [
  {
    popupSelector: addImage.popupSelector,
    openButton: addImage.openButton,
  },
  {
    popupSelector: edit.popupSelector,
    openButton: edit.openButton,
  },
  {
    popupSelector: changeImageProfile.popupSelector,
    openButton: changeImageProfile.openButton,
  },
];


