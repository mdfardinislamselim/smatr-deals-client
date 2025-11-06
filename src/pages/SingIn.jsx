import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, setUser, googleSignIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const getErrorMessage = (code) => {
    if (!code) return "Login failed. Please try again.";

    const c = code.toLowerCase().trim();

    if (c === "auth/user-not-found") {
      return "No user found with this email.";
    } else if (c === "auth/wrong-password") {
      return "Incorrect password. Please try again.";
    } else if (c === "auth/invalid-email") {
      return "Invalid email address.";
    } else if (c === "auth/user-disabled") {
      return "This user has been disabled.";
    } else {
      return "Login failed. Please try again.";
    }
  };

  // Handle normal email/password login
  const handelLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast.success("Login successful!");
        navigate(location.state || "/");
      })
      .catch((error) => {
        const code = error.code;
        const message = getErrorMessage(code);
        toast.error(message);
      });
  };

  // Handle Google login
  const handleGoogleSignIn = () => {
    if (!googleSignIn) {
      toast.error("Google Sign-In not configured.");
      return;
    }
    googleSignIn()
      .then((result) => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        fetch("http://localhost:3000/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to save user");
            return res.json();
          })
          .then(() => {
            // console.log("✅ Data after user save:", data);
          })
          .catch(() => {
            // toast.error("❌ Error saving user:", error);
          });

        toast.success("Singin successful!");
        navigate(location.state || "/");
        console.log(result.user);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex py-20 items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-center text-gray-600 mb-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[#632EE3] hover:underline font-medium"
          >
            Register Now
          </Link>
        </p>

        {/* LOGIN FORM */}
        <form onSubmit={handelLogin}>
          {/* Email Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password Input */}
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="input input-bordered w-full pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-sm text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <label className="label">
              <a className="label-text-alt text-sm text-[#632EE3] hover:underline cursor-pointer">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="w-full btn-primary">
            Sign In
          </button>
        </form>

        {/* OR divider */}
        <div className="divider text-gray-500 text-sm mt-6 mb-4">OR</div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 rounded-md border border-gray-300 font-medium flex items-center justify-center gap-2 
                     hover:bg-gray-100 transition-all duration-300 cursor-pointer"
        >
          <FcGoogle className="text-xl" />
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
