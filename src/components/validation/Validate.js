import { customValidation } from "../../utils/customValidation";

export class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = document.querySelector(formElement);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputs.input)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.inputs.submit
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.add(this._config.messages.error.inputErrorClass);

    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.messages.error.errorClass);
  }

  hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );

    inputElement.classList.remove(this._config.messages.error.inputErrorClass);
    errorElement.classList.remove(this._config.messages.error.errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._config.buttons.validate.inactive);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._config.buttons.validate.inactive
      );
      this._buttonElement.disabled = false;
    }
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        customValidation(inputElement)
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }
}
