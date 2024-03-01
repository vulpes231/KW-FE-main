import React, { useState } from "react";
import { klogo } from "../assets/main/index";
import { navLinks, styles } from "../constants";
import CtaButton from "./CtaButton";

import { HiMenu } from "react-icons/hi";
import { Link } from "react-scroll";

const MainHeader = () => {
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle((prev) => !prev);
  }

  function closeMenu() {
    setToggle(false);
  }

  const links = navLinks.map((link, index) => {
    return (
      <Link
        key={link.id || index}
        onClick={closeMenu}
        to={link.section}
        spy={true}
        smooth={true}
        offset={-70} // Adjust this offset based on your header height
        duration={500}
        className={`${styles.hover.primary} cursor-pointer`}
      >
        {link.title}
      </Link>
    );
  });
  return (
    <header className="w-full bg-[#EDF2F7] px-6 py-4 h-[70px] lg:h-[80px] flex items-center justify-center fixed top-0">
      <nav className="flex justify-between items-center w-full">
        {/* logo */}
        <img src={klogo} alt="krypt-wallet-logo" className="w-[70px]" />
        {/* links */}
        <ul className={`hidden md:flex gap-6 text-lg  font-light`}>{links}</ul>
        {/* ctas */}
        <span className="hidden md:flex gap-4">
          <CtaButton
            path="/signin"
            title="Sign In"
            customClass={` ${styles.border.primary} py-1 px-5 rounded-md lg:py-2`}
          />
          <CtaButton
            path="/signup"
            title="Sign Up"
            customClass={` ${styles.bgColor.primary} py-1 px-5 rounded-md lg:py-2 `}
          />
        </span>
        <span onClick={handleToggle} className="sm:hidden">
          <HiMenu />
        </span>
        {/* mobile menu */}
        <ul
          className={
            !toggle
              ? "hidden"
              : "flex flex-col gap-6 font-semibold absolute left-0 top-[70px] min-h-screen w-full items-center justify-center bg-white"
          }
        >
          {links}
          <span className="flex flex-col gap-6">
            <CtaButton
              path="/signin"
              title="Sign In"
              customClass={` ${styles.border.primary} py-1 px-5 rounded-md lg:py-2`}
            />
            <CtaButton
              path="/signup"
              title="Sign Up"
              customClass={` ${styles.bgColor.primary} py-1 px-5 rounded-md lg:py-2 `}
            />
          </span>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
