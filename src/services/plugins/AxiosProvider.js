import axios from "axios";

export const baseURL = `https://eyebrowapi.softbenz.com.np/api`;

const instance = axios.create({
  baseURL: `${baseURL}/`,
});
export default instance;
