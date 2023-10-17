import React from "react";
import CancelIcon from "../../assets/cancel-icon.svg";
const ClearButton = ({ onClick }) => (
  <button className="clear" onClick={onClick}>
    <img src={CancelIcon} alt="Clear" width="24" height="24" />
  </button>
);

export default ClearButton;
