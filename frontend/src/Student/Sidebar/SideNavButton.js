import React, { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./navbar.css";
import { IconContext } from "react-icons";
import * as FiIcons from "react-icons/fi";

function Navbar(props) {
  const { setOrganizationLog, setSignup, setIsLoggedIn } = props;
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => {
    setSidebar(!sidebar); //for hamburger
    if (sidebar) {
      document.body.style.marginLeft = "7rem";
    } else {
      document.body.style.marginLeft = "7rem";
    }
  };
  const closeSidebar = () => {
    setSidebar(false); // for items
    document.body.style.marginLeft = "7rem";
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#">
            <button onClick={showSidebar} className="hamburger">
              <Hamburger
                direction="right"
                duration={0.6}
                color={"#fff"}
                toggled={sidebar}
                rounded
              />
            </button>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={closeSidebar}>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link
                    to={item.path}
                    className={sidebar ? "nav-block active" : "nav-block"}
                  >
                    {item.icon}
                    <span
                      className={sidebar ? "nav-title active" : "nav-title"}
                    >
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="nav-menu-items2">
            <li className="nav-text">
              <Link
                to="/"
                className="block py-2 px-6 hover:bg-gray-800"
                onClick={() => {
                  setIsLoggedIn(false);
                }}
              >
                <span className="mr-3">
                  <FiIcons.FiLogOut />
                </span>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
