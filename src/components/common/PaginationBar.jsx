import React from "react";
import PropTypes from "prop-types";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const defaultButton = (props) => <button type="button" {...props} />;

const PaginationBar = ({
  activePage,
  totalPages,
  visiblePages,
  onPageChange,
  PageButtonComponent = defaultButton,
}) => {
  if (!totalPages || totalPages < 1) {
    return null;
  }

  return (
    <div className="Table__pagination">
      <div className="table-for-border">
        <div className="Table__prevPageWrapper">
          <PageButtonComponent
            className="Table__pageButton Table__pageButton--nav"
            onClick={() => {
              if (activePage <= 1) return;
              onPageChange(activePage - 1);
            }}
            disabled={activePage <= 1}
            aria-label="Previous page"
          >
            <IoIosArrowBack />
          </PageButtonComponent>
        </div>

        <div className="Table__visiblePagesWrapper">
          {visiblePages &&
            visiblePages.map((pageNo, index, array) => (
              <PageButtonComponent
                key={`page-${pageNo}-${index}`}
                className={
                  activePage === pageNo
                    ? "Table__pageButton Table__pageButton--active"
                    : "Table__pageButton"
                }
                onClick={() => onPageChange(pageNo)}
                aria-label={`Page ${pageNo}`}
                aria-current={activePage === pageNo ? "page" : undefined}
              >
                {array[index - 1] + 2 < pageNo ? `...${pageNo}` : pageNo}
              </PageButtonComponent>
            ))}
        </div>

        <div className="Table__nextPageWrapper">
          <PageButtonComponent
            className="Table__pageButton Table__pageButton--nav-next"
            onClick={() => {
              if (activePage >= totalPages) return;
              onPageChange(activePage + 1);
            }}
            disabled={activePage >= totalPages}
            aria-label="Next page"
          >
            <IoIosArrowForward />
          </PageButtonComponent>
        </div>
      </div>
    </div>
  );
};

PaginationBar.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  visiblePages: PropTypes.array,
  onPageChange: PropTypes.func.isRequired,
  PageButtonComponent: PropTypes.any,
};

export default PaginationBar;
