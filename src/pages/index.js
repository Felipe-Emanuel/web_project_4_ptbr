import "./index.css";
import { config } from "../utils/config";
import { Card } from "../components/layout/Cards";
import { addNewCard, updateDate } from "../utils/functions";
import { PopupWithImage } from "../components/popups/PopupWithImage";
import { Section } from "../components/layout/Section";
import { PopupWithForm } from "../components/popups/PopupWithForm";
import { UserInfo } from "../components/layout/UserInfo";
import { FormValidator } from "../components/validation/Validate";
import {
  initialCards,
  popupsArr,
  userInfo,
  formsArr,
  cardsUl,
  cardsTemplate,
  showedImage,
} from "../utils/constants";

const handleCardClick = (link, name) => {
  const showedImageElement = new PopupWithImage(showedImage);
  showedImageElement.setEventListeners();
  return showedImageElement.openImage(link, name);
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(config, item, cardsTemplate, handleCardClick);
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  cardsUl
);

const user = (popup) => {
  const { userName, userJob } = userInfo;
  const inputValues = popup.inputValues();
  const newUser = new UserInfo(userName, userJob);

  newUser.setUserInfo(inputValues);
  newUser.getUserInfo();
};

formsArr.forEach((forms) => {
  const validator = new FormValidator(config, forms);
  return validator.enableValidation();
});

popupsArr.forEach((item) => {
  const { popupSelector, openButton } = item;
  const popup = new PopupWithForm(popupSelector, openButton, () => {
    const edit = popupSelector === ".popup-edit";
    const { cityName, imageUrl } = popup.inputValues();

    edit ? user(popup) : addNewCard(cityName, imageUrl, cardsSection);
  });
  popup.setEventListeners();
});

cardsSection.renderSection();
updateDate();
