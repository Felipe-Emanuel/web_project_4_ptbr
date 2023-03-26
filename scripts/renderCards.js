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

export const renderCards = () => {
  return initialCards
    .map((card, index) => {
      return (
        `<div class="card" id=${card.id}>
        <img
          src=${card.link}
          alt=${card.name}
          class="card__image"
          data-index=${index}
        />
        <img
          src='./images/trashIcon.svg'
          alt="deletar card"
          class="card__trash-button"
        />
        <div class="card__info">
          <h2 class="card__title">${card.name}</h2>
          <img
            src="./images/Heart.svg"
            alt="Coração simbolizando o curtir do card"
            class="card__like-button"
          />
        </div>
      </div>`
      );
    })
    .join("");
};
