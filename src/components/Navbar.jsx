import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const handelSingOut = () => {
    logOut()
      .then(toast.success("Logout successful!"))
      .catch((error) => toast.error(error.message));
  };
  const linck = (
    <>
      <li className="font-bold">
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to={"add-product"}>All Adds</NavLink>
      </li>
      {user && (
        <>
          <li className="font-bold">
            <NavLink to={"my-products"}>My Adds</NavLink>
          </li>
          <li className="font-bold">
            <NavLink to={"my-bids"}>My Bids</NavLink>
          </li>
          <li className="font-bold">
            <NavLink to={"add-product"}>Create Add</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <nav className="bg-base-100 shadow-sm">
      <div className="navbar container mx-auto px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {linck}
            </ul>
          </div>
          <Link className="font-bold text-4xl">
            Smart<span className="gradient-text">Deals</span>{" "}
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 ">{linck}</ul>
        </div>
        <div className="navbar-end flex gap-3 ">
          {user ? (
            <button onClick={handelSingOut} className="btn-primary">
              sing Out
            </button>
          ) : (
            <div>
              <Link to={"signin"} className="btn-secondary">
                Login
              </Link>
              <Link to={"register"} className="btn-primary">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
