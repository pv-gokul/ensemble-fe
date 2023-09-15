/* eslint-disable react/jsx-key */
import "./styles.scss";
import { FaHome, FaSearch, FaCog } from "react-icons/fa";
import { useHistory } from "react-router-dom";

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
      icon: FaSearch,
      path: "/models",
    },
    {
      icon: FaCog,
      path: "/configuration",
    },
  ];

  return (
    <div className="sidebar">
      {navs.map((nav) => (
        <span onClick={() => handleChangeRoute(nav.path)}>
          <nav.icon color="grey" size={20} />
        </span>
      ))}
    </div>
  );
};

export default Sidebar;
