import React, { useState } from "react";
import Button from "components/button/Button";
import VideoUpload from "components/uploader/VideoUpload";

const FirebaseVideoUpload = (props) => {
  const onVideoUpload = (r) => {
    props.onVideoUpload(r);
  };

  const onVideoUploadError = (e) => {
    props.onVideoUploadError(e);
  };

  return (
    <VideoUpload
      onStart={() => props.setLoading(true)}
      onUpload={onVideoUpload}
      onUploadError={onVideoUploadError}
      loading={props.loading}
    >
      <Button
        type="button"
        className="c-btn ma-5 c-outline-info"
        dataStyle="expand-left"
        loading={props.loading}
        diabled={props.loading}
      >
        Add Video
      </Button>
    </VideoUpload>
  );
};

export default FirebaseVideoUpload;
