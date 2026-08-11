import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { registerUser } from "../api/authApi";

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if passwords match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // Check if Terms & Conditions is accepted
  if (!agree) {
    alert("Please accept the Terms & Conditions.");
    return;
  }

  try {
    const response = await registerUser({
      fullName,
      email,
      password,
    });

   alert("🎉 Registration Successful! Redirecting to Login...");

console.log(response.data);

// Clear the form
setFullName("");
setEmail("");
setPassword("");
setConfirmPassword("");
setAgree(false);

// Redirect after 1.5 seconds
setTimeout(() => {
  navigate("/login", { replace: true });
}, 500);

  } catch (error) {
    alert(error.response?.data?.message || "Registration failed");
    console.error(error);
  }
};

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">

            <h2 className="text-center mb-4">
              Create Your Account
            </h2>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="mb-3">
                <label className="form-label">
                  Full Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Email */}
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
                />
              </div>

              {/* Password */}
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
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label className="form-label">
                  Confirm Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Terms & Conditions */}
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />

                <label
                  className="form-check-label"
                  htmlFor="terms"
                >
                  I agree to the Terms & Conditions
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Create Account
              </button>

            </form>

            <p className="text-center mt-3">
              Already have an account?

              <Link to="/login">
                {" "}
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;