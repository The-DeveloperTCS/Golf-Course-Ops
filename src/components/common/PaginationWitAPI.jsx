import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const defaultButton = (props) => <button {...props}>{props.children}</button>;

const Pagination = (props) => {
  const [visiblePages, setvisiblePages] = useState(null);
  const {
    PageButtonComponent = defaultButton,
    changeMethodFlag,
    handleChangePage,
    pageNo,
    resetMethodFlag,
  } = props;
  const activePage = pageNo + 1;

  const getVisiblePages = useCallback((pageNo, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (pageNo % 5 >= 0 && pageNo > 4 && pageNo + 2 < total) {
        return [1, pageNo - 1, pageNo, pageNo + 1, total];
      } else if (pageNo % 5 >= 0 && pageNo > 4 && pageNo + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  }, []);

  useEffect(() => {
    setvisiblePages(getVisiblePages(null, props.totalPages));
  }, [getVisiblePages, props.totalPages]);

  const filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((pageNo) => pageNo <= totalPages);
  };

  const changePage = (pageNo) => {
    const visiblePages = getVisiblePages(pageNo, props.totalPages);

    setvisiblePages(filterPages(visiblePages, props.totalPages));
    handleChangePage(pageNo);
  };

  return (
    <div className="Table__pagination">
      <div className="Table__prevPageWrapper">
        <PageButtonComponent
          className="Table__pageButton"
          onClick={() => {
            if (activePage === 1) return;
            changePage(activePage - 1);
          }}
          disabled={activePage === 1}
        >
          {/* {props.previousText} */}
          <i className="fas fa-backward"></i>
        </PageButtonComponent>
      </div>
      <div className="Table__visiblePagesWrapper">
        {visiblePages &&
          visiblePages.map((pageNo, index, array) => {
            return (
              <PageButtonComponent
                key={pageNo}
                className={
                  activePage === pageNo
                    ? "Table__pageButton Table__pageButton--active"
                    : "Table__pageButton"
                }
                onClick={changePage.bind(null, pageNo)}
              >
                {array[index - 1] + 2 < pageNo ? `...${pageNo}` : pageNo}
              </PageButtonComponent>
            );
          })}
      </div>
      <div className="Table__nextPageWrapper">
        <PageButtonComponent
          className="Table__pageButton"
          onClick={() => {
            if (activePage === props.totalPages) return;
            changePage(activePage + 1);
          }}
          disabled={activePage === props.totalPages}
        >
          <i className="fas fa-forward"></i>
        </PageButtonComponent>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  pageNo: PropTypes.number,
  PageButtonComponent: PropTypes.any,
  handleChangePage: PropTypes.func,
  previousText: PropTypes.string,
  nextText: PropTypes.string,
};

export default Pagination;
