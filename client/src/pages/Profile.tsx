import { useState, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const [errors, setErrors] = useState([]);

  const { user, userLoaded } = useContext(UserContext);

  const history = useHistory();

  const [credentials, setCredentials] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    password: "",
    password_confirmation: "",
  });

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

    const r = await fetch(`/users/${user!.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    if (r.ok) {
      // const updatedUser = await r.json()
      // console.log(updatedUser));
      history.push("/timeline");
    } else {
      const err = await r.json();
      setErrors(err.errors);
    }
  }

  return userLoaded ? (
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
  ) : (
    <p>user not found</p>
  );
};

export default Profile;
