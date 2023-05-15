import { cardUl, initialCards } from "./constants";

export const updateDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const dateFooter = document.querySelector(".year");

  dateFooter.textContent = year;
};

export const capitalizeString = (str) => {
  return str
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const addNewCard = (name, link, cardsSection) => {
  cardUl.innerHTML = "";

  const id = initialCards.length + 1;
  const newCard = {
    name,
    link,
    id,
    isLiked: false,
  };

  initialCards.unshift(newCard);
  cardsSection.renderSection();
};
