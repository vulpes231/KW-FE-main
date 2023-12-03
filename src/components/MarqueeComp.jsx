import React from "react";
import Marquee from "react-fast-marquee";
import { bnb, btc, doge, dot, eth, tet, xrp } from "../assets/coins";

const MarqueeComp = () => {
  return (
    <div className="flex items-center">
      <div className=" bg-white px-2">
        <h3 className="font-semibold">PoweredBy</h3>
        <p className="text-xs">CoinPayments</p>
      </div>
      <Marquee loop={0} direction="left" delay={1} speed={50}>
        <div className="flex items-center gap-4">
          <img src={btc} alt="" className="w-[50px]" />
          <img src={bnb} alt="" className="w-[50px]" />
          <img src={tet} alt="" className="w-[50px]" />
          <img src={doge} alt="" className="w-[50px]" />
          <img src={dot} alt="" className="w-[50px]" />
          <img src={eth} alt="" className="w-[30px]" />
          <img src={xrp} alt="" className="w-[50px]" />
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeComp;
