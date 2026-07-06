import React, { useState, useEffect, useRef, useMemo } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import ChattingBoardWrapper from "./chattngboard.style";
import { fetchDigitalOceanUrl } from "redux/fileUpload/service";
import { isMockUploadUrl, completeMockUpload } from "util/mockUploadHandler";
import Button from "components/button/Button";
import moment from "moment";

const CommentBox = (props) => {
  const { id, canComment, comments, saving, setSaving } = props;
  const hiddenFileInput = React.useRef(null);
  const chatScroll = useRef("chatScroll");
  const [messageinput, setMessageinput] = useState("");
  const [scrollDown, setScrollDown] = useState(false);

  useEffect(() => {
    if (!id) return;
    setScrollDown(true);
  }, [id]);

  useMemo(() => {
    if (scrollDown) {
      const setScroll = chatScroll.current;
      setScroll.scrollTop(
        setScroll.getScrollHeight() - setScroll.getClientHeight()
      );
      setScrollDown(false);
    }
  }, [scrollDown]);

  const onChangeMessageInput = (e) => {
    setMessageinput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (messageinput.trim() !== "") {
      setSaving(true);
      var commentObj = {
        file: null,
        message: messageinput,
      };
      props.handleAddComment(commentObj);
      setMessageinput("");
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleSubmission = (url, contentType, selectedFile) => {
    const finish = (fileUrl) => {
      const commentObj = {
        file: fileUrl,
        message: "",
        purchaseOrderId: id,
      };
      setSaving(true);
      props.handleAddComment(commentObj);
    };

    if (isMockUploadUrl(url)) {
      completeMockUpload(selectedFile).then((result) => finish(result.url));
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const headers = {
        "Content-Type": contentType,
        "x-amz-acl": "public-read",
      };
      return fetch(url, { method: "PUT", body: selectedFile, headers })
        .then((result) => {
          const fileUrl = url.split("?")[0];
          var commentObj = {
            file: fileUrl,
            message: "",
            purchaseOrderId: id,
          };
          setSaving(true);
          props.handleAddComment(commentObj);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    reader.readAsBinaryString(selectedFile);
  };

  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = async (event) => {
    setSaving(true);
    const file = event.target.files[0];
    const contentType = file.type;
    fetchDigitalOceanUrl().then((res) => {
      handleSubmission(res.data.url, contentType, file);
    });
  };

  return (
    <ChattingBoardWrapper {...props}>
      <div
        className="board-container roe-box-shadow"
        style={{ marginTop: "20px" }}
      >
        <div className="chat-board-header border-top-radius">
          <ul className="list-inline ma-0 pr-20">
            <li className="list-inline-item vert-middle">
              <div className="chat-header-font ml-10">Comments</div>
            </li>
          </ul>
        </div>
        <div className="chat-messages-part">
          <Scrollbars
            className="chat-height-merchant"
            autoHideDuration={1}
            autoHide
            ref={chatScroll}
          >
            <div className="plr-10">
              {comments &&
                comments.map((e, i) => {
                  return (
                    <div className="flex-x" key={i}>
                      <div className="flex-1 self-message-design">
                        <div className="fs-16 demi-bold-text">{e.author}</div>
                        {e.file ? (
                          <div className="message-text">
                            <a
                              target="_blank"
                              href={e.file}
                              style={{ textDecoration: "none", color: "black" }}
                            >
                              {e.file}
                            </a>
                          </div>
                        ) : (
                          <div className="message-text">{e.message}</div>
                        )}

                        <small className="text-muted">
                          {moment(e.createdAt)
                            .local()
                            .format("llll")}
                        </small>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Scrollbars>
        </div>
        {canComment && (
          <div className="text-area-block">
            <Button
              type="button"
              className="send-button c-btn border-bottom-radius"
              dataStyle="expand-left"
              onClick={sendMessage}
              loading={saving}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
            <Button
              type="button"
              className="upload-button c-btn border-bottom-radius"
              dataStyle="expand-left"
              onClick={handleClick}
              loading={saving}
            >
              <i class="fa fa-upload" aria-hidden="true">
                <input
                  type="file"
                  ref={hiddenFileInput}
                  onChange={handleChange}
                  style={{ display: "none" }}
                />
              </i>
            </Button>
            <input
              placeholder="Write Something Here..."
              className="form-control message-text-area border-bottom-radius"
              rows="2"
              value={messageinput}
              onChange={onChangeMessageInput}
              onKeyPress={handleKeyPress}
            />
          </div>
        )}
      </div>
    </ChattingBoardWrapper>
  );
};

export default CommentBox;
