import { Popup } from "./Popup";

export class PopupRemoveCard extends Popup {
  constructor(selector, submitButton, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._popup.querySelector(submitButton);
    this._submitCallback = submitCallback;
  }

  setEventListeners() {
    super.setEventListeners();

    this.open();

    const clickHandler = async (e) => {
      e.preventDefault();

      await this._submitCallback();
      this._submitButton.removeEventListener("click", clickHandler);
    };

    this._submitButton.addEventListener("click", clickHandler);
  }
}
