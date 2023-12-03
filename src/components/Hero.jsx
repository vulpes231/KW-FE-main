import React from "react";
import { hero1, hero2 } from "../assets/main";
import { styles } from "../constants";

const Hero = () => {
  return (
    <section className="w-full p-6 flex flex-col gap-6 lg:max-w-[1000px] lg:mx-auto md:text-lg">
      <div className="flex flex-col md:flex-row gap-6 items-center">
        <article className="text-center md:text-left w-full space-y-2">
          <h3
            className={`font-bold ${styles.textColor.primary} text-2xl lg:text-3xl capitalize leading-6`}
          >
            The safest crypto wallet for
            <span className="text-[#333]"> Everyone</span>
          </h3>
          <p className=" font-extralight lg:text-lg">
            Krypt Wallet lets you store your crypto assets securely and easily
            accessible while keeping your private keys contained in your card
          </p>
        </article>
        <figure className="w-full flex items-center justify-center">
          <img src={hero1} alt="hero-phone" className="w-[200px]" />
        </figure>
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-6 items-center">
        <article className="text-center md:text-left w-full">
          <h3 className="text-xl font-semibold lg:text-3xl ">
            Thousands of currency
          </h3>
          <p className="font-extralight lg:text-lg">
            A hardware wallet for your bitcoin, ethereum and many more. All in
            one card
          </p>
        </article>
        <figure className="w-full flex items-center justify-center">
          <img
            src={hero2}
            alt="hero-wallet"
            className="w-[200px] lg:w-[350px]"
          />
        </figure>
      </div>
    </section>
  );
};

export default Hero;
