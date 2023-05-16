export const customValidation = (input) => {
  const urlCheck = input.value.includes("https://") || input.value.includes("http://")
  const maxLength = input.getAttribute("maxLength") || Infinity;
  const minLength = input.getAttribute("minLength") || "";
  const inputLength = input.value.length;

  if (inputLength === 0) {
    input.setCustomValidity("Você deve preencher este campo!");

  } else if (input.type === "url" && !urlCheck) {
    input.setCustomValidity("insira uma URL válida!");

  }
  else if (inputLength < minLength) {
    input.setCustomValidity(
      `É necessário no mínimo ${minLength} caracteres, atualmente você adicionou ${inputLength}!`
    );

  } else if (inputLength > maxLength) {
    input.setCustomValidity(
      `É necessário no máximo ${maxLength} caracteres, atualmente você adicionou ${inputLength}!`
    );

  } else {
    input.setCustomValidity("");
    input.reportValidity();
  }
};
