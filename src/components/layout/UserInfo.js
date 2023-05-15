import { capitalizeString } from "../../utils/functions";

export class UserInfo {
  constructor(nameInput, jobInput) {
    this._userName = document.querySelector(nameInput);
    this._userJob = document.querySelectorAll(jobInput);
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      job: this._userJob.forEach((job) => job.textContent),
    };
  }

  setUserInfo({ name, job }) {
    console.log();
    this._userName.textContent = capitalizeString(name);
    this._userJob.forEach(
      (userJob) => (userJob.textContent = capitalizeString(job))
    );
  }
}
