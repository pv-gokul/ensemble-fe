import { useState } from "react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="login">
      <div className="brand">
        <img src={Logo} className="logo" />
        <div className="title">Ensemble</div>
      </div>

      <div className="form">
        <div className="title">Sign In</div>
        <div className="info">
          Don't have an account? <span>Sign up</span>
        </div>
        <div className="fields">
          {" "}
          <input
            type="text"
            placeholder="Username"
            value="keyminds@keyvalue.systems "
          />
          <input type="password" placeholder="Password" value="12345678" />
        </div>
        <button onClick={handleLogin}>
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
        <div className="info">
          By signing up, I agree with the <span>Terms</span> and{" "}
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
