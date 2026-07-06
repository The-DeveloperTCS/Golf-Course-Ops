import { useDropzone } from "react-dropzone";
import React from "react";
import { fetchDigitalOceanUrlForImage } from "redux/fileUpload/service";
import Resizer from "react-image-file-resizer";
import { resizeImage, resizeThumbnail } from "util/ImageResizer";
import { isMockUploadUrl, completeMockUpload } from "util/mockUploadHandler";

const ImageUploader = ({ onUploadStart, onUploadReady, onError }) => {
  // Find a better way to do this

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        320,
        480,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    });

  async function uploadImage([pendingImage]) {
    if (!["image/png", "image/jpeg"].includes(pendingImage.type)) {
      onError("Invalid image format. Allowed image formats are PNG and JPEG");
      return;
    }
    onUploadStart();
    fetchDigitalOceanUrlForImage().then((res) => {
      try {
        handleSubmission(res.data.url, pendingImage.type, pendingImage);
      } catch (err) {
        console.log(err);
      }
    });
  }

  const handleSubmission = (url, contentType, selectedFile) => {
    if (isMockUploadUrl(url)) {
      completeMockUpload(selectedFile).then((result) => {
        onUploadReady(result);
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const headers = {
        "Content-Type": contentType,
        "x-amz-acl": "public-read",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "X-Requested-With",
        "Access-Control-Allow-Origin": "*",
      };
      const resizedImage = await resizeImage(selectedFile);
      fetch(url, { method: "PUT", body: selectedFile, headers })
        .then(async (result) => {
          const image = await resizeThumbnail(selectedFile);
          const fileUrl = url.split("?")[0];
          fetchDigitalOceanUrlForImage().then((res) => {
            try {
              handleThumnail(res.data.url, contentType, image, fileUrl);
            } catch (err) {
              console.log(err);
            }
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    reader.readAsBinaryString(selectedFile);
  };

  const handleThumnail = (url, contentType, selectedFile, imageUrl) => {
    if (isMockUploadUrl(url)) {
      completeMockUpload(selectedFile).then((result) => {
        onUploadReady({
          url: imageUrl || result.url,
          thumbnailUrl: result.thumbnailUrl,
        });
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const headers = {
        "Content-Type": contentType,
        "x-amz-acl": "public-read",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "X-Requested-With",
        "Access-Control-Allow-Origin": "*",
      };
      fetch(url, { method: "PUT", body: selectedFile, headers })
        .then((result) => {
          const fileUrl = url.split("?")[0];
          setTimeout(() => {
            onUploadReady({
              url: imageUrl,
              thumbnailUrl: fileUrl,
            });
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    reader.readAsBinaryString(selectedFile);
  };

  return {
    uploadImage: uploadImage,
  };
};

const useFirebaseUpload = ({ onUploadStart, onUploadReady, onError }) => {
  const { uploadImage } = ImageUploader({
    onUploadStart,
    onUploadReady,
    onError,
  });

  return useDropzone({
    accept: "image/*",
    disabled: false,
    onDrop: uploadImage,
  });
};

export default function ImageUpload({
  children,
  onStart,
  onUpload,
  onUploadError,
}) {
  const onUploadStart = () => {
    console.log("Uploading image ...");
    onStart();
  };

  const onUploadReady = (res) => {
    onUpload(res.url, res.thumbnailUrl);
  };

  const onError = () => {
    onUploadError("Failed to upload image.");
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

export function ImageUploadUrl() {
  const handleUrlUpload = (url) => {
    return new Promise(async (resolve, reject) => {
      let blob = await fetch(url).then((r) => r.blob());
      if (blob.type === "text/html") {
        return reject("Invalid image url");
      }

      const { uploadImage } = ImageUploader({
        onUploadStart: () => {
          console.log("Uploading image ...");
        },
        onUploadReady: ({ url, thumbnailUrl }) => {
          console.log("Uploaded image");
          resolve([url, thumbnailUrl]);
        },
        onError: (err) => {
          console.log(err);
          reject("Failed to upload image.");
        },
      });

      uploadImage([blob]);
    });
  };

  return {
    upload: handleUrlUpload,
  };
}
