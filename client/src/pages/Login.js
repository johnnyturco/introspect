import { useContext, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { UserContext } from '../context/UserProvider';

function Login() {

  const [ errors, setErrors ] = useState([])

  let { user, setUser } = useContext(UserContext);

  let history = useHistory();

  const [ credentials, setCredentials ] = useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials, [e.target.name]: e.target.value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(`/login`, {
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

  return !user ? (
    <div>
      <h1>Login to Introspect</h1>
      <form onSubmit={handleSubmit}>
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

      {errors ? (
        <div>
          {errors.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      ) : null}
    </div>
  ) : history.push("/timeline")
}

export default Login;