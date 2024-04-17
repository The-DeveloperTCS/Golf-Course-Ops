import React from "react";
import LogoLoader from "../../assets/images/logo-for-loader.png";

const Loader = () => {
  return (
    <div class="center-body">
      <div class="loader-circle-9">
        <img src={LogoLoader} />
      </div>
    </div>
  );
};

export default Loader;
