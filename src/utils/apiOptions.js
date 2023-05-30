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

  options: () => ({
    baseUrl: `${BASE_URL}`,
    headers,
    validation: apiOptions.validation,
  }),
};
