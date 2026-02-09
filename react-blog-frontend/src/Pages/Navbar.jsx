import { logout, isAuthenticated } from "../Auth/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg shadow-sm"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold"
          to="/"
          style={{ color: "#008080" }}
        >
          DeepDraft
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Left links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            {!isAuthenticated() && (
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  style={({ isActive }) => ({
                    background: isActive ? "#0f766e" : "transparent",
                    color: isActive ? "#ffffff" : "#0f766e",
                    border: isActive
                      ? "1px solid #0f766e"
                      : "1px solid transparent",
                    fontWeight: isActive ? "500" : "400",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    transition: "all 0.15s ease",
                    textDecoration: "none",
                  })}
                >
                  Home
                </NavLink>
              </li>
            )}

            {isAuthenticated() && (
              <li className="nav-item">

                <NavLink
                  to="/dashboard"
                  className="nav-link"
                  style={({ isActive }) => ({
                    background: isActive ? "#0f766e" : "transparent",
                    color: isActive ? "#ffffff" : "#0f766e",
                    border: isActive
                      ? "1px solid #0f766e"
                      : "1px solid transparent",
                    fontWeight: isActive ? "500" : "400",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    transition: "all 0.15s ease",
                    textDecoration: "none",
                  })}
                >
                  DashBoard
                </NavLink>
              </li>
            )}

            {isAuthenticated() && (
              <li className="nav-item">

                <NavLink
                  to="/blog"
                  className="nav-link"
                  style={({ isActive }) => ({
                    background: isActive ? "#0f766e" : "transparent",
                    color: isActive ? "#ffffff" : "#0f766e",
                    border: isActive
                      ? "1px solid #0f766e"
                      : "1px solid transparent",
                    fontWeight: isActive ? "500" : "400",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    transition: "all 0.15s ease",
                    textDecoration: "none",
                  })}
                >
                  Blogs
                </NavLink>
              </li>
            )}
          </ul>

          {/* Right actions */}
          <ul className="navbar-nav align-items-center">
            {isAuthenticated() ? (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-sm"
                  style={{
                    background: "#0f766e",
                    color: "#ffffff",
                    border: "1px solid #0f766e",
                    fontWeight: "500",
                    padding: "6px 14px",
                    borderRadius: "6px",
                    transition: "all 0.15s ease",
                  }}
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link"
                    style={({ isActive }) => ({
                      background: isActive ? "#0f766e" : "transparent",
                      color: isActive ? "#ffffff" : "#0f766e",
                      border: isActive
                        ? "1px solid #0f766e"
                        : "1px solid transparent",
                      fontWeight: isActive ? "500" : "400",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      transition: "all 0.15s ease",
                      textDecoration: "none",
                    })}
                  >
                    Login
                  </NavLink>
                </li>

                <li className="nav-item ms-2">
                  <NavLink
                    to="/register"
                    className="nav-link"
                    style={({ isActive }) => ({
                      background: isActive ? "#0f766e" : "transparent",
                      color: isActive ? "#ffffff" : "#0f766e",
                      border: isActive
                        ? "1px solid #0f766e"
                        : "1px solid transparent",
                      fontWeight: isActive ? "500" : "400",
                      padding: "6px 14px",
                      borderRadius: "6px",
                      transition: "all 0.15s ease",
                      textDecoration: "none",
                    })}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
