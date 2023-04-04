const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("modal-edit__form-submit_inactive");
  } else {
    buttonElement.classList.remove("modal-edit__form-submit_inactive");
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".modal-edit__form-input")
  );
  const buttonElement = formElement.querySelector(".modal-edit__form-submit");

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const setError = (modalEditContent) => {
  const formElement = modalEditContent.querySelector(`.modal-edit__form`);
  const inputList = Array.from(
    formElement.querySelectorAll(`.modal-edit__form-input`)
  );

  inputList.forEach((inputElement) => {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  });
};

export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".modal-edit"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    const fieldsetList = Array.from(
      formElement.querySelectorAll(".modal-edit__form")
    );

    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

export const resetErrorMessage = (inputElement, formElement) => {
  inputElement.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};
