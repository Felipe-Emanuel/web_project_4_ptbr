import "./index.css";
import { Api } from "../components/data/Api";
import { FormValidator } from "../components/validation/Validate";
import * as Popup from "../components/popups/index";
import * as Layout from "../components/layout/index";
import * as Utils from "../utils/index";

const users = async () => {
  const getUsers = new Api(Utils.apiOptions.createGet("users"));
  const getResp = await getUsers.get();
  const ids = await getResp.map((user) => user._id);

  return ids;
};

const handleCardClick = (link, name) => {
  const showedImageElement = new Popup.PopupWithImage(Utils.showedImage);
  showedImageElement.setEventListeners();
  return showedImageElement.openImage(link, name);
};

const handleDelet = async (cardId, popup) => {
  try {
    const deleteCard = new Api(Utils.apiOptions.createDelete("cards", cardId));
    popup.close();
    console.log("card deletado: ", cardId);

    await deleteCard.delete();

    await cardsSection();
  } catch (error) {
    console.error("Falha ao deletar o card: ", error);
  }
};

const handleCardDelet = (cardId) => {
  console.log(cardId);

  const popupRemoveCard = new Popup.PopupRemoveCard(
    Utils.removeCard.popupSelector,
    Utils.submitButton,
    async () => await handleDelet(cardId, popupRemoveCard)
  );

  popupRemoveCard.setEventListeners();
};

const handleLike = async (cardId) => {
  try {
    const res = new Api(Utils.apiOptions.createPut("cards/likes", cardId));

    return await res.put();

  } catch (error) {
    console.error("Falha ao requisitar curtida do card: ", error);
  } finally {
    await cardsSection()
  }
};

const handleUnLike = async (cardId) => {
  try {
    const res = new Api(Utils.apiOptions.createDelete("cards/likes", cardId));

    return await res.delete();

  } catch (error) {
    console.error("Falha ao requisitar curtida do card: ", error);
  } finally {
    await cardsSection()
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
            () => handleCardDelet(item._id),
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
    const cards = new Api(Utils.apiOptions.createGet("cards"));
    const results = await cards.get();
    return results;
  } catch (error) {
    console.error("Falha ao resgatar os cards: ", error);
  } finally {
    console.log("fazer o load dos cards");
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

    const setCards = new Api(
      Utils.apiOptions.createWithBody("POST", "cards", newCard)
    );
    return await setCards.set();
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
    const getUserInfo = new Api(Utils.apiOptions.createGet("users/me"));
    const getResult = await getUserInfo.get();
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
    const setUserInfo = new Api(
      Utils.apiOptions.createWithBody("PATCH", "users/me", inputValues)
    );
    const patchUserInfo = await setUserInfo.set();

    userInstance(patchUserInfo);
  } catch (error) {
    console.error("Falha ao atualizar usuários: ", error);
  } finally {
    Utils.removeSkeletons();
  }
};

//https://avatars.githubusercontent.com/Felipe-Emanuel

const updateImageProfile = async (popup) => {
  try {
    const { imageUrl } = popup.inputValues();
    const avatar = { avatar: imageUrl };
    const setImageProfile = new Api(
      Utils.apiOptions.createWithBody("PATCH", "users/me/avatar", avatar)
    );
    await setImageProfile.set();
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
