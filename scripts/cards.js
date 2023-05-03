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

export class Card {
  constructor(config, data, templateElement) {
    this._config = config;
    this._title = data.name;
    this._imageLink = data.link;
    this._id = data.id;
    this._templateElement = templateElement;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateElement);
    const cardElement = cardTemplate.content
      .querySelector(this._config.card)
      .cloneNode(true);
    return cardElement;
  }

  static _isModalOpening(element) {
    element.classList.remove("closing");
    element.classList.add("opening");
    element.style.display = "flex";
  }

  static _closeModal = (modal) => {
    modal.classList.add("closing");
    modal.classList.remove("opening");

    setTimeout(() => {
      modal.style.display = "none";
    }, 450);
  };

  _handleDelete = (e) => {
    e.currentTarget.parentNode.remove();

    initialCards.splice(this, 1);
  };

  _handleLike = (heart) => heart.classList.toggle(this._config.buttonLiked);

  _openImageModal = () => {
    const imageTitle = this._element.querySelector(
      this._config.showedImageTitle
    );
    const showedImage = this._element.querySelector(this._config.showedImage);
    const showedImageContent = this._element.querySelector(
      this._config.oppenedImage
    );
    showedImageContent.setAttribute("src", this._imageLink);
    showedImage.setAttribute("alt", this._title);
    imageTitle.textContent = this._title;

    Card._isModalOpening(showedImage);

    const closeModalOnBlur = (e) => {
      if (e.target === showedImage) {
        Card._closeModal(e.target);
      }
    };

    const closeModalOnEsc = (e) => {
      if (e.key === "Escape") {
        Card._closeModal(showedImage);
      }
    };

    window.addEventListener("keydown", closeModalOnEsc);

    window.addEventListener("mousedown", closeModalOnBlur);
  };

  _setEventListeners() {
    this._element
      .querySelector(this._config.cardImage)
      .addEventListener("click", () => this._openImageModal());

    this._element
      .querySelector(this._config.closeImageButton)
      .addEventListener("click", () => {
        const showedImage = this._element.querySelector(
          this._config.showedImage
        );
        Card._closeModal(showedImage);
      });

    this._element
      .querySelector(this._config.cardTrashButton)
      .addEventListener("click", (e) => this._handleDelete(e));

    this._element
      .querySelector(this._config.likeButton)
      .addEventListener("click", () => {
        const cardLikeButton = this._element.querySelector(
          this._config.likeButton
        );

        this._handleLike(cardLikeButton);
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      this._config.cardImage
    ).setAttribute("src", this._imageLink);
    this._element.querySelector(this._config.cardImage).style.backgroundSize =
      "cover";
    this._element.querySelector(this._config.cardTitle).textContent =
      this._title;

    return this._element;
  }
}
