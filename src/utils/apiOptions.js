import { API_TOKEN, BASE_URL } from "../components/data/access";

export const apiOptions = {
  validation: async (res) => {
    if (res.ok) {
      const resp = await res.json();
      return resp;
    }

    return await Promise.reject(`Error: ${res.status}`);
  },
  createGet: (method, path) => ({
    method: method || "GET",
    baseUrl: `${BASE_URL}/${path}`,
    headers: {
      authorization: API_TOKEN,
      "Content-Type": "application/json",
    },
    validation: apiOptions.validation,
  }),
  createWithBody: (method, path, body) => ({
    ...apiOptions.createGet(method, path),
    body,
    validation: apiOptions.validation,
  }),
};
