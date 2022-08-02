import React from "react";
import './Pager.css';
import {FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight} from "react-icons/fa";

function Pager( {page = 0, size = 10, elementCount = 0, onPageChanged = page => {} }) {
    const maxVisiblePages = 5;
    const adjustedPage = Math.max(page, 1);
    const pageCount = Math.ceil(elementCount / size);
    let pageGroup = elementCount ? Math.ceil(adjustedPage / maxVisiblePages) - 1 : 0;
    const isFirstPage = adjustedPage === 1;
    const isLastPage = adjustedPage === pageCount;

    const handleFirstPageClick = () => {
        if(!isFirstPage) {
            onPageChanged(1);
        }
    };

    const handlePrevPageClick = () => {
        if(!isFirstPage) {
            onPageChanged(page - 1);
        }
    };

    const handleNextPageClick = () => {
        if(!isLastPage) {
            onPageChanged(page + 1);
        }
    };

    const handleLastPageClick = () => {
        if(!isLastPage) {
            onPageChanged(pageCount);
        }
    };

    return (
        <div className="pager">
            <span className="count-display">
                {!!elementCount ? `Total registros: ${elementCount}` : 'No hay registros para mostrar'}
            </span>
            {!!elementCount && (
                <div className="controls-display">
                    <div className={`control ${adjustedPage === 1 ? 'disabled' : ''}`}
                         onClick={handleFirstPageClick}>
                        <FaAngleDoubleLeft/>
                    </div>
                    <div className={`control ${adjustedPage === 1 ? 'disabled' : ''}`}
                         onClick={handlePrevPageClick}>
                        <FaAngleLeft/>
                    </div>
                    {[...Array(maxVisiblePages).keys()]
                        .map(index => (pageGroup * maxVisiblePages) + index + 1)
                        .filter(pageNum => pageNum <= pageCount)
                        .map(pageNum => (
                            <div key={pageNum}
                                 onClick={()=> onPageChanged(pageNum)}
                                 className={`control ${adjustedPage === pageNum ? 'selected' : ''}`}>
                                {pageNum}
                            </div>
                        ))}
                    <div className={`control ${adjustedPage === pageCount ? 'disabled' : ''}`}
                         onClick={handleNextPageClick}>
                        <FaAngleRight/>
                    </div>
                    <div className={`control ${adjustedPage === pageCount ? 'disabled' : ''}`}
                         onClick={handleLastPageClick}>
                        <FaAngleDoubleRight/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Pager;
