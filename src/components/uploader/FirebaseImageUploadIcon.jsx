import React, { useState } from "react";
import Button from "components/button/Button";
import ImageUpload from "components/uploader/ImageUploadIcon";

const FirebaseImageUpload = (props) => {
  const [loading, setLoading] = useState(false);
  const onImageUpload = (r, thumbnail) => {
    setLoading(false);
    props.onImageUpload(r, thumbnail);
  };

  const onImageUploadError = (e) => {
    setLoading(false);
    props.onImageUploadError(e);
  };
  return (
    <ImageUpload
      onStart={() => setLoading(true)}
      onUpload={onImageUpload}
      onUploadError={onImageUploadError}
      upload={props.upload}
    >
      <Button
        type="button"
        className="c-btn ma-5 c-outline-info"
        dataStyle="expand-left"
        loading={loading}
      >
        {props.text}
      </Button>
    </ImageUpload>
  );
};

export default FirebaseImageUpload;
