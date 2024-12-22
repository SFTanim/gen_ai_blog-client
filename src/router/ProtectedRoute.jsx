import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PropTypes } from "prop-types";
import Swal from "sweetalert2";

const ProtectedRoute = ({ childern }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <>
        <span className="loading loading-ring loading-xs"></span>
        <span className="loading loading-ring loading-sm"></span>
        <span className="loading loading-ring loading-md"></span>
        <span className="loading loading-ring loading-lg"></span>
      </>
    );
  }
  if (!user) {
    Swal.fire({
        position: "top-end",
        title: "You have to login first....",
        showConfirmButton: false,
        timer: 1500
      });
    return <Navigate state={location.pathname} to={"/login"}></Navigate>;
  }
  return childern;
};

ProtectedRoute.propTypes = {
  childern: PropTypes.object,
};

export default ProtectedRoute;
