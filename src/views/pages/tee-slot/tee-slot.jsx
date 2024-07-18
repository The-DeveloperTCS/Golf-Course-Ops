import tee1Icon from "../../../assets/images/tee1_icon.png";
import { Link } from "react-router-dom";

function TeeSlot({ backgroundColor, holes, playerName, players }) {
  return (
    <Link
      to="/tee-sheet-new"
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: 250,
          height: 40,
          margin: "auto",
          borderRadius: 5,
          backgroundColor,
        }}
      >
        <div
          className="pt-2"
          style={{
            backgroundColor: "#4365CF",
            height: "100%",
            width: "20%",
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            color: "white",
            textAlign: "center",
          }}
        >
          <p>{holes}</p>
        </div>
        <div
          className="px-2"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <div className="m-0 p-0" style={{ height: "40%" }}>
            {players} {playerName}
          </div>
          <div style={{ textAlign: "left" }}>
            <img src={tee1Icon} alt="" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default TeeSlot;
