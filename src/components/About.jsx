import React from "react";
import { styles } from "../constants";

const About = () => {
  return (
    <section
      id="about"
      className={`p-6 mt-28  flex flex-col gap-4 text-left ${styles.bgColor.altLight}`}
    >
      <div className="lg:max-w-[1000px] lg:mx-auto">
        <h3 className="text-center text-xl md:text-3xl font-semibold">
          About Us
        </h3>
        <p className="font-extralight text-xs md:text-lg">
          Krypt provides the most secure and scalable solutions for the digital
          asset economy, offering regulated custody, borrowing and lending, and
          core infrastructure to investors and builders alike. Founded in 2016 –
          the early days of crypto – Krypt pioneered the multi-signature wallet
          and later built TSS to improve upon other companies' MPC offerings.
          Between multi-sig and TSS, Krypt offers the safest technology on the
          market and safeguards over 600 tokens across a wide variety of
          blockchains.Krypt provides the most secure and scalable solutions for
          the digital asset economy, offering regulated custody, borrowing and
          lending, and core infrastructure to investors and builders alike.
          Founded in 2016 – the early days of crypto – Krypt pioneered the
          multi-signature wallet and later built TSS to improve upon other
          companies' MPC offerings. Between multi-sig and TSS, Krypt offers the
          safest technology on the market and safeguards over 600 tokens across
          a wide variety of blockchains.
        </p>
        <p className="font-extralight text-xs md:text-lg">
          Over the years, Krypt has expanded from offering wallets into
          providing a full-suite solution that lets clients hold assets safely
          and then put them to work. Krypt launched Trust Company in 2018,
          providing fully regulated, qualified cold storage to complement Krypt
          Inc’s original private wallet solution.
        </p>
        <p className="font-extralight text-xs md:text-lg">
          In 2020, Krypt launched Krypt Prime, which allows its clients to
          trade, borrow, and lend. Moreover, Krypt also provides access to DeFi,
          staking, NFT wallets, and beyond, and serves as the world’s sole
          custodian for WBTC, or wrapped Bitcoin. Today, Krypt is the leader in
          digital asset security, custody, and liquidity, providing the
          operational backbone for more than 1,500 institutional clients in over
          50 countries – a list that includes many regulated entities and the
          world’s top cryptocurrency exchanges and platforms.
        </p>
        <p className="font-extralight text-xs md:text-lg">
          Krypt also processes approximately 12.7% of all global Bitcoin
          transactions by value.
        </p>
      </div>
    </section>
  );
};

export default About;
