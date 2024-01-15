import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { DEFAULT_CURRENT_PAGE } from "../../constants/general.constant";
import { processPagination } from "../../helper/utils";

interface IPropPagination {
    data: any;
    setDataCurrent: any;
    pageSize: number;    
};

function Pagination(props: IPropPagination) {
    const { data, setDataCurrent, pageSize } = props;

    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_CURRENT_PAGE);
    const [pageCount, setPageCount] = useState<number>(0);

    useEffect(() => {
        const pageCount = Math.ceil(data.length / pageSize);
        setPageCount(pageCount);
        setDataCurrent(processPagination(data, currentPage, pageSize));
    }, [data, currentPage]);

    const handleClickPagination = (event: any) => {
        setCurrentPage(event.selected);
    };

    return (
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
    )
}

export default Pagination;
