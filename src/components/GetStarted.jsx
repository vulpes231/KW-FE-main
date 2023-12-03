import React from "react";
import { styles } from "../constants";
import { Link } from "react-router-dom";
import MarqueeComp from "./MarqueeComp";

const GetStarted = () => {
  return (
    <section
      className={`${styles.bgColor.altLight} p-6 font-extralight flex flex-col gap-6 md:text-lg`}
    >
      <div className="flex flex-col gap-6 items-center justify-center">
        <p>Securely manage your wallets with the pioneer of hardwallets </p>
        <Link
          to="/signup"
          className={`${styles.bgColor.primary} py-2 px-6 rounded-md w-[150px] md:w-[250px] text-center font-light text-md`}
        >
          Get Started
        </Link>
      </div>
      <MarqueeComp />
    </section>
  );
};

export default GetStarted;
