export function inputField() {
  const setPlaceHoldersAtribute = (
    inputName,
    inputAbout,
    placeholderTitle,
    placeholderSubtitleField
  ) => {
    const defaultSubtitle = placeholderSubtitleField ?? "Sobre...";

    inputName.setAttribute("placeholder", placeholderTitle);
    inputAbout.setAttribute("placeholder", defaultSubtitle);
  };

  const setInputType = (targetId, inputAbout) => {
    targetId === "addButton"
      ? inputAbout.setAttribute("type", "url")
      : inputAbout.setAttribute("type", "text");
  };

  const removeInputAttribute = (targetId, inputAbout) => {
    targetId === "addButton" &&
      (inputAbout.removeAttribute("minLength"),
      inputAbout.removeAttribute("maxLength"));
  };

  const setMinMaxLength = (targetId, inputAbout, inputName) => {
    targetId === "addButton"
      ? (inputName.setAttribute("minLength", 2),
        inputName.setAttribute("maxLength", 30))
      : (inputName.setAttribute("minLength", 2),
        inputName.setAttribute("maxLength", 40),
        inputAbout.setAttribute("minLength", 2),
        inputAbout.setAttribute("maxLength", 200));
  };

  const setModalTitle = (modalTitle, newModalTitle) => {
    modalTitle.textContent = newModalTitle
  };

  const changeTitlesByTargetId = (targetId, modalTitle) => {
    targetId === "addButton"
      ? setModalTitle(modalTitle, "Novo Lugar")
      : setModalTitle(modalTitle, "Editar Perfil");
  };

  return {
    setInputType,
    removeInputAttribute,
    setMinMaxLength,
    setModalTitle,
    changeTitlesByTargetId,
    setPlaceHoldersAtribute,
  };
}
