export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._body = options.body;
    this._method = options.method;
    this._validation = options.validation;
  }

  async get() {
    const res = await fetch(this._baseUrl, {
      headers: this._headers,
    });
    return await this._validation(res);
  }

  async set() {
    const res = await fetch(this._baseUrl, {
      method: this._method,
      headers: this._headers,
      body: JSON.stringify(this._body),
    });
    return await this._validation(res);
  }

  async put() {
    const res = await fetch(this._baseUrl, {
      method: "PUT",
      headers: this._headers,
    });
    return await this._validation(res);
  }

  async delete() {
    const res = await fetch(this._baseUrl, {
      method: "DELETE",
      headers: this._headers,
    });
    return await this._validation(res);
  }
}
