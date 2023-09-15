/* eslint-disable react/jsx-key */
import "./styles.scss";
import { useHistory } from "react-router-dom";
import { FaHome, FaSearch, FaCog, FaHeadSideVirus } from "react-icons/fa";

const Sidebar = () => {
  const history = useHistory();

  const handleChangeRoute = (path) => {
    history.push(path);
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
