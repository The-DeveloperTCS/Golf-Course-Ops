import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { MdNavigateNext } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";
import "../../views/style/Pagination.css";

const defaultButton = (props) => <button {...props}>{props.children}</button>;

const Pagination = ({
  PageButtonComponent = defaultButton,
  handleChangePage,
  pageNo,
  totalPages,
  previousText,
  nextText,
  changeMethodFlag,
  resetMethodFlag,
}) => {
  const [visiblePages, setVisiblePages] = useState([]);

  const activePage = pageNo + 1;

  const getVisiblePages = useCallback((page, total) => {
    if (total < 7) {
      return [1, 2, 3];
    } else if (page < 3) {
      return [1, 2, 3];
    } else if (page > total - 3) {
      return [total - 3, total - 2, total - 1, total];
    } else {
      return [page - 1, page, page + 1, page + 2];
    }
  }, []);

  useEffect(() => {
    setVisiblePages(getVisiblePages(pageNo, totalPages));
  }, [getVisiblePages, pageNo, totalPages]);

  const filterPages = (pages, totalPages) => {
    return pages.filter((page) => page >= 1 && page <= totalPages);
  };

  const changePage = (page) => {
    if (page === activePage) {
      return;
    }

    const newVisiblePages = getVisiblePages(page, totalPages);
    setVisiblePages(filterPages(newVisiblePages, totalPages));
    handleChangePage(page - 1);
  };

  return (
    <div className="Table__pagination">
      <div className="table-for-border">
        <div className="Table__prevPageWrapper">
          <PageButtonComponent
            className="Table__pageButton"
            onClick={() => {
              if (activePage === 1) return;
              changePage(activePage - 1);
            }}
            disabled={activePage === 1}
          >
            <IoIosArrowBack />
            {previousText}
          </PageButtonComponent>
        </div>
        <div className="Table__visiblePagesWrapper">
          {visiblePages.map((page, index, array) => (
            <PageButtonComponent
              key={page}
              className={
                activePage === page
                  ? "Table__pageButton Table__pageButton--active"
                  : "Table__pageButton"
              }
              onClick={() => changePage(page)}
            >
              {array[index - 1] + 2 < page ? `...${page}` : page}
            </PageButtonComponent>
          ))}
        </div>
        <div className="Table__nextPageWrapper">
          <PageButtonComponent
            className="Table__pageButton1"
            onClick={() => {
              if (activePage === totalPages) return;
              changePage(activePage + 1);
            }}
            disabled={activePage === totalPages}
          >
            {nextText}
            <MdNavigateNext />
          </PageButtonComponent>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  pageNo: PropTypes.number.isRequired,
  PageButtonComponent: PropTypes.any,
  handleChangePage: PropTypes.func.isRequired,
  previousText: PropTypes.string,
  nextText: PropTypes.string,
  changeMethodFlag: PropTypes.bool,
  resetMethodFlag: PropTypes.func,
};

export default Pagination;
