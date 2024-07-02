import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import "../../views/style/Pagination.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const defaultButton = (props) => <button {...props}>{props.children}</button>;

const Pagination = (props) => {
  const [visiblePages, setVisiblePages] = useState(null);
  const {
    PageButtonComponent = defaultButton,
    changeMethodFlag,
    onPageChange,
    page,
    resetMethodFlag,
    pages,
  } = props;
  const activePage = page + 1;

  const getVisiblePages = useCallback((page, total) => {
    if (total < 7) {
      return [1, 2, 3];
    } else if (page < 3) {
      return [1, 2, 3, 4];
    } else if (page > total - 3) {
      return [total - 3, total - 2, total - 1, total];
    } else {
      return [page - 1, page, page + 1, page + 2];
    }
  }, []);

  useEffect(() => {
    setVisiblePages(getVisiblePages(page, pages));
  }, [getVisiblePages, page, pages]);

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

  const filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((page) => page >= 1 && page <= totalPages);
  };

  const changePage = (page) => {
    const activePage = page + 1;

    //limit & page no send to status api

    if (page === activePage) {
      return;
    }
    const visiblePages = getVisiblePages(page, pages);

    setVisiblePages(filterPages(visiblePages, pages));
    onPageChange(page - 1);
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
            {/* {props.previousText} */}
            <i>
              <IoIosArrowBack />
            </i>
          </PageButtonComponent>
        </div>
        <div className="Table__visiblePagesWrapper">
          {visiblePages &&
            visiblePages.map((page, index) => {
              return (
                <PageButtonComponent
                  key={page}
                  style={{
                    backgroundColor: activePage === page ? "#fffff" : "white",
                  }}
                  className={
                    activePage === page
                    //  ? "Table__pageButton Table__pageButton--active"
                    //   : "Table__pageButton"
                  }
                  onClick={changePage.bind(null, page)}
                >
                  {page}
                </PageButtonComponent>
              );
            })}
        </div>
        <div className="Table__nextPageWrapper">
          <PageButtonComponent
            className="Table__pageButton1"
            onClick={() => {
              if (activePage === pages) return;
              changePage(activePage + 1);
            }}
            disabled={activePage === pages}
          >
            {props.nextText}

            <i>
              {" "}
              <IoIosArrowForward />
            </i>
          </PageButtonComponent>
        </div>
      </div>
    </div>
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
