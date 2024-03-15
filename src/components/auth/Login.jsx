import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserByEmail } from "../../services/userService";

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
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Bill Tracker</h1>
          <h2>Sign in</h2>
          <fieldset>
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
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        New to Bill Tracker?
        <Link to="/register">Create an account.</Link>
      </section>
    </main>
  );
};
