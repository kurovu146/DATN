import { IUserQuestionDetail } from "./question.interfaces";

export interface IUserVote {
  id: number;
  userId: number;
  questionId: number;
  voteType: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserQuestion {
  id: number;
  title: string;
  textContent: string;
  codeContent: string;
  userId: number;
  tagId: number;
  createdAt: string;
  updatedAt: string;
}

export interface IListUserDetail {
  user: IUserQuestionDetail;
  votes: IUserVote[];
  questions: IUserQuestion[],
  reputation: number
}

export interface IListUser {
  data: IListUserDetail[];
}
