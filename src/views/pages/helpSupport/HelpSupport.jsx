import React from "react";
import "../../style/HelpSupport.css";
import phone from "../../../assets/images/phone1.png";
import email from "../../../assets/images/email1.png";
import location from "../../../assets/images/loaction.png";

function HelpSupport() {
  return (
    <div className="HelpSupport-main">
      <p className="main-text-support" style={{ color: "white" }}>
        Help & Support
      </p>
      <div className="HelpSupport-main-inner">
        <div className="Get-in-touch">
          <h5 className="support-h5">Contact Waveland Golf Course</h5>
          <div className="phone-nbr">
            <img src={phone} alt="" />
            <p>(515) 555-0140</p>
          </div>
          <div className="phone-nbr">
            <img src={email} alt="" />
            support@wavelandgolf.com
          </div>
          <div className="phone-nbr">
            <img src={location} alt="" />
            <p>
              4901 Grand Avenue
              <br />
              Des Moines, IA 50312
            </p>
          </div>
        </div>
        <div className="devic-hardware-info">
          <h5>device & hardware info</h5>
          <div className="devic-hardware-info-main">
            <div className="devic-hardware-info1">
              <span>IOS</span>
              <p>
                Work on this <br />
                device
              </p>
            </div>
            <div className="devic-hardware-info1">
              <span>Android</span>
              <p>
                Work on this <br />
                device
              </p>
            </div>
            <div className="devic-hardware-info1">
              <span>Mac/Windows</span>
              <p>
                Work on this <br />
                device
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="software-main">
        <div className="software-update">
          <h5>software update</h5>
          <span>Update:</span>
          <p>This software is up to date New update is coming soon...</p>
        </div>
        <div className="software-update">
          <h5>software version</h5>
          <span>Update:</span>

          <p>This software is up to date</p>
        </div>
      </div>
    </div>
  );
}

export default HelpSupport;
