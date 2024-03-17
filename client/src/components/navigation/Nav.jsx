import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {user ? (
          <>
            <NavLink className="logo" to="/dashboard">
              EventBrite
            </NavLink>
            <NavLink className="nav-childs" to="/myevents">
              My Events
            </NavLink>
            <NavLink to="/hostevent">
                Host Event
            </NavLink>
            <NavLink className="nav-childs" to="/about">
              About
            </NavLink>
            <NavLink className="nav-childs" to="/" onClick={handleLogout}>
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="logo" to="/">
              EventBrite
            </NavLink>
            <NavLink className="nav-childs" to="/about">
              About
            </NavLink>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
