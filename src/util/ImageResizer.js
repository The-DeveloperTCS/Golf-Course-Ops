import Resizer from "react-image-file-resizer";

const calculateAspectRatio = (width, height) => {
  return height / width;
};

export const resizeImage = (image) =>
  new Promise((resolve) => {
    const newWidth = process.env.REACT_APP_IMAGE_RESIZING_WIDTH;
    const img = new Image();
    img.onload = () => {
      const aspectRatio = calculateAspectRatio(img.width, img.height);
      const newHeight = Math.round(newWidth * aspectRatio);

      Resizer.imageFileResizer(
        image,
        newWidth,
        newHeight,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    };
    img.src = URL.createObjectURL(image);
  });

export const resizeThumbnail = (image) =>
  new Promise((resolve) => {
    const newWidth = process.env.REACT_APP_IMAGE_THUMBNAIL_RESIZING_WIDTH;
    const img = new Image();
    img.onload = () => {
      const aspectRatio = calculateAspectRatio(img.width, img.height);
      const newHeight = Math.round(newWidth * aspectRatio);

      Resizer.imageFileResizer(
        image,
        newWidth,
        newHeight,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "blob"
      );
    };
    img.src = URL.createObjectURL(image);
  });
