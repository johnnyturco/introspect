import { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

function Login() {
  const [errors, setErrors] = useState([]);

  let { user, setUser } = useContext(UserContext);

  let history = useHistory();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((r) => {
      if (r.ok) {
        r.json().then((currentUser) => setUser(currentUser));
        history.push("/timeline");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  if (user) {
    history.push("/timeline");
  }

  return (
    <main className="login-container">
      <h2>login to <span className="logo-small">introspect.</span></h2>
        <form className="login-form card" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button type="submit">login</button>
        </form>

      <div>
        <Link to="/signup">sign up</Link>
      </div>

      {errors.length ? (
        <div>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      ) : null}
    </main>
  );
}

export default Login;
