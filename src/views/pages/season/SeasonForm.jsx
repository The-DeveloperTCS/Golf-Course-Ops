import { useEffect, useState } from "react";
import Button from "components/button/Button";
import { connect } from "react-redux";
import seasonActions from "redux/season/action";
import { bindActionCreators } from "redux";
import { getSpecificSeason } from "redux/season/service";
import NotificationActions from "redux/notifications/actions";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";
import { Badge, Table } from "reactstrap";
import OptionForm from "./SeasonListForm";
import useRolePermissions from "hooks/usePermissionAsPerAssign";

const SeasonForm = (props) => {
  const { seasonId, updateSeason } = props;
  const [updatedSeason, setUpdateSeason] = useState({ ...updateSeason });
  const [saving, setSaving] = useState(false);
  const [showOptionForm, setShowOptionForm] = useState(false);
  const [updatedOption, setUpdatedOption] = useState({});
  const [optionEdit, setOptionEdit] = useState(false);

  // const useTerminalPermission = useRolePermissions("TERMINAL");

  useEffect(() => {
    if (seasonId) {
      getSpecificSeason(seasonId).then((res) => {
        setUpdateSeason(res.data);
      });
    }
  }, []);

  const onSave = () => {
    setSaving(true);
    props.onSave({ ...updatedSeason }).then(() => setSaving(false));
  };

  const onOptionEdit = (ind) => {
    setOptionEdit(true);
    setUpdatedOption(updatedSeason.season_list[ind]);
    setShowOptionForm(true);
  };

  const onOptionRemove = (ind) => {
    setUpdateSeason({
      ...updatedSeason,
      season_list: updatedSeason.season_list.filter((_, i) => i !== ind),
    });
  };

  const addOption = () => {
    setUpdatedOption({ name: "" });
    setShowOptionForm(true);
    setOptionEdit(false);
  };

  const onOptionChange = (o) => {
    setShowOptionForm(false);
    setUpdatedOption({});
    var season_list = [];
    var itemOptions = [...updatedSeason.season_list];
    var checkOptions = itemOptions.filter((elem) => elem.name === o.name);
    if (checkOptions.length > 0) {
      season_list = [
        ...updatedSeason.season_list.map((el) => (el.name === o.name ? o : el)),
      ];
    } else {
      season_list = [...updatedSeason.season_list, o];
    }

    setUpdateSeason({
      ...updatedSeason,
      season_list: season_list,
    });
    setUpdatedOption({});
  };

  const title = () => {
    if (updatedSeason.id) {
      return `Update Season #${updatedSeason.id}`;
    }

    return "New Season";
  };

  // const showError = (message) => {
  //     props.dispatch(NotificationActions.failure(message));
  //     setSaving(false);
  // };

  return (
    <div>
      <div className="row ma-0">
        <div className="col-lg-6 ptb-15">
          <div className="roe-card-style">
            <div className="roe-card-header flex center">
              <div className="flex-1 mr-15 my-title ml-1">{title()}</div>
            </div>

            <div className="roe-card-body">
              <form>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Name</label>
                  <div className="col-sm-8">
                    <input
                      type="text"
                      className="form-control react-form-input"
                      value={updatedSeason.name}
                      //   disabled={!useTerminalPermission}
                      onChange={(e) =>
                        setUpdateSeason({
                          ...updatedSeason,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Start Date</label>
                  <div className="col-sm-8">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        // disabled={!useCustomerPermission}
                        // style={{ width: "50%" }}
                        inputFormat="dd/MM/yyyy"
                        value={new Date(updatedSeason.startDate)}
                        onChange={(newValue) =>
                          setUpdateSeason({
                            ...updatedSeason,
                            startDate: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">End Date</label>
                  <div className="col-sm-8">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        // disabled={!useCustomerPermission}
                        // style={{ width: "50%" }}
                        inputFormat="dd/MM/yyyy"
                        value={new Date(updatedSeason.endDate)}
                        onChange={(newValue) =>
                          setUpdateSeason({
                            ...updatedSeason,
                            endDate: newValue,
                          })
                        }
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Status</label>
                  <div className="col-sm-8">
                    <div className="pretty p-default p-curve p-toggle">
                      <input
                        type="checkbox"
                        checked={updatedSeason.status}
                        // disabled={!useTerminalPermission}
                        onChange={(e) => {
                          setUpdateSeason({
                            ...updatedSeason,
                            status: e.target.checked,
                          });
                        }}
                      />
                      <div className="state p-success p-on">
                        <label>Active</label>
                      </div>
                      <div className="state p-danger p-off">
                        <label>In-Active</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* {useTerminalPermission && ( */}
                <Button
                  type="button"
                  className="c-btn ma-5 c-success"
                  dataStyle="expand-left"
                  onClick={onSave}
                  loading={saving}
                >
                  Save
                </Button>
                {/* )} */}
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-6 ptb-15">
          <div className="roe-card-style">
            <div className="roe-card-header flex center">
              <div className="flex-1 mr-15 my-title ml-1">
                {updatedSeason.season_list?.length} Option(s) of Season
              </div>
            </div>

            <div className="roe-card-body">
              <Table striped style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {updatedSeason.season_list?.map((o, ind) => (
                    <tr key={ind}>
                      <td>{ind + 1}</td>
                      <td>{o.name}</td>
                      <td>{o.price}</td>
                      <td>
                        {o.status ? (
                          <Badge className="c-success p-2">Active</Badge>
                        ) : (
                          <Badge className="c-secondary p-2">In-Active</Badge>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn c-btn-sm c-outline-primary ma-5"
                          onClick={() => onOptionEdit(ind)}
                          // disabled={!useCatalogPermission}
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          className="btn c-btn-sm c-outline-danger ma-5"
                          onClick={() => onOptionRemove(ind)}
                          // disabled={!useCatalogPermission}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* {!showOptionForm && useCatalogPermission && ( */}
              <Button
                type="button"
                className="c-btn ma-5 c-outline-info"
                dataStyle="expand-left"
                onClick={addOption}
              >
                Add New Option
              </Button>
              {/* )} */}

              {/* Option Form */}
              {/* {useCatalogPermission && ( */}
              <OptionForm
                show={showOptionForm}
                option={updatedOption}
                onChange={(o) => onOptionChange(o)}
                optionEdit={optionEdit}
              ></OptionForm>
              {/* )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators(seasonActions, dispatch),
    ...bindActionCreators(NotificationActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SeasonForm);
