import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navigation-bar">
      <ul className="navbar">
        <img
          className="logo"
          src="src/images/navbar-logo.png"
          alt="bill logo"
        />
        <li className="navbar-item">
          <Link className="navbar-link" to="/bills">
            Bills
          </Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/accounts">
            Accounts
          </Link>
        </li>
        {localStorage.getItem("current_user") ? (
          <li className="navbar-item navbar-logout">
            <Link
              className="navbar-link"
              to=""
              onClick={() => {
                localStorage.removeItem("current_user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};
