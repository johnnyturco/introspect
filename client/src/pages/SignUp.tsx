import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useHistory } from "react-router-dom";

const SignUp = () => {
  const [errors, setErrors] = useState([]);

  let { setUser } = useContext(UserContext);

  const [credentials, setCredentials] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  let history = useHistory();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const r = await fetch(`/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (r.ok) {
      const currentUser = await r.json();
      setUser(currentUser);
      history.push("/timeline");
    } else {
      const err = await r.json();
      setErrors(err.errors);
    }
  }

  return (
    <main className="signup-container fade-in-fwd">
      <h2>
        sign up for <span className="logo-small">introspect.</span>
      </h2>
      <form className="signup-form card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          placeholder="first name"
          value={credentials.first_name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="last_name"
          placeholder="last name"
          value={credentials.last_name}
          onChange={handleChange}
        />
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
        <input
          type="password"
          name="password_confirmation"
          placeholder="confirm password"
          value={credentials.password_confirmation}
          onChange={handleChange}
        />
        <button type="submit">sign up</button>
      </form>

      {errors.length ? (
        <div>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      ) : null}
    </main>
  );
};

export default SignUp;
