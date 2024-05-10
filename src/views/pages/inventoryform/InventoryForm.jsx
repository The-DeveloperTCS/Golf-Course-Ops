import React, { useState } from "react";
import "../../style/InventoryForm.css";
import invent1 from "../../../assets/images/invent1.png";
import invent2 from "../../../assets/images/invent2.png";
import invent3 from "../../../assets/images/invent3.png";
import { MdCancel } from "react-icons/md";
import FileUploader from "../../pages/inventoryform/ImageUploader";

function InventoryForm() {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(URL.createObjectURL(selectedImage));
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (imageIndex) => {
    setSelectedImage(imageIndex);
  };

  return (
    <div className="InventoryForm-main">
      <div className="cancle-btn-invet">
        <p>Inventory Import</p>
        <MdCancel />
      </div>

      <div className="container-invent">
        <div className="image-invent-container">
          <img
            src={invent1}
            alt="Image 1"
            className={`image ${selectedImage === 0 ? "selected" : ""}`}
            onClick={() => handleImageClick(0)}
          />
          <p className="image-text">Upload Data</p>
        </div>
        <div
          className={`horizontal-dotted-line ${
            selectedImage === 0 ? "selected" : ""
          }`}
        ></div>
        <div className="image-invent-container">
          <img
            src={invent2}
            alt="Image 2"
            className={`image ${selectedImage === 1 ? "selected" : ""}`}
            onClick={() => handleImageClick(1)}
          />
          <p className="image-text">Match Columns</p>
        </div>
        <div
          className={`horizontal-dotted-line ${
            selectedImage === 1 ? "selected" : ""
          }`}
        ></div>
        <div className="image-invent-container">
          <img
            src={invent3}
            alt="Image 3"
            className={`image ${selectedImage === 2 ? "selected" : ""}`}
            onClick={() => handleImageClick(2)}
          />
          <p className="image-text">Preview</p>
        </div>
        <div
          className={`horizontal-dotted-line ${
            selectedImage === 2 ? "selected" : ""
          }`}
        ></div>
        <div className="image-invent-container">
          <img
            src={invent3}
            alt="Image 4"
            className={`image ${selectedImage === 3 ? "selected" : ""}`}
            onClick={() => handleImageClick(3)}
          />
          <p className="image-text">Import</p>
        </div>
      </div>

      <div className="Select-Inventory-form">
        <p>Select Inventory Category For Import</p>
        {/* <div className="inven-input">
                    <select id="Retail">
                        <option value="Retail">Retail1</option>
                        <option value="Retail2">Retail 2</option>
                        <option value="Retail3">Retail 3</option>
                    </select>
                </div> */}
      </div>
      <div className="FileUploader-componenet">
        <FileUploader />
      </div>
      <div className="invent-form-checkbox-btn">
        <p>Settings</p>
        <div className="invent-check-box">
          <input type="checkbox" />
          <label htmlFor="first-row">First row contains column headers</label>
        </div>
        <div className="invent-check-box">
          <input type="checkbox" />
          <label htmlFor="update-records">Update existing records</label>
        </div>
        <div className="Inventory-btn">
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}

export default InventoryForm;
