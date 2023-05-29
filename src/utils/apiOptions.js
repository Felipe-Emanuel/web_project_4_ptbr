import { API_TOKEN, BASE_URL } from "../components/data/access";

const headers = {
  authorization: API_TOKEN,
  "Content-Type": "application/json",
};

export const apiOptions = {
  validation: async (res) => {
    if (res.ok) {
      const resp = await res.json();
      return resp;
    }
    return await Promise.reject(`Error: ${res.status}`);
  },

  createGet: (path) => ({
    baseUrl: `${BASE_URL}/${path}`,
    headers,
    validation: apiOptions.validation,
  }),

  createWithBody: (method, path, body) => ({
    method,
    ...apiOptions.createGet(path),
    body,
    validation: apiOptions.validation,
  }),

  createDelete: (path, cardId) => ({
    baseUrl: `${BASE_URL}/${path}/${cardId}`,
    headers,
    validation: apiOptions.validation,
  }),

  createPut: (path, cardId) => ({
    baseUrl: `${BASE_URL}/${path}/${cardId}`,
    headers,
    validation: apiOptions.validation,
  }),
};
