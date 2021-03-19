import axios from "axios";

export const request = async (method, url, data) => {
  try {
    const response = axios({
      method,
      url,
      data,
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
