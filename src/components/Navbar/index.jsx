import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/img/Untitled-design-17.svg";
import NavLinks from "./NavLinks";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white">
      <div className="flex items-center font-medium justify-between md:mx-6">
        <div className="z-50  md:w-auto w-full flex justify-between">
          <Link to='https://www.caclouddesk.com'>
          <img src={Logo} alt="logo" className="md:cursor-pointer " />
          </Link>
          <div className="text-3xl md:hidden my-auto" onClick={() => setOpen(!open)}>
            <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon>
          </div>
        </div>
        <ul className="md:flex hidden items-center gap-8 font-[Poppins] text-sm font-semibold">
          <li>
            <Link to="https://www.caclouddesk.com" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <li>
            <Link to="https://www.caclouddesk.com/demo-help-videos/" className="py-7 px-3 inline-block">
              Live Demo
            </Link>
          </li>
          <li>
            <Link to="https://demo.caclouddesk.com/" className="py-7 px-3 inline-block">
              Try Now
            </Link>
          </li>
          <NavLinks />
        </ul>
        
        {/* Mobile nav */}
        <ul
          className={`
        md:hidden z-10 bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
           <li>
            <Link to="https://www.caclouddesk.com" className="py-7 px-3 inline-block">
              Home
            </Link>
          </li>
          <li>
            <Link to="https://www.caclouddesk.com/demo-help-videos/" className="py-7 px-3 inline-block">
              Live Demo
            </Link>
          </li>
          <li>
            <Link to="https://demo.caclouddesk.com/" className="py-7 px-3 inline-block">
              Try Now
            </Link>
          </li>
          <NavLinks />
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
