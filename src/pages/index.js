import "./index.css";
import { PopupWithImage } from "../components/popups/PopupWithImage";
import { PopupWithForm } from "../components/popups/PopupWithForm";
import { PopupRemoveCard } from "../components/popups/popupRemoveCard";
import { Card } from "../components/layout/Cards";
import { Section } from "../components/layout/Section";
import { UserInfo } from "../components/layout/UserInfo";
import { FormValidator } from "../components/validation/Validate";
import { config } from "../utils/config";
import {
  addNewCard,
  removeSkeletons,
  requestInfo,
  setSkeletons,
  submitCallback,
  updateDate,
} from "../utils/functions";
import {
  initialCards,
  popupsArr,
  userInfo,
  formsArr,
  cardsUl,
  cardsTemplate,
  showedImage,
  removeCard,
  submit as submitButton,
  profileImage,
  loading,
  addButton,
  userAboutMobile,
} from "../utils/constants";
import { apiOptions } from "../utils/apiOptions";
import { Api } from "../components/data/Api";

const handleCardClick = (link, name) => {
  const showedImageElement = new PopupWithImage(showedImage);
  showedImageElement.setEventListeners();
  return showedImageElement.openImage(link, name);
};

const handleCardDelet = () => {
  const popupRemoveCard = new PopupRemoveCard(
    removeCard.popupSelector,
    submitButton,
    submitCallback
  );

  popupRemoveCard.setEventListeners();
};

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        config,
        item,
        cardsTemplate,
        handleCardClick,
        handleCardDelet
      );
      const cardElement = card.generateCard();
      return cardElement;
    },
  },
  cardsUl
);

const userInstance = (request) => {
  const { userName, userAbout } = userInfo;
  const newUserInstance = new UserInfo(userName, userAbout);

  return newUserInstance.setUserInfo(requestInfo(request));
};

const getUset = async () => {
  const getUserInfo = new Api(apiOptions.createGet("", "users/me"));
  const getResult = await getUserInfo.get();

  profileImage.src = getResult.avatar;

  removeSkeletons()
  userInstance(getResult);
};

const updateUser = async (popup) => {
  setSkeletons()
  const inputValues = popup.inputValues();
  const setUserInfo = new Api(
    apiOptions.createWithBody("PATCH", "users/me", inputValues)
  );
  const patchUserInfo = await setUserInfo.set();

  removeSkeletons()
  userInstance(patchUserInfo);
};

//https://avatars.githubusercontent.com/Felipe-Emanuel
const updateImageProfile = async (popup) => {
  loading.style.display = "flex";

  const { imageUrl } = popup.inputValues();

  const avatar = { avatar: imageUrl };
  const setImageProfile = new Api(
    apiOptions.createWithBody("PATCH", "users/me/avatar", avatar)
  );

  await setImageProfile.set();
  return await getUset();
};

formsArr.forEach((forms) => {
  const validator = new FormValidator(config, forms);
  return validator.enableValidation();
});

popupsArr.forEach((item) => {
  const { popupSelector, openButton } = item;

  const popup = new PopupWithForm(popupSelector, openButton, () => {
    const { cityName, imageUrl } = popup.inputValues();

    const slicedPopupSelector = popupSelector.slice(7);

    const selectors = {
      edit: () => updateUser(popup),
      imageProfile: () => updateImageProfile(popup),
      addImage: () => addNewCard(cityName, imageUrl, cardsSection),
    };

    return selectors[slicedPopupSelector]();
  });
  popup.setEventListeners();
});

//.popup-imageProfile

// const teste = async () => {
//   const cards = new Api(apiOptions.createGet("", "cards"))
//   const results = await cards.get()

//   console.log(results)
// }

// teste();

cardsSection.renderSection();
getUset();
updateDate();
