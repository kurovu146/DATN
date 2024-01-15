import { AxiosRequestConfig } from "axios";
import { ENV } from "./env";

const axios: AxiosRequestConfig = {
  baseURL: ENV.PUBLIC_API,
  responseType: 'json',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
}

const AppConfig = {
  axios
}

export default AppConfig;
