import React, { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="">
        {/* <Loading></Loading> */}
        loading
      </div>
    );
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate state={location?.pathname} to="/signin"></Navigate>;
};

export default PrivateRoute;
