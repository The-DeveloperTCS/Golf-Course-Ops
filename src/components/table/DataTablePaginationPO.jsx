import React, { useEffect, useState, useMemo } from "react";
import ReactTableWrapper from "./reacttbl.style";
import Pagination from "components/common/PaginationWitAPI";
import { Table, Badge } from "reactstrap";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Select from "react-select";
import {
  fetchSuppliers,
  fetchMerchandisers,
  fetchBrands,
} from "redux/catalog/service";
import { history } from "redux/store";
import { Link } from "react-router-dom";
import { allConfigurationList } from "redux/configuration/service";

const typeOptions = [
  { value: "", label: "Default" },
  { value: true, label: "Clothing" },
  { value: false, label: "Non-Clothing" },
];

const statusOptions = [
  { value: "", label: "Default" },
  { value: "PENDING", label: "Pending" },
  { value: "OPEN", label: "Open" },
  { value: "CLOSED", label: "Close" },
  { value: "VOID", label: "Void" },
];

export default function StickyHeadTable(props) {
  const [suppliers, setSuppliers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [merchandisers, setMerchandinser] = useState([]);
  const [poTypes, setPOTypes] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectTypeOption, setTypeSelectOption] = useState(null);
  const [selectStatusOption, setStatusSelectOption] = useState("default");

  useEffect(() => {
    fetchSuppliers().then((res) => {
      setSuppliers(res.data);
    });
    fetchMerchandisers().then((res) => {
      setMerchandinser(res.data);
    });
    fetchBrands().then((res) => {
      setBrands(res.data);
    });
    allConfigurationList().then((res) => {
      var data = res.data;
      var index = { id: "", configValue: "Default" };
      var arr = [];
      arr.push(index);
      for (var i in data) {
        if (data[i].configName === "PO Types") {
          arr.push(data[i]);
        }
      }
      setPOTypes(arr);
    });
  }, []);

  const poTypesOptions = useMemo(() => {
    return poTypes.map((c) => {
      return { label: c.configValue, value: c.id };
    });
  }, [poTypes]);

  const getSupplierName = (sId) => {
    if (sId !== null) {
      const supplier = suppliers.filter((sp) => sp.id === sId);
      return supplier[0]?.name;
    }
    return "";
  };

  const getMerchandiserName = (mId) => {
    if (mId !== null) {
      const merchandiser = merchandisers?.filter((mr) => mr.id === mId);
      return merchandiser[0]?.name;
    }
    return "";
  };

  const getBrandName = (bId) => {
    if (bId !== null) {
      const brand = brands.filter((br) => br.id === bId);
      return brand[0]?.name;
    }
    return "";
  };

  const getTypeName = (tId) => {
    if (tId !== null) {
      const type = poTypes.filter((br) => br.id === tId);
      return type[0]?.configValue;
    }
    return "";
  };

  const handleBrand = (newBrand) => {
    if (newBrand !== null) {
      const brand = brands.filter((br) => br.id === newBrand.id);
      props.onChangeFilter(brand[0].id, "brand");
      setSelectedBrand({
        name: brand[0].name,
        id: brand[0].id,
      });
    } else {
      props.onChangeFilter("", "brand");
      setSelectedBrand(null);
    }
  };

  return (
    <ReactTableWrapper {...props}>
      <Table
        striped
        style={{
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <thead>
          <tr>
            {props.columns.map((column) => (
              <th>
                {column.enableFilters ? (
                  <div>{column.title}</div>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.columns.map((column) => (
            <td>
              {column.id === "number" ? (
                <input
                  type="number"
                  value={props.poNumber || ""}
                  onChange={(e) => {
                    props.onChangeFilter(e.target.value || "", column.id); // Set undefined to remove the filter entirely
                  }}
                  className="tabl-search react-form-input"
                  style={{ width: "120px" }}
                  placeholder={`PO No`}
                />
              ) : column.id === "latestIGPNumber" ? (
                <input
                  type="text"
                  value={props.poIGPNumber || ""}
                  onChange={(e) => {
                    props.onChangeFilter(e.target.value || "", column.id); // Set undefined to remove the filter entirely
                  }}
                  className="tabl-search react-form-input"
                  placeholder={`IGP Number`}
                />
              ) : column.id === "brandId" ? (
                <Autocomplete
                  id="Brands"
                  size={"small"}
                  options={brands}
                  renderInput={(params) => (
                    <TextField {...params} label="Brands" variant="outlined" />
                  )}
                  getOptionLabel={(option) => option.name}
                  style={{ width: 210 }}
                  value={selectedBrand}
                  onChange={(_event, newBrand) => {
                    handleBrand(newBrand);
                  }}
                />
              ) : column.id === "clothing" ? (
                <React.Fragment>
                  <div className="c-btn ma-4 select-dropdown">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      value={
                        selectTypeOption !== null
                          ? poTypesOptions.find(
                              (c) => c.value === selectTypeOption
                            )
                          : ""
                      }
                      onChange={(o) => {
                        setTypeSelectOption(o.value);
                        props.onChangeFilter(o.value, "type");
                      }}
                      options={poTypesOptions}
                    ></Select>
                  </div>
                </React.Fragment>
              ) : column.id === "active" ? (
                <React.Fragment>
                  <div className="c-btn ma-4 select-dropdown">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      value={
                        selectStatusOption !== null
                          ? statusOptions.find(
                              (c) => c.value === selectStatusOption
                            )
                          : ""
                      }
                      onChange={(o) => {
                        setStatusSelectOption(o.value);
                        props.onChangeFilter(o.value, "status");
                      }}
                      options={statusOptions}
                    ></Select>
                  </div>
                </React.Fragment>
              ) : null}
            </td>
          ))}

          {props.data.map((i) => (
            <tr key={i.number}>
              <Link
                target="_blank"
                to={`/accounts/purchaseOrder/${i.number}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <th scope="row">{i.number}</th>
              </Link>
              <td
                onClick={() =>
                  history.push(`/accounts/purchaseOrder/${i.number}`)
                }
              >
                {getMerchandiserName(i.merchandiserId)}
              </td>
              <td
                onClick={() =>
                  history.push(`/accounts/purchaseOrder/${i.number}`)
                }
              >
                {getSupplierName(i.supplierId)}
              </td>
              <td
                onClick={() =>
                  history.push(`/accounts/purchaseOrder/${i.number}`)
                }
              >
                {" "}
                {getBrandName(i.brandId)}
              </td>
              <td
                onClick={() =>
                  history.push(`/accounts/purchaseOrder/${i.number}`)
                }
              >
                {getTypeName(i.typeId)}
              </td>
              <td
                onClick={() =>
                  history.push(`/accounts/purchaseOrder/${i.number}`)
                }
              >
                {i.latestIGPNumber}
              </td>
              <td
                onClick={() =>
                  history.push(`/accounts/purchaseOrder/${i.number}`)
                }
              >
                {i.totalAmount}
              </td>
              <td
                onClick={() =>
                  history.push(`/accounts/purchaseOrder/${i.number}`)
                }
              >
                {i.status === "PENDING" ? (
                  <Badge className="c-info p-2">Pending</Badge>
                ) : i.status === "OPEN" ? (
                  <Badge className="c-success p-2">Active</Badge>
                ) : i.status === "CLOSED" ? (
                  <Badge className="c-secondary p-2">In-Active</Badge>
                ) : (
                  <Badge className="c-danger p-2">Void</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination
        handleChangePage={props.handleChangePage}
        totalPages={props.totalPages}
        pageNo={props.pageNo - 1}
      />
    </ReactTableWrapper>
  );
}
