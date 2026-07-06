import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import PaginationBar from "components/common/PaginationBar";

const Pagination = (props) => {
  const [visiblePages, setvisiblePages] = useState(null);
  const { PageButtonComponent, handleChangePage, pageNo, totalPages } = props;
  const activePage = pageNo + 1;

  const filterPages = (pages, max) => pages.filter((p) => p <= max);

  const getVisiblePages = useCallback((currentPage, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    }
    if (currentPage % 5 >= 0 && currentPage > 4 && currentPage + 2 < total) {
      return [1, currentPage - 1, currentPage, currentPage + 1, total];
    }
    if (currentPage % 5 >= 0 && currentPage > 4 && currentPage + 2 >= total) {
      return [1, total - 3, total - 2, total - 1, total];
    }
    return [1, 2, 3, 4, 5, total];
  }, []);

  useEffect(() => {
    setvisiblePages(getVisiblePages(activePage, totalPages));
  }, [getVisiblePages, activePage, totalPages]);

  const changePage = (page) => {
    setvisiblePages(filterPages(getVisiblePages(page, totalPages), totalPages));
    handleChangePage(page);
  };

  return (
    <PaginationBar
      activePage={activePage}
      totalPages={totalPages}
      visiblePages={visiblePages}
      onPageChange={changePage}
      PageButtonComponent={PageButtonComponent}
    />
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number,
  pageNo: PropTypes.number,
  PageButtonComponent: PropTypes.any,
  handleChangePage: PropTypes.func,
};

export default Pagination;
