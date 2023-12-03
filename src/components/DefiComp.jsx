import React from "react";
import { styles } from "../constants";

const DefiComp = ({ title, content }) => {
  return (
    <div
      className={`${styles.border.primary} p-4 flex flex-col gap-6 rounded-lg`}
    >
      <h3 className="capitalize font-semibold">{title}</h3>
      <p className="font-extralight">{content}</p>
    </div>
  );
};

export default DefiComp;
