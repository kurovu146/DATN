import { Link } from "react-router-dom";
import style from "./Question.module.css";
import { DATADETAIL_GET_QUESTION, LIST_IMAGE_USER } from "../../mocks";
import { memo, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { questionApi } from "../../api";
import {
  IQuestionDetail,
  ICommentDetail
} from "../../interfaces/question.interfaces";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MESSAGE } from "../../constants/general.constant";
interface IPropsMainContent {
  postDetail: IQuestionDetail;
}
function Maincontent(props: IPropsMainContent) {
  const { postDetail } = props;
  const [isComment, setIsComment] = useState<boolean>(false);
  const [isDeleteComment, setIsDeleteComment] = useState<boolean>(false);
  const [getIdDelete, setIdDelete] = useState<number>(0);
  const [quesdataDetail, setQuesDataDetail] = useState<IQuestionDetail>(DATADETAIL_GET_QUESTION);
  const [commentDataDetail, setCommentDataDetail] = useState<ICommentDetail[]>([]);
  const [contentComment, setContentComment] = useState<string>("");
  const paramsRouter = useParams();
  const [isCommentChild, setIsCommentChild] = useState<boolean>(false);
  const [idCommentChild, setIdCommentChild] = useState<number>(0);

  useEffect(() => {
    getApiQuestionDetail();
    getApiComment();
  }, [isComment, isDeleteComment, postDetail?.id, paramsRouter.questionId]);

  const getApiComment = () => {
    if (paramsRouter.questionId) {
      questionApi
        .getApiComment(paramsRouter.questionId)
        .then((res) => setCommentDataDetail(res.data.data.comments))
        .catch((e) => console.log(e));
    }
  };

  const getApiQuestionDetail = () => {
    if (paramsRouter.questionId) {
      questionApi
        .getApiQuestionDetail(paramsRouter.questionId)
        .then((res) => {
          setQuesDataDetail(res.data)
        })
        .catch((e) => console.log(e));
    }
  };

  const handleSunmitCmt = () => {
    const params = {
      content: contentComment,
      questionId: postDetail?.id.toString(),
    };
    document
      .querySelector(".form-add-question")
      ?.classList.add("was-validated");
    if (contentComment) {
      setContentComment("");
      questionApi
        .postApiComment(params)
        .then((res) =>  {
            setIsComment(!isComment);
            toast.success(MESSAGE.ADD_SUCESS, { autoClose: 3000 });
        });
    }
  };

  const handleSunmitCmtChild = (id: number) => {
    const paramsChild = {
      content: contentComment,
      questionId: postDetail?.id.toString(),
      commentId: String(id)
    };
    document
      .querySelector(".form-add-question")
      ?.classList.add("was-validated");
    if (contentComment) {
      setContentComment("");
      questionApi
        .postApiComment(paramsChild)
        .then((res) => {
            setIsComment(!isComment);
            toast.success(MESSAGE.ADD_SUCESS, { autoClose: 3000 });
        });
    }
  };

  const renderAddComment = () => {
    return (
      <div>
        {isComment ? (
          <div>
            <div className="form-floating mt-4 mb-4">
              <form className="form-add-question">
                <div className="mb-3">
                  <label htmlFor="codeContent" className="form-label">
                    Comment
                  </label>
                  <textarea
                    className="form-control"
                    rows={3}
                    id="codeContent"
                    name="codeContent"
                    value={contentComment}
                    onChange={(e) => setContentComment(e.target.value)}
                    required
                  />
                  <div className="invalid-feedback">Please fill a comment.</div>
                </div>
              </form>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-4"
              onClick={handleSunmitCmt}
            >
              Add a comment
            </button>
            <button
              type="button"
              className="btn btn-secondary mt-4 ms-2"
              onClick={() => setIsComment(!isComment)}
            >
              Hide
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={`btn btn-link ${style.linkImprove}`}
            onClick={() => setIsComment(!isComment)}
          >
            Add a comment
          </button>
        )}
      </div>
    );
  };

  const handleDeleteComment = (item: number) => {
    questionApi
      .deleteApiComment(item)
      .then((res) => {
        toast.success(MESSAGE.DELETE_SUCCESS, { autoClose: 3000 });
        setIsDeleteComment(!isDeleteComment);
      })
      .catch((err) => {
        if (err.response.data.message) toast.error(err.response.data.message, { autoClose: 3000 })
      })
  };

  const handleOpenCommentChild = (id: number) => {
    setIdCommentChild(id);
    setIsCommentChild(!isCommentChild);
  }

  const renderCommentChild = (id: number) => {
    return (
      <>
        <div className="ms-4">
          {isCommentChild && idCommentChild === id ? (
            <div>
              <div className="form-floating mt-4 mb-4">
                <form className="form-add-question">
                  <div className="mb-3">
                    <label htmlFor="codeContent" className="form-label">
                      Comment
                    </label>
                    <textarea
                      className="form-control"
                      rows={3}
                      id="codeContent"
                      name="codeContent"
                      value={contentComment}
                      onChange={(e) => setContentComment(e.target.value)}
                      required
                    />
                    <div className="invalid-feedback">Please fill a comment.</div>
                  </div>
                </form>
              </div>
              <button
                type="button"
                className="btn btn-primary mt-4"
                onClick={() => handleSunmitCmtChild(id)}
              >
                Reply comment
              </button>
              <button
                type="button"
                className="btn btn-secondary mt-4 ms-2"
                onClick={() => setIsCommentChild(!isCommentChild)}
              >
                Hide
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={`btn btn-link ${style.linkImprove}`}
              onClick={() => { handleOpenCommentChild(id) }}
            >
              Reply
            </button>
          )}
        </div>
      </>
    )
  }
  const handleCommentChild = (id: number) => {
    setIsCommentChild(!isCommentChild)
  }
  return (
    <div>
      <div dangerouslySetInnerHTML={{__html: postDetail?.textContent}}></div >
      <br />
      <div className={`overflow-auto ${style.containerCode}`}>
        <p>{postDetail?.codeContent}</p>
      </div>
      <div className="d-flex justify-content-between mt-4">
        <div className="p-2 w-32 ">
          <span className={`${style.linkImprove} mx-2`}>Share</span>
          <span className={`${style.linkImprove} mx-2`}>Edit</span>
          <span className={`${style.linkImprove} mx-2`}>Follow</span>
        </div>
        <div
          className={`d-flex flex-row-reverse card mb-3 card-roll ${style.card_box}`}
        >
          <div className="row g-0 d-flex m-2 ">
            <div className="p-2 fs-6">
              <small>
                asked
                <span> {moment(postDetail?.createdAt).format("LLL")}</span>
              </small>
            </div>
            <div className="col-md-2 m-2">
              <img
                src={LIST_IMAGE_USER[0].img}
                className="img-fluid rounded-start"
                alt="avatar"
              />
            </div>
            <div className="col-md-8 ">
              <div className="m-2">
                <h5 className="card-title fs-6">
                  {postDetail?.user?.username}
                </h5>
                <div className="d-flex">
                  <div>-</div>
                  <div className={`d-flex ${style.listVoteCotainer}`}>
                    <ul className={`d-flex ${style.listVote}`}>
                      <li>
                        <span data-toggle="tooltip" data-placement="bottom" title="views">{postDetail?.views}</span>
                      </li>
                      <li>
                        <span data-toggle="tooltip" data-placement="bottom" title="votes">{postDetail?.votes.length}</span>
                      </li>
                      <li>
                        <span data-toggle="tooltip" data-placement="bottom" title="comments">{postDetail?.comments.length}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${style.textComment} pl-4`}>
        {commentDataDetail.map((item: ICommentDetail, index: number) => (
          <div key={index}>
            <hr />
            <div className={`${style.commentRow}`}>
              <div>
                {item.content} -{" "}
                <a href="" className={`${style.textComment}`}>
                  {item?.author}
                </a>{" "}
                -{" "}
                <span className={`${style.textComment} ${style.linkImprove}`}>
                  {moment(item?.createdAt).format("LLL")}
                </span>
              </div>
              <div>
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => setIdDelete(item.id)}
                >
                  <i className="bi bi-trash3"></i>
                </button>
                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex={-1}
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          Confirm
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        Are you sure delete?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDeleteComment(getIdDelete)}
                          data-bs-dismiss="modal"
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ms-4">Test</div>
            {renderCommentChild(item?.id)}
          </div>
        ))}
        <hr />
      </div>
      <div>{renderAddComment()}</div>
      <ToastContainer />
    </div>
  );
}

export default memo(Maincontent);
