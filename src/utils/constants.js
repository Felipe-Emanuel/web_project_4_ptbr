import { config } from "./config";

//Mocked cards
export const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
    id: 0,
    isLiked: false,
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
    id: 1,
    isLiked: false,
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
    id: 2,
    isLiked: false,
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
    id: 3,
    isLiked: false,
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
    id: 4,
    isLiked: false,
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
    id: 5,
    isLiked: false,
  },
];

export const { cardsUl, cardsTemplate } = config.card;
export const cardUl = document.querySelector(cardsUl);

export const { submit } = config.inputs

const { addImageForm, editForm, changeImageProfileForm } = config.forms;
export const formsArr = [addImageForm, editForm, changeImageProfileForm];

const { user } = config;
export const userInfo = {
  userName: user.name,
  userAbout: user.about,
};

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


