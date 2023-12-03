import React from "react";
import { Link } from "react-router-dom";

const CtaButton = ({ title, path, customClass }) => {
  return (
    <Link to={path} className={customClass}>
      {title}
    </Link>
  );
};

export default CtaButton;
