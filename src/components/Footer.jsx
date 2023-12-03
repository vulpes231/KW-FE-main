import React from "react";

import { klogo } from "../assets/main";
import { footerLinks, styles } from "../constants";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  const ftlinks = footerLinks.map((ft) => {
    return <li key={ft.id}>{ft.title}</li>;
  });
  return (
    <footer
      className={`p-6 ${styles.bgColor.light} border border-t-2 flex flex-col gap-6 font-extralight  text-xs md:text-lg`}
    >
      <div className="lg:max-w-[1000px] lg:mx-auto">
        <img src={klogo} alt="" className="w-[80px]" />
        <p className="text-left font-extralight leading-5 text-xs md:text-lg">
          Krypt Wallet is trusted by clients and leading market players from all
          around the globe today. We have established presence in 170 countries
          on 5 continents, except Antarctica.
        </p>
        <ul className="flex flex-col gap-4">{ftlinks}</ul>
        <div className="flex flex-col items-center">
          <h3>Kryptwallet &copy; 2023. All Rights Reserved</h3>
          <a href="support@kryptwallet.com" className="flex items-center gap-1">
            <HiMail /> support@kryptwallet.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
