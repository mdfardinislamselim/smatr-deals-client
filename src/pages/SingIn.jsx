import React from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const SingIn = () => {
  return (
    <div className=" flex py-20 items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-center text-gray-600 mb-6">
          Don’t have an account?{" "}
          <Link
            to={"/register"}
            className="text-[#632EE3] hover:underline font-medium"
          >
            Register Now
          </Link>
        </p>

        <form>
          {/* Email Input */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>

          {/* Password Input */}
          <div className="form-control mb-2">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              className="input input-bordered w-full"
            />
            <label className="label">
              <a className="label-text-alt text-sm text-[#632EE3] hover:underline">
                Forgot password?
              </a>
            </label>
          </div>

          {/* Sign In Button */}
          <button className="w-full btn-primary">Sign In</button>
        </form>

        {/* OR divider */}
        <div className="divider text-gray-500 text-sm mt-6 mb-4">OR</div>

        {/* Google Sign In */}
        <button
          className="w-full py-3 rounded-md border border-gray-300 font-medium flex items-center justify-center gap-2 
                     hover:bg-gray-100 transition-all duration-300 cursor-pointersfFASDFasdfADFGasdfASDFasdfASDFasdfASDFasdfAQSDFasedfASDF"
        >
          <FcGoogle className="text-xl" />
          Sign In With Google
        </button>
      </div>
    </div>
  );
};

export default SingIn;
