import React from "react";

const ProtectedCoins = ({ img, icon, line, title, icon2 }) => {
  return (
    <article className="flex flex-col p-4 gap-4 bg-white rounded-lg h-full justify-between">
      <img src={img} alt="" />
      <p className="flex items-center gap-4 text-green-500">
        {icon} {line}
      </p>
      <p className="flex items-center justify-between">
        {title} {icon2}
      </p>
    </article>
  );
};

export default ProtectedCoins;
