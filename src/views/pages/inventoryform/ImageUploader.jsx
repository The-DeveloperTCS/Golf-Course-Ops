// import React, { useState } from "react";
import "../../style/ImageUploader.css";
import uploadlogo from "../../../assets/images/Group 1000002746.png";
import React, { useState } from "react";
import * as XLSX from "xlsx";
import ReactVirtualizedTable from "../clockInClockOut/ClockInTabel";

function ImageUploader() {
  const [data, setData] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        let parsedData;
        if (file.name.endsWith(".csv")) {
          parsedData = parseCSV(data);
        } else {
          parsedData = parseExcel(data);
        }
        setData(parsedData);

        if (parsedData.length > 0) {
          const keys = Object.keys(parsedData[0]);
          const columnsData = keys.map((key) => ({
            dataKey: key,
            label: key,
            numeric: false,
            width: 150,
          }));
          setColumns(columnsData);
        }
      } catch (error) {
        console.error("Error parsing file:", error);
      }
    };
    if (file) {
      reader.readAsBinaryString(file);
    }
  };

  const parseCSV = (data) => {
    const parsedData = [];
    const rows = data.split(/\r?\n/);
    const headers = rows[0].split(",");
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(",");
      if (row.length === headers.length) {
        const rowData = {};
        for (let j = 0; j < headers.length; j++) {
          rowData[headers[j]] = row[j];
        }
        parsedData.push(rowData);
      }
    }
    return parsedData;
  };

  const parseExcel = (data) => {
    const workbook = XLSX.read(data, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { header: 1 });
  };

  return (
    <div className="table-container">
      <div className="uploaded-image-main">
        <img src={uploadlogo} alt="" />
      </div>

      <input
        type="file"
        accept=".xlsx, .xls , .csv"
        onChange={handleFileUpload}
      />
      {data.length > 0 && (
        <ReactVirtualizedTable data={data} columns={columns} />
      )}
    </div>
  );
}

export default ImageUploader;
