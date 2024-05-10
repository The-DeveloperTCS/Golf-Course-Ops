import React, { useState } from "react";
import "../../style/ImageUploader.css";
import uploadlogo from "../../../assets/images/Group 1000002746.png";

// const ImageUpload = ({ image, setImage }) => {
//     const handleImageChange = (e) => {
//         setImage(URL.createObjectURL(e.target.files[0]));
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         // Perform additional handling for CSV file if needed
//         console.log("Selected file:", file);
//     };

//     return (
//         <label htmlFor="fileInput" className="image-upload">
//             <div className="uploaded-image-main"><img src={uploadlogo} alt="" /></div>
//             <input
//                 type="file"
//                 id="fileInput"
//                 accept=".csv, application/vnd.ms-excel, text/csv"
//                 onChange={handleFileChange}
//                 className="image-input"
//             />
//         </label>
//     );
// };

// export default ImageUpload;
// import React from 'react'
import * as XLSX from "xlsx";
import { MdWorkOutline } from "react-icons/md";
import { setDate } from "date-fns";
import { object } from "prop-types";
import { th } from "date-fns/locale";

function ImageUploader() {
  const [data, setData] = useState([]);

  const handelFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array" }); // Use 'array' type
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parseData = XLSX.utils.sheet_to_json(sheet);
        setData(parseData);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
      }
    };
    reader.readAsArrayBuffer(file); // Read as ArrayBuffer
  };
  return (
    <div>
      <input
        type="file"
        accept=".xlsx, .xls , csv"
        onChange={handelFileUpload}
      />
      {data.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ImageUploader;
