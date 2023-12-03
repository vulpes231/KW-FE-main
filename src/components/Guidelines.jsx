import React from "react";
import { guidelines } from "../constants";
import Guide from "./Guide";

const Guidelines = () => {
  const guides = guidelines.map((gd) => {
    return (
      <Guide key={gd.id} img={gd.img} title={gd.title} content={gd.content} />
    );
  });

  return (
    <section
      id="hiw"
      className="p-6 mt-28 lg:max-w-[1000px] lg:mx-auto flex flex-col gap-4"
    >
      <h3 className="text-xl md:text-2xl font-semibold">How it works</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{guides}</div>
    </section>
  );
};

export default Guidelines;
