import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";


const Register = () => {
  const { createUser, googleSignIn } = useContext(AuthContext);

  const handelRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photo.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const createdUser = result.user;
        console.log(createdUser);
      })
      .catch((error) => {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email already in use. Try logging in.");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Invalid email address.");
        } else {
          toast.error(error.message || "Signup failed. Please try again.");
        }
      });
  };

  // ✅ Handle Google signup
  const handleGoogleSignIn = () => {
    if (!googleSignIn) {
      toast.error("Google Sign-In not configured.");
      return;
    }
    googleSignIn()
      .then((result) => {
        toast.success("Signed in with Google!");
        console.log(result.user);
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className="flex py-20 items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-2">Register Now!</h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-[#632EE3] hover:underline font-medium"
          >
            Login Now
          </Link>
        </p>

        <form onSubmit={handelRegister}>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Mariam Swarna"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Image URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md text-white font-semibold bg-gradient-to-r from-[#632EE3] to-[#9F62F2] 
                     transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:shadow-[#632EE3]/30"
          >
            Sign Up
          </button>
        </form>

        <div className="divider text-gray-500 text-sm mt-6 mb-4">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full py-3 rounded-md border border-gray-300 font-medium flex items-center justify-center gap-2 
                   hover:bg-gray-100 transition-all duration-300 cursor-pointer"
        >
          <FcGoogle className="text-xl" />
          Sign Up With Google
        </button>
      </div>
    </div>
  );
};

export default Register;
