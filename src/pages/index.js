import "./index.css";
import { Api } from "../components/data/Api";
import { FormValidator } from "../components/validation/Validate";
import * as Popup from "../components/popups/index";
import * as Layout from "../components/layout/index";
import * as Utils from "../utils/index";
import { cardSkeleton } from "../utils/constants";

const api = () => new Api(Utils.apiOptions.options());

const users = async () => {
  const get = api();
  const result = await get.getUsers();
  const ids = await result.map((user) => user._id);

  return ids;
};

const handleCardClick = (link, name) => {
  const showedImageElement = new Popup.PopupWithImage(Utils.showedImage);
  showedImageElement.setEventListeners();
  return showedImageElement.openImage(link, name);
};

const handleDelete = async (cardId, popup) => {
  try {
    const deleteCard = api();
    popup.close();

    await deleteCard.deleteCards(cardId);

    await cardsSection();
  } catch (error) {
    console.error("Falha ao deletar o card: ", error);
  }
};

const handleCardDelete = (cardId) => {
  const popupRemoveCard = new Popup.PopupRemoveCard(
    Utils.removeCard.popupSelector,
    Utils.submitButton,
    async () => await handleDelete(cardId, popupRemoveCard)
  );

  return popupRemoveCard.setEventListeners();
};

const handleLike = async (cardId) => {
  try {
    const res = new api();
    return await res.setLike(cardId, "PUT");
  } catch (error) {
    console.error("Falha ao adicionar curtida do card: ", error);
  } finally {
    await cardsSection();
  }
};

const handleUnLike = async (cardId) => {
  try {
    const res = api();

    return await res.setLike(cardId, "DELETE");
  } catch (error) {
    console.error("Falha ao deletar curtida do card: ", error);
  } finally {
    await cardsSection();
  }
};

const cardsSection = async () => {
  Utils.clearCardUl();
  try {
    const section = new Layout.Section(
      {
        items: await getCards(),
        renderer: (item) => {
          const card = new Layout.Card(
            Utils.config,
            item,
            Utils.cardsTemplate,
            handleCardClick,
            () => handleCardDelete(item._id),
            async () => await users(),
            async () => await handleLike(item._id),
            async () => await handleUnLike(item._id)
          );
          const cardElement = card.generateCard();
          return cardElement;
        },
      },
      Utils.cardsUl
    );
    return section.renderSection();
  } catch (error) {
    console.error("Falha ao criar sessão com os cards: ", error);
  }
};

const getCards = async () => {
  try {
    cardSkeleton.style.display = "flex";

    const cards = api();
    const results = await cards.getCards();
    return results;
  } catch (error) {
    console.error("Falha ao resgatar os cards: ", error);
  } finally {
    cardSkeleton.style.display = "none";
    validate();
  }
};

const postCards = async ({ name, link }) => {
  try {
    const newCard = {
      name,
      link,
    };

    Utils.clearCardUl();

    const setCards = api();

    return await setCards.setNewCard(newCard);
  } catch (error) {
    console.error("Falha ao criar novo card: ", error);
  } finally {
    await cardsSection();
  }
};

const userInstance = (request) => {
  const { userName, userAbout } = Utils.userInfo;
  const newUserInstance = new Layout.UserInfo(userName, userAbout);

  return newUserInstance.setUserInfo(Utils.requestInfo(request));
};

const getUser = async () => {
  try {
    const getUserInfo = api();
    const getResult = await getUserInfo.getProfile();
    Utils.profileImage.src = getResult.avatar;

    userInstance(getResult);
  } catch (error) {
    console.error("Falha ao recuperar usuários: ", error);
  } finally {
    Utils.removeSkeletons();
  }
};

const updateUser = async (popup) => {
  try {
    Utils.setSkeletons();
    const inputValues = popup.inputValues();
    const setUserInfo = api();
    const patchUserInfo = await setUserInfo.updateProfile(inputValues);

    userInstance(patchUserInfo);
  } catch (error) {
    console.error("Falha ao atualizar usuários: ", error);
  } finally {
    Utils.removeSkeletons();
  }
};

const updateImageProfile = async (popup) => {
  try {
    const { imageProfile } = popup.inputValues();
    const avatar = { avatar: imageProfile };

    const setImageProfile = api();
    await setImageProfile.updateAvatar(avatar);
  } catch (error) {
    console.error("Falha ao atualizar imagem de perfil do usuário: ", error);
  } finally {
    Utils.loading.style.display = "flex";
    return await getUser();
  }
};

const validate = () => {
  return Utils.formsArr.forEach((forms) => {
    const validator = new FormValidator(Utils.config, forms);
    return validator.enableValidation();
  });
};

Utils.popupsArr.forEach((item) => {
  const { popupSelector, openButton } = item;

  const popup = new Popup.PopupWithForm(popupSelector, openButton, () => {
    const { cityName, imageUrl } = popup.inputValues();
    const newCard = {
      name: cityName,
      link: imageUrl,
    };

    const slicedPopupSelector = popupSelector.slice(7);

    const selectors = {
      edit: () => updateUser(popup),
      imageProfile: () => updateImageProfile(popup),
      addImage: () => postCards(newCard),
    };

    return selectors[slicedPopupSelector]();
  });
  popup.setEventListeners();
});

validate();
cardsSection();
getCards();
getUser();
Utils.updateDate();
