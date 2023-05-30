export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._body = options.body;
    this._method = options.method;
    this._validation = options.validation;
    this._opitions = options;
  }

  async getUsers() {
    const res = await fetch(`${this._baseUrl}/users`, {
      headers: this._headers,
    });
    return await this._validation(res);
  }

  async getProfile() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
    return await this._validation(res);
  }

  async updateProfile(inputValues) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(inputValues),
    });
    return await this._validation(res);
  }

  async updateAvatar(avatar) {
    const res = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
    return await this._validation(res);
  }

  async getCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    });
    return await this._validation(res);
  }

  async setNewCard(newCard) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(newCard),
    });
    return await this._validation(res);
  }

  async deleteCards(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
    return await this._validation(res);
  }

  async setLike(cardId, method = "PUT" | "DELETE") {
    const res = await fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: this._headers,
    });
    return await this._validation(res);
  }
}
