import { useState } from "react";
import { login } from "./AuthService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await login(form);
    localStorage.setItem("token", response.data);

    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f4fafa" }}
    >
      <div className="card shadow-lg border-0" style={{ width: "380px" }}>
        {/* Header */}
        <div
          className="card-header text-center text-white"
          style={{
            background: "linear-gradient(135deg, #008080, #20b2aa)",
          }}
        >
          <h4 className="mb-0">Welcome Back</h4>
          <small>Login to your account</small>
        </div>

        {/* Body */}
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                placeholder="Enter your username"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="showPassword"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label" htmlFor="showPassword">
                Show password
              </label>
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{
                background: "linear-gradient(135deg, #008080, #20b2aa)",
                border: "none",
              }}
            >
              Login
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="card-footer text-center bg-light">
          <small>
            Don’t have an account?{" "}
            <span
              className="fw-semibold"
              style={{ color: "#008080", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
