import { initialCards } from "../../utils/constants";

export class Card {
  constructor(config, data, templateElement, handleCardClick) {
    this._config = config;
    this._isLiked = data.isLiked;
    this._title = data.name;
    this._imageLink = data.link;
    this._id = data.id;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateElement);
    const cardElement = cardTemplate.content
      .querySelector(this._config.card.card)
      .cloneNode(true);

    return cardElement;
  }

  _handleDelete = (e) => {
    e.currentTarget.parentNode.remove();

    initialCards.splice(this, 1);
  };

  _handleLike = (heart) => {
    this._isLiked = !this._isLiked;
    heart.classList.toggle(this._config.buttons.like.buttonLiked);
  };

  _openImageModal() {
    this._handleCardClick(this._imageLink, this._title);
  }

  _setEventListeners() {
    this._element
      .querySelector(this._config.card.cardImage)
      .addEventListener("click", () => this._openImageModal());

    this._element
      .querySelector(this._config.buttons.trash.cardTrashButton)
      .addEventListener("click", (e) => this._handleDelete(e));

    this._element
      .querySelector(this._config.buttons.like.likeButton)
      .addEventListener("click", () => {
        const cardLikeButton = this._element.querySelector(
          this._config.buttons.like.likeButton
        );

        this._handleLike(cardLikeButton);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element
      .querySelector(this._config.card.cardImage)
      .setAttribute("src", this._imageLink);

    this._element.querySelector(this._config.card.cardTitle).textContent =
      this._title;

    return this._element;
  }
}
