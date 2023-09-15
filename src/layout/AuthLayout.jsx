import "./styles.scss";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";

const AuthLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Sidebar />
        <div className="content">{children}</div>
      </main>
    </div>
  );
};

export default AuthLayout;
