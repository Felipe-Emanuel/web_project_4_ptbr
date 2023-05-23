import { capitalizeString } from "../../utils/functions";

export class UserInfo {
  constructor(nameInput, jobInput) {
    this._name = document.querySelector(nameInput);
    this._about = document.querySelectorAll(jobInput);
  }

  setUserInfo({ name, about }) {
    this._name.textContent = capitalizeString(name);
    this._about.forEach(
      (userJob) => (userJob.textContent = capitalizeString(about))
    );
  }
}
