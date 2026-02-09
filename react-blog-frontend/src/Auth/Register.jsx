import { useState } from "react";
import { register } from "./AuthService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(form);
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f4fafa" }}
    >
      <div className="card shadow-lg border-0" style={{ width: "380px" }}>
        <div
          className="card-header text-center text-white"
          style={{
            background: "linear-gradient(135deg, #008080, #20b2aa)",
          }}
        >
          <h4 className="mb-0">Create Account</h4>
          <small>Join us today</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>

<div className="mb-4">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Your Email Id"
                onChange={handleChange}
                required
              />
            </div>

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

            <div className="mb-4">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Create a strong password"
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="btn w-100 text-white"
              style={{
                background: "linear-gradient(135deg, #008080, #20b2aa)",
                border: "none",
              }}
            >
              Register
            </button>
          </form>
        </div>

        <div className="card-footer text-center bg-light">
          <small>
            Already have an account?{" "}
            <span
              className="fw-semibold"
              style={{ color: "#008080", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;
