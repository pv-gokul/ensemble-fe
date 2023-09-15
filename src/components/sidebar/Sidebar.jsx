/* eslint-disable react/jsx-key */
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCog, FaHeadSideVirus, FaRegClone  } from "react-icons/fa";

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
      icon: FaCog,
      path: "/console",
    },
    {
      icon: FaRegClone,
      path: "/templates",
    },
  ];

  return (
    <div className="sidebar">
      {navs.map((nav) => (
        <span key={nav.path} onClick={() => handleChangeRoute(nav.path)}>
          <nav.icon color="grey" size={20} />
        </span>
      ))}
    </div>
  );
};

export default Sidebar;
