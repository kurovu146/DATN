export interface IParamQuestion {
  title: string;
  textContent: string;
  tagName: string;
}

export interface IParamRegister {
  username: string;
  email: string;
  password: string;
}

export interface IParamLogin {
    username: string;
    password: string;
}

export interface IParamVerify {
  email: string | null;
  code: string;
}

export interface IParamComment {
  content: string;
  questionId: string;
}

export interface IParamVote {
  questionId: string;
  voteType: string;
}
