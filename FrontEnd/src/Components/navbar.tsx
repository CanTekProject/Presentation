import { NavLink } from "react-router-dom";
import "./navbar.css";

interface NavbarProps {
  isLoggedIn: boolean;
  handleLogout: () => void;
}

const Navbar = ({ isLoggedIn, handleLogout }: NavbarProps) => {
  const logout = () => {
    handleLogout();
  };

  const logoutAndRedirect = () => {
    logout();
    window.location.href = "/home"; // Redirect to /home after logout
  };

  return (
    <nav className="navClass">
      <div className="divClass">
        {!isLoggedIn ? (
          <>
            <NavLink className="pages" to="/ForumPage">
              Forum
            </NavLink>
            <NavLink className="pages" to="/ChatPage">
              Chat
            </NavLink>
          </>
        ) : (
          <>
            <NavLink className="pages" to="/Forum">
              Forum
            </NavLink>
            <NavLink className="pages" to="/ChatLogin">
              Chat
            </NavLink>
          </>
        )}
        {!isLoggedIn ? (
          <NavLink className="pages" to="/Home">
            <img
              src="./logo.ico.png"
              alt="RR Systems"
              style={{ height: "50px", width: "auto" }}
            />
          </NavLink>
        ) : (
          <>
            <NavLink className="pages" to="/Welcome">
              <img
                src="./logo.ico.png"
                alt="RR Systems"
                style={{ height: "50px", width: "auto" }}
              />
            </NavLink>
          </>
        )}

        {!isLoggedIn ? (
          <NavLink className="pages" to="/Login">
            Login
          </NavLink>
        ) : (
          <>
            <NavLink className="pages" to="/Profile">
              Profile
            </NavLink>
            <NavLink className="pages" to="#" onClick={logoutAndRedirect}>
              Logout
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
