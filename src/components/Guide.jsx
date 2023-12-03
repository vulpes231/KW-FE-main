import React from "react";
import { styles } from "../constants";

const Guide = ({ img, title, content }) => {
  return (
    <div
      className={`flex flex-col gap-4 ${styles.border.primary} p-4 rounded-lg`}
    >
      <img src={img} alt="" className="w-full" />
      <h3 className={`${styles.textColor.primary} font-bold capitalize`}>
        {title}
      </h3>
      <p className="font-extralight text-xs md:text-lg">{content}</p>
    </div>
  );
};

export default Guide;
