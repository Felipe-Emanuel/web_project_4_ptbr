import { Popup } from "./Popup";
import { capitalizeString } from "../../utils/functions";

export class PopupWithForm extends Popup {
  constructor(selector, buttonConfig, submitCallback) {
    super(selector);
    this._form = this._popup.querySelector(".form");
    this._submitCallback = submitCallback;
    this._buttonConfig = document.querySelector(buttonConfig);
  }

  _getInputValues() {
    const inputElements = this._form.querySelectorAll(".input");
    const values = {};

    inputElements.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  inputValues() {
    return this._getInputValues();
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInitialInputValues() {
    const inputElements = this._form.querySelectorAll(".input");

    inputElements.forEach((input) => {
      const checkInput = input.name === "name" || input.name === "about";
      const inputValues = capitalizeString(this._getInputValues()[input.name]);

      if (checkInput) {
        input.setAttribute("value", inputValues);
      }
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._buttonConfig.addEventListener("click", () => {
      super.open();
    });

    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitCallback(this._getInputValues());
      this.setInitialInputValues();

      this.close();
    });
  }
}
