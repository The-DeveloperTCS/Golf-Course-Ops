import React, { useMemo, useEffect, useState } from "react";
import { connect } from "react-redux";
import DataTableGiftCard from "components/table/DataTableGiftCard";
import loaderActions from "redux/loader/actions";
import Loader from "components/loader/Loader";
import GiftCardActions from "redux/giftCard/action";
import useRolePermissions from "hooks/usePermissionAsPerAssign";
import { deleteGiftCards } from "redux/giftCard/service";

const { startLoader, endLoader } = loaderActions;
const { fetchGiftCardsPagination } = GiftCardActions;

const GiftCardsList = (props) => {
  const {
    fetchGiftCardsPagination,
    pageLimit,
    pageNo,
    total,
    startLoader,
    loader,
  } = props;
  const [giftCardsData, setGiftCardsData] = useState([]);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const useGiftCardPermission = useRolePermissions("GIFT_CARD");

  const handleChangePage = (event) => {
    fetchGiftCardsPagination(pageLimit, event);
  };

  const handleChangeRowsPerPage = (event) => {
    fetchGiftCardsPagination(event.target.value, pageNo);
  };

  useEffect(() => {
    startLoader(true);
    fetchGiftCardsByValues();
  }, []);

  const fetchGiftCardsByValues = () => {
    setTimeout(() => {
      fetchGiftCardsPagination(25, 1);
    }, 2000);
  };

  const deleteGiftCard = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    startLoader(true);
    deleteGiftCards(id)
      .then((res) => {
        fetchGiftCardsByValues();
      })
      .catch((err) => {
        endLoader(false);
        console.log(err, "error in emploayee table");
      });
  };

  useMemo(() => {
    setGiftCardsData(props.giftCards);
    setRowPerPage(pageLimit);
    setPage(pageNo);
    setTotalCount(total);
    setTotalPages(Math.ceil(total / pageLimit));
  }, [props?.giftCards, total, pageLimit, pageNo]);

  const columns = useMemo(() => [
    {
      title: "Gift Card ID",
      id: "id",
      enableFilters: false,
    },
    {
      title: "Card Number",
      id: "giftCardNumber",
      enableFilters: true,
    },
    {
      title: "Customer Name",
      id: "customerName",
      enableFilters: false,
    },
    {
      title: "Issue Date",
      id: "dateIssued",
      enableFilters: false,
    },
    {
      title: "Expiry Date",
      id: "expirationDate",
      enableFilters: false,
    },
    {
      title: "Status",
      id: "status",
      enableFilters: true,
    },
    {
      title: "Action",
      id: "action",
      enableFilters: false,
    },
  ]);

  return loader ? (
    <Loader />
  ) : (
    <div className="row ma-0">
      <div className="col-lg-12 ptb-15">
        <div className="roe-card-style">
          <div className="roe-card-header flex center">
            <div className="flex-1 mr-15 my-title ml-1">
              Gift Card List{" "}
              <span className="pull-right">
                {useGiftCardPermission && (
                  <button
                    className="c-btn ma-5 c-outline-info"
                    onClick={() => props.history.push("/gift-card/new")}
                  >
                    <i className="fas fa-plus" /> New Gift Card
                  </button>
                )}
              </span>
            </div>
          </div>

          <div className="roe-card-body">
            <DataTableGiftCard
              columns={columns}
              data={giftCardsData}
              totalCount={totalCount}
              pageLimit={rowPerPage}
              pageNo={page}
              totalPages={totalPages}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              deleteGiftCard={deleteGiftCard}
            ></DataTableGiftCard>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state, "state");
  return {
    giftCards: state.giftCard.giftCards,
    pageLimit: state.giftCard.pageLimit,
    pageNo: state.giftCard.pageNo,
    total: state.giftCard.total,
    loader: state.loader.loader,
  };
};

export default connect(mapStateToProps, {
  fetchGiftCardsPagination,
  startLoader,
  endLoader,
})(GiftCardsList);
