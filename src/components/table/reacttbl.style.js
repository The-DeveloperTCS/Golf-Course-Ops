import styled from "styled-components";

const ReactTableWrapper = styled.div`
  .tbl-loader {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    .lds-ring {
      div {
        width: 8px !important;
        height: 45px !important;
        margin: 0px !important;
        border-color: #563c91 transparent transparent transparent !important;
      }
    }
  }

  .module-header {
    display: flex;
    align-items: center;
    @media (max-width: 575.98px) {
      display: block;
      .react-form-input {
        margin-top: 15px;
        margin-bottom: 5px;
      }
      button {
        margin: 0 !important;
      }
    }
  }
  table {
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  tr:nth-child(even) {
    background: #e8edff;
  }

  tr:nth-child(odd) {
    background: rgba(255, 255, 255);
  }

  tr td {
    cursor: pointer;
  }

  .table-container {
    margin: auto 24px;
    padding-bottom: 20px;
    background-color: white;
  }
  .custom-react-table-theme-class {
    th {
      min-width: 200px;
    }
    tbody {
      td {
        padding: 10px;
        font-family: "muli-medium";
        color: #33363f;
      }
      td.wide-cell {
        width: 150px;
      }
    }
  }
  .custom-react-table-pionter-class {
    tr td {
      cursor: default !important;
    }
  }

  .Table__itemCount {
    font-size: 14px;
  }

  .Table__pagination {
    align-items: center;
    display: flex;
    justify-content: end;
    padding: 20px 24px;
  }

  .Table__pageButton {
    font-size: 14px;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
    color: #757575 !important;
    margin: 0 0px;
    border-right: 1px solid #4365cf;
  }

  .Table__pageButton1:disabled {
    cursor: not-allowed;
    color: white;
    padding: 11px 15px;
    background-color: #4365cf;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .Table__pageButton:disabled {
    cursor: not-allowed;
    color: white !important;
    padding: 14px 15px;
    background-color: #4365cf;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .Table__pageButton1:disabled {
    cursor: not-allowed;
    color: white !important;
    padding: 10px 15px;
    background-color: #4365cf;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  .Table__pageButton--active {
    font-weight: bold;
    background-color: #FFFFF;
    color: black !important;
    width: 45px;
    height: 47px;
    border: 1px solid #4365cf;
  }

  .tabl-search {
    padding: 4px;
    margin: 10px;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &:focus {
      outline: 0;
    }
  }

  .back-icon {
    position: absolute;
    right: 30px;
    bottom: 27px;
    color: #563c91;
  }

  .-sort-desc {
    box-shadow: none !important;
    &:before {
      content: "▼";
      float: right;
      margin-right: 14px;
      color: #563c91;
    }
  }

  .-sort-asc {
    box-shadow: none !important;
    &:before {
      content: "▲";
      float: right;
      margin-right: 14px;
      color: #563c91;
    }
  }
  .react-action-class.wide-cell {
    width: 150px;
  }
  .react-action-class {
    button {
      height: auto !important;
      width: auto !important;
    }
  }
  .break-word {
    word-break: break-word;
  }
`;

export default ReactTableWrapper;
