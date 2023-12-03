import {
  imp,
  level,
  manage,
  price,
  pro1,
  pro2,
  pro3,
  secure,
  trf,
} from "../assets/main";

import { HiArrowDown, HiPlusCircle } from "react-icons/hi";

export const navLinks = [
  { id: "defi", title: "DEFI", section: "defi" },
  { id: "hiw", title: "How it works", section: "hiw" },
  { id: "about", title: "About", section: "about" },
];

export const styles = {
  border: {
    primary: "border border-[#58CAC3]",
    light: "border border-[#EDF2F7]",
  },
  bgColor: {
    primary: " bg-[#58CAC3]",
    light: " bg-[#EDF2F7]",
    altLight: " bg-[#F3F3F3]",
  },
  textColor: {
    primary: " text-[#58CAC3]",
    light: " text-[#EDF2F7]",
  },
  hover: {
    primary: "hover:text-[#58CAC3]",
  },
};

export const defiContents = [
  {
    id: 1,
    title: `Strenthen your defi security`,
    content: `Link MetaMask or any Web 3 wallet and your Krypt wallet to invest in DeFi with safer technology and better user controls.`,
  },
  {
    id: 2,
    title: `The safe place for your coins`,
    content: `Online wallets and exchanges are vulnerable to attacks and data leaks. Storing cryptocurrency data online increases the risk of financial theft, coin fraud, and permanent loss of crypto assets.`,
  },
  {
    id: 3,
    title: `Info stored online is hackable`,
    content: `Hardware wallets are the ultimate in Bitcoin and cryptocurrency security. Create your wallet, Connect various hardware wallet and easily manage your assets in a secure crypto ecosystem.`,
  },
  {
    id: 4,
    title: `Go offline. Store coins with Krypt Hardware Wallet.`,
    content: `Krypt hardware wallets are the safest and most resilient way to secure Bitcoin and cryptocurrency assets offline. Krypt wallets never expose your digital asset information to an insecure environment connected to the internet.`,
  },
];

export const securities = [
  {
    id: 1,
    img: pro1,
    title: "Easy wallet recovery",
    icon: <HiArrowDown />,
    icon2: <HiPlusCircle />,
    line: "Theft and device damage",
  },
  {
    id: 2,
    img: pro2,
    title: "Pin & Passphrase",
    icon: <HiArrowDown />,
    icon2: <HiPlusCircle />,
    line: "Extra security in wrong hands",
  },
  {
    id: 3,
    img: pro3,
    title: "Open source design",
    icon: <HiArrowDown />,
    icon2: <HiPlusCircle />,
    line: "Trust and transparency",
  },
];

export const guidelines = [
  {
    id: 1,
    title: "Sign up for crypto private key wallet",
    content: "Theft and device damage",
    img: secure,
  },
  {
    id: 2,
    title: "Link or import your wallet",
    content: "Import your web 3 wallet directly to your Krypt preferred wallet",
    img: imp,
  },
  {
    id: 3,
    title: "Send & Receive crypto using your private key wallet",
    content: "Start using DEFI chain",
    img: trf,
  },
  {
    id: 4,
    content:
      "Access DeFi backed by Krypt’s secure technology, rather than just a single-signature extension alone. Pair with any hardware wallet to get the best blend of access and security.",
    title: "Level up your security",
    img: level,
  },
  {
    id: 5,
    content:
      "Pay a predictable fee for all DeFi transactions, rather than on a per-transaction basis.Execute a multi-step strategy without your custodian taking a cut at every juncture along the way.",
    title: "Get better pricing",
    img: price,
  },
  {
    id: 6,
    content:
      "Leverage Krypt’s user-level controls to ensure key parties can see and approve the flow of funds within your organization. Get visibility quickly so you can exercise proper oversight without sacrificing speed and execution.",
    title: "Manage the flow of funds",
    img: manage,
  },
];

export const footerLinks = [
  { id: "defi", title: "DEFI" },
  { id: "hiw", title: "How it works" },
  { id: "about", title: "About" },
  { id: "signin", title: "Sign In" },
  { id: "signup", title: "Sign Up" },
];
