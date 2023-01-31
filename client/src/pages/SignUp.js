import { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useHistory } from 'react-router-dom';

function SignUp() {

  const [ errors, setErrors ] = useState([]);

  let { setUser } = useContext(UserContext);

  const [ credentials, setCredentials ] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })

  let history = useHistory();

  function handleChange(e) {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials, [e.target.name]: e.target.value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((currentUser) => setUser(currentUser));
          history.push("/timeline");
        } else {
          r.json().then((err) => setErrors(err.errors));
        }
      }, []);
  }

  return (
    <div>
      <h1>Sign Up for Introspect</h1>
      <form onSubmit={handleSubmit}>
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

      {errors ? (
        <div>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default SignUp;