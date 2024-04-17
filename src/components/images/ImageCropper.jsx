import { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import Button from "components/button/Button";
import { fetchDigitalOceanUrlForImage } from "redux/fileUpload/service";
import Resizer from "react-image-file-resizer";
import { resizeThumbnail } from "../../util/ImageResizer";

const ImageCropper = ({ isOpen, onClose, onSave, image, onError }) => {
  const EditorRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(false);

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

  const handleSave = async () => {
    if (!EditorRef.current) {
      onClose();
    }
    setLoading(true);
    const dataUrl = await EditorRef.current.getImage().toDataURL();
    const blob = await (await fetch(dataUrl)).blob();
    const image = await resizeThumbnail(blob);

    fetchDigitalOceanUrlForImage().then((res) => {
      try {
        handleSubmission(res.data.url, image.type, image);
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleSubmission = (url, contentType, selectedFile) => {
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
        .then(async (result) => {
          const fileUrl = url.split("?")[0];
          setTimeout(() => {
            setLoading(false);
            onSave(fileUrl);
            onClose();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };
    reader.readAsBinaryString(selectedFile);
  };

  return (
    <Modal isOpen={isOpen} onClosed={onClose}>
      <ModalBody className="w-full h-full flex flex-col items-center justify-center">
        <div className="row-ma-0">
          <div className="col-sm-12">
            <AvatarEditor
              ref={EditorRef}
              image={image}
              width={400}
              height={400}
              border={20}
              scale={scale}
              crossOrigin="anonymous"
            />
          </div>
          <div className="row-ma-0">
            <label className="col-sm-4 col-form-label">Zoom</label>
            <div className="col-sm-8">
              <input
                type="range"
                step="0.01"
                min="1"
                max="2"
                name="scale"
                value={scale}
                onChange={(v) => setScale(parseFloat(v.target.value))}
              />
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          type="button"
          className="c-btn ma-5 c-outline-info"
          dataStyle="expand-left"
          onClick={handleSave}
          loading={loading}
        >
          Done
        </Button>{" "}
        <Button className="c-btn ma-5 c-outline-secondary" onClick={onClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ImageCropper;
