import { Navigate, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "You have to login first....",
      showConfirmButton: false,
      timer: 1500,
    });
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoute;
