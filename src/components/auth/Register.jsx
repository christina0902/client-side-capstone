import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, getUserByEmail } from "../../services/userService";
import { Link } from "react-router-dom";

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
  });

  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "current_user",
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate("/bills");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        window.alert("Account with that email address already exists");
      } else {
        registerNewUser();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="register-page">
      <form className="form-login register-login" onSubmit={handleRegister}>
        <h2>Create your account</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="text"
              id="fullName"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Sign up
            </button>
          </div>
        </fieldset>
      </form>
      <section className="register-link-container">
        <Link className="register-link register-link-secondary" to="/login">
          Log in instead
        </Link>
      </section>
    </main>
  );
};
