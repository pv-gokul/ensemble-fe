/* eslint-disable react/jsx-key */
import "./styles.scss";
import { useNavigate, NavLink } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaCog,
  FaNetworkWired,
  FaHeadSideVirus,
  FaRegClone,
  FaRupeeSign,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleChangeRoute = (path) => {
    navigate(path);
  };

  const navs = [
    {
      icon: FaHome,
      path: "/home",
    },
    {
      icon: FaHeadSideVirus,
      path: "/models",
    },
    {
      icon: FaRegClone,
      path: "/templates",
    },
    {
      icon: FaNetworkWired,
      path: "/console",
    },
    {
      icon: FaRupeeSign,
      path: "/plans",
    },
  ];

  return (
    <div className="sidebar">
      {navs.map((nav) => (
        <NavLink
          to={nav.path}
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
          }
        >
          <nav.icon color="grey" size={20} />
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;
