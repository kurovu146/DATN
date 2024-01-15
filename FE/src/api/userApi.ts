import { ApiSettings } from "./api.setting";
import API from "./config.api";

const userApi = {
  getUserApi() {
    return API.get(ApiSettings.API_GET_ALL_USER);
  },

  getUserByType(type: string){
    return API.get(`${ApiSettings.API_GET_ALL_USER}?TabFilter=${type}`)
  }
};

export default userApi;
