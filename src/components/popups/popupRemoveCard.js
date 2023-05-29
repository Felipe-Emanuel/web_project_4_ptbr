import { Popup } from "./Popup";

export class PopupRemoveCard extends Popup {
  constructor (selector, submitButton, submitCallback,) {
    super(selector);
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._popup.querySelector(submitButton)
    this._submitCallback = submitCallback
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitButton.addEventListener("click", (e) => {
      e.preventDefault();

      this._submitCallback()
    })

    this.open();
  }
}
