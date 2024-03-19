import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";
import "./Login.css";
export const Login = () => {
  const [email, setEmail] = useState("christinam1215@yahoo.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "current_user",
          JSON.stringify({
            id: user.id,
          })
        );

        navigate("/bills");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="login-flex">
      <section className="container-login">
        <form className="form-login" onSubmit={handleLogin}>
          <h2>Log in to Bill Tracker</h2>
          <fieldset>
            <div className="form-group">
              <span className="form-label">Email</span>
            </div>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(changeEvent) => setEmail(changeEvent.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Log in
              </button>
            </div>
          </fieldset>
        </form>
        <section>
          <Link className="register-link" to="/register">
            Create an account
          </Link>
        </section>
      </section>
      <section className="login-img-container">
        <img
          className="login-img"
          src="src/images/loginImg.jpg"
          alt="photo displaying coins and bills"
        />
      </section>
    </main>
  );
};
