import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useHistory, NavLink } from "react-router-dom";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const history = useHistory();

  async function handleLogout(e: React.MouseEvent) {
    e.preventDefault();
    const r = await fetch(`/logout`, {
      method: "DELETE",
    });
    if (r.ok) {
      setUser(null);
      history.push("/");
    }
  }

  return (
    <nav>
      <span className="logo">introspect.</span>
      {user ? (
        <div className="navbar">
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
          <NavLink exact to="/" className="login-logout">
            login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
