import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
// import iklogo from "../../../public/images/Ik developers.png";
// // import logo from "../../../public/images/Vector.png";
// import logo from "../../../public/images/logo/1.png";
// import logo2 from "../../../public/images/logo/2.jpg";
// import logo3 from "../../../public/images/logo/3.png";

// import logo4 from "../../../public/images/logo/4.jpg";



const navigation = [
  { name: "Home", path: "/" },
  { name: "Profile", path: "/profile" },
  { name: "Blogs", path: "/allblogs" },

  { name: "About", path: "/About" },
  { name: "LogIn", path: "/login" },
  { name: "Sign up", path: "/signup" },
  // { name: "About us", path: "/about" },

  // { name: "Contact us", path: "/contactus" }, 

];
function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
          <span className="icon font-bold text-lg">
              {/* <img className="iklogo" src={iklogo} alt="" /> */}
              Dashboard
            </span>
            <span>
              {/* <img className="logo  h-[10vh] w-fit" src={'logo4'} alt="" /> */}
            </span>
           
          </NavLink>
          
          

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            {/* {navigation.map((nav, i) => (
              <li key={i} className="nav-item">
                <NavLink activeClassName="active" className="nav-links" onClick={handleClick}>
                  <Link to={nav.path}>{nav.name}</Link>
                </NavLink>
              </li>
            ))} */}

            {navigation.map((nav, i) => (
              <li key={i} className="nav-item">
                <NavLink to={nav.path} activeClassName="active" className="nav-links" onClick={handleClick}>
                  {nav.name}
                </NavLink>
              </li>
            ))}

           
            <li>
              {/* <span className="contact-us-mobile">
                <Link to="/contactus">Contact us</Link>
              </span> */}
            </li>
          </ul>
          {/* <span className="contact-us">
            <Link to="/contactus">Contact us</Link>
          </span> */}
          <div className="nav-icon" onClick={handleClick}>
            {/* <i className={click ? "fas fa-times" : "fas fa-bars"}></i> */}
            {click ? (
              <span className="icon">
                <HamburgetMenuClose />
              </span>
            ) : (
              <span className="icon">
                <HamburgetMenuOpen />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
