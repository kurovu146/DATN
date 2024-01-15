import {
  IParamQuestion,
  IParamComment,
  IParamVote,
} from "../interfaces/api.interfaces";
import { ApiSettings } from "./api.setting";
import API from "./config.api";

const questionApi = {
  getApiQuestion() {
    return API.get(ApiSettings.API_QUESTION);
  },

  getApiQuestionDetail(id: string) {
    return API.get(`${ApiSettings.API_QUESTION}${id}`);
  },

  postApiQuestion(params: IParamQuestion) {
    return API.post(ApiSettings.API_QUESTION, params);
  },

  deleteApiComment(id: number) {
    return API.delete(`${ApiSettings.API_COMMENT}/${id}`);
  },

  getApiComment(id: string) {
    return API.get(`${ApiSettings.API_QUESTION}${id}`);
  },

  postApiComment(params: IParamComment) {
    return API.post(ApiSettings.API_COMMENT, params);
  },

  getApiVote(id: string) {
    return API.get(`${ApiSettings.API_VOTE}/${id}/question`);
  },

  getApiType(id: string) {
    return API.get(`${ApiSettings.API_VOTE}/status?questionId=${id}`);
  },

  postApiVote(params: IParamVote) {
    return API.post(ApiSettings.API_VOTE, params);
  },

  getApiQuestionByTag(tagName: string) {
    return API.get(`${ApiSettings.API_GET_QUESTION_BY_TAG}/${tagName}`);
  }
};

export default questionApi;
