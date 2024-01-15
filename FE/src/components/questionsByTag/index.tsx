import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";
import { questionApi } from "../../api";
import { DEFAULT_CURRENT_PAGE, DEFAULT_PAGE_SIZE } from "../../constants/general.constant";
import { processPagination } from "../../helper/utils";
import { IQuestionDetail } from "../../interfaces/question.interfaces";
import ModalAddQuestion from "../QuestionComp/ModalAddQuestion";
import styles from "./questionsByTag.module.css";

function QuestionsByTag() {
    let { tagName } = useParams();

    const [listQuestion, setListQuestion] = useState<IQuestionDetail[]>([]);
    const [isCreatePost, setIsCreatePost] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
    const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
    const [pageCount, setPageCount] = useState<number>(0);
    const [currentQuestions, setCurrentQuestions] = useState<IQuestionDetail[]>([]);
    const [isFind, setIsFind] = useState<boolean>(false);

    useEffect(() => {
        questionApi.getApiQuestionByTag(tagName!)
            .then((res) => {
                if (res.data) {
                    setIsFind(true);
                    setListQuestion(res.data.questions);
                };
            })
            .catch((err) => console.log(err))
    }, [isCreatePost])

    useEffect(() => {
        const pageCount = Math.ceil(listQuestion?.length / pageSize);
        setPageCount(pageCount);
        setCurrentQuestions(processPagination(listQuestion, currentPage, pageSize));
    }, [listQuestion, currentPage]);

    const getReloadData = () => {
        setIsCreatePost(!isCreatePost);
    };
    const handleClickPagination = (event: any) => {
        setCurrentPage(event.selected);
    };

    const renderListQuestion = () => {
        return currentQuestions.map((question: IQuestionDetail) => (
            <div className="d-flex mb-4 pb-4 border-bottom" key={question.id}>
                <div className="flex-grow-1 ms-3 me-4">
                    <Link to={`/questions/${question.id}`}><h3 className="h6">{question.title}</h3></Link>
                    <div dangerouslySetInnerHTML={{ __html: question.textContent }} className={styles.textContent}></div >
                    <small className={`${styles.font12} mt-3`}>
                        {moment(question?.createdAt).format("LLL")}
                    </small>
                </div>
            </div>
        ))
    }

    return (
        <div className="d-flex">
            <div className="flex-grow-1 m-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="fs-3">Questions tagged [ {tagName} ] </div>
                    <div>
                        <button type="button" className={`${styles.ask} btn btn-primary`} data-bs-toggle="modal" data-bs-target="#addQuestion" >
                            Add question
                        </button>
                        <ModalAddQuestion getReloadData={getReloadData} />
                    </div>
                </div>
                <p>Total questions: {listQuestion?.length}</p>
                {isFind ?
                    <div className="mt-5">
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
                    </div> :
                    <p>There are no questions tagged {tagName}. <Link to="/tags">View available tags for this site.</Link></p>
                }
            </div>
        </div>
    )
}

export default React.memo(QuestionsByTag);
