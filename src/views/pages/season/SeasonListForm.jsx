import React, { useState } from "react";
import Button from "components/button/Button";

const SeasonListForm = ({ show, option, onChange, optionEdit }) => {
  const [updatedOption, setUpdatedOption] = useState(option);

  if (!show) {
    return null;
  }

  return (
    <form>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Name</label>
        <div className="col-sm-8">
          <input
            type="text"
            className="form-control react-form-input"
            value={updatedOption.name || ""}
            disabled={optionEdit}
            onChange={(e) =>
              setUpdatedOption({
                ...updatedOption,
                name: e.target.value,
              })
            }
          />
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Price</label>
        <div className="col-sm-8">
          <input
            type="number"
            className="form-control react-form-input"
            value={updatedOption.price || ""}
            onChange={(e) =>
              setUpdatedOption({
                ...updatedOption,
                price: e.target.value,
              })
            }
          />
        </div>
      </div>

      <div className="form-group row">
        <label className="col-sm-4 col-form-label">Status</label>
        <div className="col-sm-8">
          <div className="pretty p-default p-curve p-toggle">
            <input
              type="checkbox"
              checked={updatedOption.status}
              // disabled={!useTerminalPermission}
              onChange={(e) => {
                setUpdatedOption({
                  ...updatedOption,
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
      <Button
        type="button"
        className="c-btn ma-5 c-light"
        onClick={() => onChange(updatedOption)}
      >
        {optionEdit ? "Update" : "Add"}
      </Button>
    </form>
  );
};

export default SeasonListForm;
