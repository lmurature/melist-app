import React from "react";
import "./styles/PrivacyLabel.css";

const PrivacyLabel = (props) => {
  const { privacy, centered } = props;

  const styleClass = centered
    ? "list-privacy-center unselectable"
    : "list-privacy unselectable";

  return (
    <div className={styleClass}>
      {privacy === "private" ? " Privada 🔐" : " Pública 🌍"}
    </div>
  );
};

export default PrivacyLabel;
