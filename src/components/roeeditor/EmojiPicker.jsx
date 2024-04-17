import React, { useState, useMemo, useRef, Fragment, useEffect } from "react";
import classNames from "classnames";

const EmojiPicker = (props) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const emojiMenu = useRef();

  const { query, emojisList, insertEmojiHandler } = props;

  const handleClick = () => {
    setOpen(false);
  };

  const getEmoji = useMemo(() => {
    const isQuery = query ? query.slice(1) : "";
    return isQuery !== ""
      ? emojisList.filter((emoji) =>
          emoji.name.toLowerCase().includes(isQuery.toLowerCase())
        )
      : emojisList;
  }, [query, emojisList]);

  useMemo(() => {
    if (query !== null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [query]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    // document.addEventListener("keydown", handleKeyDown);
    return () => {
      console.log("remove");
      document.removeEventListener("click", handleClick);
      //   document.removeEventListener("keydown", handleKeyDown);
      setIndex(0);
    };
  }, []);

  return (
    <Fragment>
      {open && (
        <div className="emojji-picker" ref={emojiMenu}>
          <div className="emoji-list">
            {getEmoji.map((emoji, i) => {
              return (
                <div
                  key={i}
                  onMouseOver={() => setIndex(i)}
                  className={classNames(
                    "pa-10",
                    "mb-6",
                    "text-center",
                    i === index && "active"
                  )}
                  onClick={() => insertEmojiHandler(emoji.char)}
                >
                  {emoji.char}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EmojiPicker;
