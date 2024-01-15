import axios from "axios";
import AppConfig from "../config/AppConfig";

const client = axios.create(AppConfig.axios);

const configHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const myClient = {
  post(endpoint: string, params: any, config?: any) {
    return client.post(endpoint, params, { ...config, ...configHeader() });
  },
  put(endpoint: string, params: any, config?: any) {
    return client.put(endpoint, params, { ...config, ...configHeader() });
  },
  get(endpoint: string, config?: any) {
    return client.get(endpoint, { ...config, ...configHeader() });
  },
  delete(endpoint: string, params?: any, config?: any) {
    return client.delete(endpoint, {
      ...config,
      ...configHeader(),
      data: params,
    });
  },
};

export default myClient;
