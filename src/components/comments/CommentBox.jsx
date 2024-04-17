import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Scrollbars } from "react-custom-scrollbars";
import ChattingBoardWrapper from "./chattngboard.style";
import { commentsList, addComment } from "redux/comms/service";
import Button from "components/button/Button";
import moment from "moment";

const CommentBox = (props) => {
  const chatScroll = useRef("chatScroll");
  const [messageinput, setMessageinput] = useState("");
  const [scrollDown, setScrollDown] = useState(false);
  const [saving, setSaving] = useState(false);

  const [comments, setComments] = useState([]);

  const { id, type, idField, canComment } = props;

  const handleAddComment = (msg) => {
    setSaving(true);
    addComment({ message: msg, [idField || type + "Id"]: id })
      .then((res) => {
        setComments([...comments, res.data]);
        setScrollDown(true);
      })
      .finally(() => setSaving(false));
  };

  const fetchComments = useCallback(() => {
    commentsList(type, id).then((res) => {
      setComments(res.data);
      setScrollDown(true);
    });
  }, [id, type]);

  useMemo(() => {
    if (scrollDown) {
      const setScroll = chatScroll.current;
      setScroll.scrollTop(
        setScroll.getScrollHeight() - setScroll.getClientHeight()
      );
      setScrollDown(false);
    }
  }, [scrollDown]);

  useEffect(() => {
    if (!id) return;
    fetchComments();
  }, [fetchComments, id]);

  const sendMessage = () => {
    if (messageinput.trim() !== "") {
      handleAddComment(messageinput);
      setMessageinput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const onChangeMessageInput = (e) => {
    setMessageinput(e.target.value);
  };

  return (
    <ChattingBoardWrapper {...props}>
      {/* <div className="card roe-shadow-2 fill-height">
        <div className="card-body"> */}
      <div className="board-container roe-box-shadow">
        <div className="chat-board-header border-top-radius">
          <ul className="list-inline ma-0 pr-20">
            <li className="list-inline-item vert-middle">
              <div className="chat-header-font ml-10">Comments</div>
            </li>
          </ul>
        </div>
        <div className="chat-messages-part">
          <Scrollbars
            className={
              type === "order" ? "chat-height-order" : "chat-height-merchant"
            }
            //  ""
            autoHideDuration={1}
            autoHide
            // autoHeight
            ref={chatScroll}
            // renderTrackHorizontal={(props) => (
            //   <div
            //     {...props}
            //     className="track-horizontal"
            //     style={{ display: "none" }}
            //   />
            // )}
            // renderThumbHorizontal={(props) => (
            //   <div
            //     {...props}
            //     className="thumb-horizontal"
            //     style={{ display: "none" }}
            //   />
            // )}
            // renderTrackVertical={(props) => (
            //   <div
            //     {...props}
            //     className="track-vertical"
            //     style={{ display: "none" }}
            //   />
            // )}
            // renderThumbVertical={(props) => (
            //   <div
            //     {...props}
            //     className="thumb-vertical"
            //     style={{ display: "none" }}
            //   />
            // )}
          >
            <div className="plr-10">
              {comments &&
                comments.map((e, i) => {
                  return (
                    <div className="flex-x" key={i}>
                      <div className="flex-1 self-message-design">
                        <div className="fs-16 demi-bold-text">{e.author}</div>
                        <div className="message-text">{e.message}</div>
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
      {/* </div>
      </div> */}
    </ChattingBoardWrapper>
  );
};

export default CommentBox;
