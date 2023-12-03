import React from "react";
import DefiComp from "./DefiComp";
import { defiContents, securities, styles } from "../constants";
import ProtectedCoins from "./ProtectedCoins";

const Defi = () => {
  const defis = defiContents.map((df) => {
    return <DefiComp key={df.id} title={df.title} content={df.content} />;
  });

  const secs = securities.map((sc) => {
    return (
      <ProtectedCoins
        key={sc.id}
        img={sc.img}
        icon={sc.icon}
        icon2={sc.icon2}
        title={sc.title}
        line={sc.line}
      />
    );
  });

  return (
    <>
      <section
        id="defi"
        className="p-6 mt-28 lg:max-w-[1000px] lg:mx-auto flex flex-col gap-4"
      >
        <h3 className="uppercase text-left md:text-center text-xl md:text-2xl font-semibold">
          defi
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {defis}
        </div>
      </section>
      <article
        className={` ${styles.bgColor.altLight} flex flex-col gap-4 py-10 `}
      >
        <h3 className={`capitalize font-semibold mt-10 text-xl`}>
          Coin protected in all case
        </h3>
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 lg:max-w-[1000px] lg:mx-auto `}
        >
          {secs}
        </div>
      </article>
    </>
  );
};

export default Defi;
