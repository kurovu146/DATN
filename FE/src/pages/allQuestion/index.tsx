import * as React from "react";
import style from "./allQuestion.module.css"
import { DEFAULT_AVATAR_USERLIST } from "../../mocks";
import { useState, useEffect } from "react";
import { questionApi } from "../../api";
import { IQuestionDetail, ITagQuestionDetail } from "../../interfaces/question.interfaces";
import { useNavigate } from "react-router-dom";
import ModalAddQuestion from "../../components/QuestionComp/ModalAddQuestion";
import ReactPaginate from "react-paginate";
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/general.constant";
import { processPagination } from "../../helper/utils";

function AllQuestion() {
    const navigate = useNavigate();
    const [listQuestion, setListQuestion] = useState<IQuestionDetail[]>([]);
    const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
    const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentQuestions, setCurrentQuestions] = useState<IQuestionDetail[]>(
        []
    );

    useEffect(
        () => {
            questionApi
                .getApiQuestion()
                .then((res) => setListQuestion(res.data))
                .catch((err) => console.log(err))
        }, [isCreatePost]
    )

    useEffect(() => {
        processPaginationHome();
    }, [listQuestion, currentPage]);

    const handleDetail = (id: number) => {
        navigate(`/questions/${id}`);
    }

    const getReloadData = () => {
        setIsCreatePost(!isCreatePost);
    };

    const renderListQuestion = () => {
        return (
            currentQuestions.map((listQuestion: IQuestionDetail) => {
                return (
                    <>
                        <hr />
                        <div className="d-flex " key={listQuestion.id}>
                            <div className="flex-shrink-0 text-end ms-4">
                                <div>{listQuestion.votes.length} votes</div>
                                <div className={`${style.vote} my-2`}>{listQuestion.comments.length} comments</div>
                                <div className={`${style.vote}`}>{listQuestion.views} views</div>
                            </div>
                            <div className="flex-grow-1 ms-3 me-4">
                                <a href="" onClick={() => handleDetail(listQuestion.id)}>{listQuestion.title}</a>
                                <div>
                                    <div className="d-flex justify-content-between" >
                                        <div className="mt-2 d-flex">
                                            {
                                                listQuestion.tags.map((tag: ITagQuestionDetail) => {
                                                    return (
                                                        <>
                                                            <div key={tag.id}>
                                                                <a className={`${style.tag} me-2`} >
                                                                    {tag.name}
                                                                </a>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className={`mt-4`}>
                                            <img src={DEFAULT_AVATAR_USERLIST[Math.floor(Math.random() * 5)]} className={`${style.image}`} alt="avatar" />
                                            <a href="" className="ms-2">{listQuestion.user.username} </a> <b>-</b> <small>-</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })
        )
    }

    const handleClickPagination = (event: any) => {
        setCurrentPage(event.selected);
    };

    const processPaginationHome = () => {
        const pageCount = Math.ceil(listQuestion.length / pageSize);
        setPageCount(pageCount);
        setCurrentQuestions(processPagination(listQuestion, currentPage, pageSize));
    };

    return (
        <>
            <div className="d-flex">
                <div className="flex-grow-1">
                    <div className="d-flex justify-content-between m-4">
                        <div className={`fs-3`}>
                            All Questions
                        </div>
                        <div>
                            <button
                                type="button"
                                className={`${style.ask} mt-2 btn btn-primary`}
                                data-bs-toggle="modal"
                                data-bs-target="#addQuestion"
                            >
                                Add question
                            </button>
                            <ModalAddQuestion getReloadData={getReloadData} />
                        </div>

                    </div>
                    <div className={`p-2`}>
                        {renderListQuestion()}
                        <ReactPaginate
                            onPageChange={handleClickPagination}
                            pageCount={pageCount}
                            containerClassName="pagination justify-content-center"
                            pageLinkClassName="page-link"
                            activeClassName="active"
                            previousLabel="<"
                            previousLinkClassName="page-link"
                            breakLabel="..."
                            breakLinkClassName="page-link"
                            nextLabel=">"
                            nextLinkClassName="page-link"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default React.memo(AllQuestion)