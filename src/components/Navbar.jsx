import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handelSingOut = () => {
    logOut()
      .then(() => toast.success("Logout successful!"))
      .catch((error) => toast.error(error.message));
  };

  const linck = (
    <>
      <li className="font-bold">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="font-bold">
        <NavLink to="all-products">All Adds</NavLink>
      </li>
      {user && (
        <>
          <li className="font-bold">
            <NavLink to="my-products">My Adds</NavLink>
          </li>
          <li className="font-bold">
            <NavLink to="my-bids">My Bids</NavLink>
          </li>
          <li className="font-bold">
            <NavLink to="add-product">Create Add</NavLink>
          </li>
        </>
      )}
    </>
  );


  return (
    <nav className="bg-base-100 shadow-sm">
      <div className="navbar container mx-auto px-4">
        {/* Left section */}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {linck}
            </ul>
          </div>
          <Link to="/" className="font-bold text-4xl">
            Smart<span className="gradient-text">Deals</span>
          </Link>
        </div>

        {/* Middle section */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6">{linck}</ul>
        </div>

        {/* Right section */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src={"https://i.ibb.co/4pDNDk1/avatar.png"}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3  p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/profile" className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="btn-primary mt-1" onClick={handelSingOut}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="signin" className="btn-secondary">
                Login
              </Link>
              <Link to="register" className="btn-primary">
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
