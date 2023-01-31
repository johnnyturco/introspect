import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { useHistory, NavLink } from 'react-router-dom';

function NavBar() {

  let { user, setUser } = useContext(UserContext);

  let history = useHistory()

  function handleLogout() {
    fetch(`/logout`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null)
      }
    }, []);
  }

  return (
    <nav>
      {user ? (
        <>
          <section>
            <NavLink exact to="/new">new</NavLink>
            <NavLink exact to="/timeline">timeline</NavLink>
            <NavLink exact to="/tags">tags</NavLink>
            <NavLink exact to="/trends">trends</NavLink>
          </section>
          <section>
            <NavLink exact to="/" onClick={handleLogout}>logout</NavLink>
            <NavLink exact to="/profile">profile</NavLink>
          </section>
        </>
        )

      : (
        <NavLink exact to="/" onClick={history.push("/")}>login</NavLink>
        )
      }
    </nav>
  )
}

export default NavBar;