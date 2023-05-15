import { Popup } from "./Popup";

export class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector(`${selector}__image`);
  }

  openImage(link, name) {
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
