import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useHistory } from "react-router-dom";

function Profile() {
  const [errors, setErrors] = useState([]);

  let { user } = useContext(UserContext);

  let history = useHistory();

  const [credentials, setCredentials] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    password: "",
    password_confirmation: "",
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

    fetch(`/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }).then((r) => {
      if (r.ok) {
        // r.json().then((updatedUser) => console.log(updatedUser));
        history.push("/timeline");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <main className="profile-container fade-in-fwd">
      <h2>update profile</h2>
      <form className="profile-form card" onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={credentials.first_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="last_name"
          value={credentials.last_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="new password"
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

        <button type="submit">update</button>
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
}

export default Profile;
