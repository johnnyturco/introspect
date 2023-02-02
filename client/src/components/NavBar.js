import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useHistory, NavLink } from "react-router-dom";

function NavBar() {
  let { user, setUser } = useContext(UserContext);

  let history = useHistory();

  function handleLogout() {
    fetch(`/logout`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    }, []);
  }

  return (
    <nav>
      <span className="logo">introspect.</span>
      {user ? (
        <div className="navbar">
          {/* <NavLink exact to="/new">
            new
          </NavLink> */}
          <NavLink exact to="/timeline">
            timeline
          </NavLink>
          <NavLink exact to="/tags">
            tags
          </NavLink>
          <NavLink exact to="/trends">
            trends
          </NavLink>
          <NavLink exact to="/" onClick={handleLogout} className="login-logout">
            logout
          </NavLink>
          <NavLink exact to="/profile">
            profile
          </NavLink>
        </div>
      ) : (
        <div className="navbar">
          <NavLink
            exact
            to="/"
            onClick={history.push("/")}
            className="login-logout"
          >
            login
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
