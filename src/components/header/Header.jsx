import "./styles.scss";
import Logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header>
      <img src={Logo} className="logo" />
      <div className="brand">Ensemble</div>
    </header>
  );
};

export default Header;
