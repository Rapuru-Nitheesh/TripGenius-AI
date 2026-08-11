import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/authApi";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert("Login Successful!");

      navigate("/dashboard", { replace: true });

    } catch (error) {
      alert(
        error.response?.data?.message || "Login Failed"
      );

      console.error(error);
    }
  };
  return (
    <div className="container py-5">
      <div className="row justify-content-center">

        <div className="col-md-6">

          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Welcome Back
            </h2>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remember"
                />

                <label
                  className="form-check-label"
                  htmlFor="remember"
                >
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-success w-100"
              >
                Login
              </button>

            </form>

            <p className="text-center mt-3">

              Don't have an account?

              <Link to="/register">
                {" "}
                Register
              </Link>

            </p>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;