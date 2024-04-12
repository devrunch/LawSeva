import { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./Mylinks";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link, ind) => (
        <div key={"Links-" + ind}>
          <div className="px-3 text-left md:cursor-pointer group">
            <h1
              className="py-7 flex justify-between items-center md:pr-0 pr-5 group"
              onClick={() => {
                heading !== link.name ? setHeading(link.name) : setHeading("");

                setSubHeading("");
              }}
            >

              {link.name}
              <span className="text-xl md:hidden inline">
                <ion-icon
                  name={`${heading === link.name ? "chevron-up" : "chevron-down"
                    }`}
                ></ion-icon>
              </span>
              <span className="text-xl md:mt-1 md:ml-2  md:block hidden group-hover:rotate-180 group-hover:-mt-2">
                <ion-icon name="chevron-down"></ion-icon>
              </span>
            </h1>
            {link.submenu && (
              <div>
                <div className="absolute ml-[-40px] top-20 hidden group-hover:md:block hover:md:block bg-slate-50  rounded-lg drop-shadow-lg">
                  {link.sublinks.map((mysublinks, indec) => (
                    <div  className="text-gray-700 hover:text-blue-500 transition-all py-3 px-6" key={`slinks-${indec}`} >
                      <Link to={mysublinks.link}>
                        <h1 className="text-md">{mysublinks.name}</h1>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks.map((slinks) => (
              <div key={`sl-${slinks.link}`}>
                <div>
                  <Link to={slinks.link} className=" text-gray-700 hover:text-black">
                    <h1
                      onClick={() =>
                        subHeading !== slinks.name
                          ? setSubHeading(slinks.Head)
                          : setSubHeading("")
                      }
                      className="py-4 pl-7  md:pr-0 pr-5"
                    >
                      {slinks.name}

                    </h1>
                  </Link>

                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;
