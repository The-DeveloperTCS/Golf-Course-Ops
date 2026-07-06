import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import PaginationBar from "components/common/PaginationBar";

const Pagination = (props) => {
  const [visiblePages, setVisiblePages] = useState(null);
  const {
    PageButtonComponent,
    changeMethodFlag,
    onPageChange,
    page,
    resetMethodFlag,
    pages,
  } = props;
  const activePage = page + 1;

  const getVisiblePages = useCallback((currentPage, total) => {
    if (total < 7) {
      return [1, 2, 3].filter((p) => p <= total);
    }
    if (currentPage < 3) {
      return [1, 2, 3, 4].filter((p) => p <= total);
    }
    if (currentPage > total - 3) {
      return [total - 3, total - 2, total - 1, total].filter((p) => p >= 1);
    }
    return [
      currentPage - 1,
      currentPage,
      currentPage + 1,
      currentPage + 2,
    ].filter((p) => p >= 1 && p <= total);
  }, []);

  useEffect(() => {
    setVisiblePages(getVisiblePages(activePage, pages));
  }, [getVisiblePages, activePage, pages]);

  useEffect(() => {
    if (changeMethodFlag) {
      if (page === 0) {
        onPageChange(null);
        onPageChange(0);
      } else {
        onPageChange(0);
      }
      resetMethodFlag();
    }
  }, [changeMethodFlag, onPageChange, page, resetMethodFlag]);

  const changePage = (targetPage) => {
    if (targetPage === activePage) {
      return;
    }
    setVisiblePages(
      getVisiblePages(targetPage, pages).filter((p) => p >= 1 && p <= pages)
    );
    onPageChange(targetPage - 1);
  };

  return (
    <PaginationBar
      activePage={activePage}
      totalPages={pages}
      visiblePages={visiblePages}
      onPageChange={changePage}
      PageButtonComponent={PageButtonComponent}
    />
  );
};

Pagination.propTypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
  PageButtonComponent: PropTypes.any,
  onPageChange: PropTypes.func,
  previousText: PropTypes.string,
  nextText: PropTypes.string,
};

export default Pagination;
