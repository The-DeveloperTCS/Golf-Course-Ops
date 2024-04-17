import { useDropzone } from "react-dropzone";
import React from "react";

const VideoUploader = ({ onUploadStart, onUploadReady, onError, loading }) => {
  async function uploadVideo(pendingVideo) {
    onUploadStart();
    onUploadReady(pendingVideo);
  }

  return {
    uploadVideo: uploadVideo,
  };
};

const useFirebaseUpload = ({
  onUploadStart,
  onUploadReady,
  onError,
  loading,
}) => {
  const { uploadVideo } = VideoUploader({
    onUploadStart,
    onUploadReady,
    onError,
    loading,
  });

  return useDropzone({
    accept: "video/*",
    disabled: loading,
    onDrop: uploadVideo,
  });
};

export default function VideoUpload({
  children,
  onStart,
  onUpload,
  onUploadError,
}) {
  const onUploadStart = () => {
    console.log("Uploading video ...");
    onStart();
  };

  const onUploadReady = (res) => {
    console.log(res);
    // onUploadReady({ pendingVideo })
    onUpload(res);
  };

  const onError = () => {
    onUploadError("Failed to upload video.");
  };

  const { getRootProps, getInputProps } = useFirebaseUpload({
    onUploadStart,
    onUploadReady,
    onError,
  });

  return (
    <span {...getRootProps()}>
      {children}
      <input {...getInputProps()} />
    </span>
  );
}

export function VideoUploadUrl() {
  const handleUrlUpload = (url) => {
    return new Promise(async (resolve, reject) => {
      const resp = await fetch(url);
      const blob = await resp.blob();
      // console.log(blob, "blob");
      if (blob.type === "text/html") {
        return reject("Invalid vide url");
      }
      // console.log(blob, "blob");
      const { uploadVideo } = VideoUploader({
        onUploadStart: () => {
          console.log("Uploading video ...");
        },
        onUploadReady: ({ url, thumbnailUrl }) => {
          console.log("Uploaded video");
          resolve([url, thumbnailUrl]);
        },
        onError: (err) => {
          console.log(err);
          reject("Failed to upload video.");
        },
      });

      uploadVideo([blob]);
    });
  };

  return {
    upload: handleUrlUpload,
  };
}
