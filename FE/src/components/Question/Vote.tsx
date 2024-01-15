import * as React from "react";
import { questionApi } from "../../api";
import style from "./Question.module.css";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  IQuestionId,
  IVoteDetail,
} from "../../interfaces/question.interfaces";
import { LocalStorageKey, MESSAGE, STATUS_CODE, VOTE_PAGE } from "../../constants/general.constant";
import { toast } from "react-toastify";

function Vote(props: IQuestionId) {
  const [voteNumber, setVoteNumber] = useState<number>(0);
  const [voteType, setVoteType] = useState<string>("");
  const { questionId } = props;
  const userName = JSON.parse(localStorage.getItem(LocalStorageKey.USER_NAME) || "{}")
  const [checkStatus, setCheckStatus] = useState<boolean>(false);
  const paramsRouter = useParams();

  useEffect(() => {
    if (paramsRouter.questionId) getVotepApi();
  }, [voteType, checkStatus, voteNumber, paramsRouter.questionId]);

  const getVotepApi = () => {
    if (paramsRouter.questionId) {
      questionApi
        .getApiVote(paramsRouter.questionId)
        .then((res) => setVoteNumber(res.data.upvote - res.data.downvote))
        .catch((err) => console.log(err));

      questionApi
        .getApiType(paramsRouter.questionId)
        .then((res) => setVoteType(res.data.statusVote))
        .catch((err) => console.log(err));
    }
  };

  const handleUpVote = () => {
    postApiUpVote();
  };

  const postApiUpVote = () => {
    const params = {
      questionId: String(paramsRouter.questionId),
      voteType: VOTE_PAGE.UP_VOTE,
    };

    questionApi
      .postApiVote(params)
      .then((res) => {
        setCheckStatus(!checkStatus);
      })
      .catch((err) => {
        if (err.response.data.statusCode === STATUS_CODE.UNAUTHORIZED)
        toast.error(MESSAGE.ERROR_LOGIN, { autoClose: 3000 });
      });
  };

  const postApiDownVote = () => {
    const params = {
      questionId: String(paramsRouter.questionId),
      voteType: VOTE_PAGE.DOWN_VOTE,
    };
    questionApi
      .postApiVote(params)
      .then((res) => {
        setCheckStatus(!checkStatus);
      })
      .catch((err) => {
        if (err.response.data.statusCode === STATUS_CODE.UNAUTHORIZED)
        toast.error(MESSAGE.ERROR_LOGIN, { autoClose: 3000 });
      });
  };

  const handleDownVote = () => {

    postApiDownVote();
  };

  return (
    <>
      <div>
        <i
          className={`${style.vote} ${voteType === VOTE_PAGE.UP_VOTE ? style.activeBtnVote : null
            } bi bi-caret-up-fill fs-2 `}
          onClick={handleUpVote}
        ></i>
        <div className={`${style.iconText}`}>{voteNumber}</div>
        <i
          className={`${style.vote} ${voteType === VOTE_PAGE.DOWN_VOTE ? style.activeBtnVote : null
            } bi bi-caret-down-fill fs-2`}
          onClick={handleDownVote}
        ></i>
        <br />
        <div className={`${style.iconText}`}>
          <i className={`${style.vote} bi bi-bookmark fs-5`}></i>
        </div>
        <div className={`${style.iconText}`}>
          <i className={`${style.vote} bi bi-clock-history fs-5`}></i>
        </div>
      </div>
    </>
  );
}
export default React.memo(Vote);
