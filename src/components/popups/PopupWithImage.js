import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(`${selector}__image`);
    this._title = this._popup.querySelector(`${selector}__title`)
  }

  openImage(link, name) {
    this._image.src = link;
    this._image.alt = name;
    this._title.textContent = name;
    super.open();
  }
}
