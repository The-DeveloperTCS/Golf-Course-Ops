import "./style.css";

const SideRibbon = ({ text }) => {
  return (
    <div className="box">
      <div className="ribbon ribbon-bottom-left">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default SideRibbon;
