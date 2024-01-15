import { ApiSettings } from "./api.setting";
import API from "./config.api";

const tagApi = {
  getApiTag() {
    return API.get(ApiSettings.API_GET_TAG);
  },
};

export default tagApi;
