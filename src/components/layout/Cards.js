export class Card {
  constructor(
    config,
    data,
    templateElement,
    handleCardClick,
    handleCardDelete,
    users,
    handleLike,
    handleUnlike
  ) {
    this._config = config;
    this._handleLike = handleLike;
    this._title = data.name;
    this._imageLink = data.link;
    this._owner = data.owner._id;
    this._likes = data.likes;
    this._templateElement = templateElement;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleUnlike = handleUnlike;
    this._users = users;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateElement);
    const cardElement = cardTemplate.content
      .querySelector(this._config.card.card)
      .cloneNode(true);

    return cardElement;
  }

  async _setLikeCounter() {
    const likeslength = await this._likes.length;
    const likeElement = this._element.querySelector(this._config.card.likeLength);

    if (likeElement) {
      likeElement.textContent = likeslength
    }
  }

  async _isLiked(heart) {
    this._setLikeCounter();

    const ids = await this._users();
    const idsLiked = this._likes.map((a) => a._id);

    heart.classList.toggle(this._config.buttons.like.buttonLiked);

    if (idsLiked.includes(ids[0])) {
      this._handleUnlike();
    } else {
      this._handleLike();
    }
  }

  async _setLikeState(heart) {
    this._setLikeCounter();

    const ids = await this._users();
    const idsLiked = await this._likes.map((a) => a._id);

    if (idsLiked.includes(ids[0])) {
      heart.classList.add(this._config.buttons.like.buttonLiked);
      return
    }
  }

  _openImageModal() {
    this._handleCardClick(this._imageLink, this._title);
  }

  async _validUsers() {
    const ids = await this._users();
    return String(ids.filter((user) => user === this._owner));
  }

  async _setEventListeners() {
    const cardLikeButton = this._element.querySelector(
      this._config.buttons.like.likeButton
    );

    this._setLikeState(cardLikeButton);

    this._element
      .querySelector(this._config.buttons.like.likeButton)
      .addEventListener("click", async () => {await this._isLiked(cardLikeButton)});

    this._element
      .querySelector(this._config.card.cardImage)
      .addEventListener("click", () => this._openImageModal());

    this._element
      .querySelector(this._config.buttons.trash.cardTrashButton)
      .addEventListener("click", async () => this._handleCardDelete());

    if ((await this._validUsers()) === "") {
      this._element.querySelector(
        this._config.buttons.trash.cardTrashButton
      ).style.display = "none";
    }
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
