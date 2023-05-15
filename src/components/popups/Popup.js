export class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
    this._closeButton = this._popup.querySelector(".popup__close-form");
  }

  open() {
    this._popup.classList.remove("closing");
    this._popup.classList.add("opening");
    this._popup.style.display = "flex";
    document.addEventListener("keydown", this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.add("closing");
    this._popup.classList.remove("opening");

    setTimeout(() => {
      this._popup.style.display = "none";
    }, 450);

    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", this.close.bind(this));
    this._popup.addEventListener("click", (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}
