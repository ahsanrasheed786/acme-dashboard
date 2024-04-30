import  { useContext, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { HamburgetMenuClose, HamburgetMenuOpen } from "./Icons";
import axios from "axios";
import toast from "react-hot-toast";
import { context } from "../../main";
import { myServerUrl } from "../../App";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Blogs", path: "/allblogs" },
  { name: "Attendance", path: "/attendance" },
  { name: "About", path: "/About" },
  { name: "CaseStudy", path: "/casestudy" },
];

function NavBar() {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { isAuthenticated, setIsAuthenticated, loading, setLoading, userProfile, profilebtn, setProfilebtn } = useContext(context);

  const handleClick = () => setClick(!click);

  // const logoutHandler = async () => {
  //   try {
  //     setLoading(true);
  //     const logout = await axios.get(`${myServerUrl}api/user/logout`, { withCredentials: true });
  //     toast.success(logout.data.message);
  //     setIsAuthenticated(false);
  //     navigate('/login');
  //   } catch (error) {
  //     setIsAuthenticated(true);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container flex justify-between items-center">
          <NavLink exact={true.toString()} to="/" className="nav-logo">
            <span className="icon font-bold text-lg">Dashboard</span>
          </NavLink>
          <div className="flex items-center">
            <ul className={click ? "nav-menu active flex" : "nav-menu flex"}>
              {navigation.map((nav, i) => (
                <li key={i} className="nav-item">
                  <NavLink exact={true.toString()} to={nav.path} activeClassName="active" className="nav-links" onClick={handleClick}>
                    {nav.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <button onClick={() => setProfilebtn(!profilebtn)} className="ml-4">
              {userProfile ? <img className="w-[60px] h-fit rounded-full" src={userProfile.image} alt="" /> : ''}
            </button>
          </div>
          <div className="nav-icon" onClick={handleClick}>
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
