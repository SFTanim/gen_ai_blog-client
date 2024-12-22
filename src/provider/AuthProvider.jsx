import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types"; // ES6
import Swal from "sweetalert2";
import useLocalStorage from "use-local-storage";

const AuthProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme", false);

  const toastWarning = (text) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: text,
    });
  };

  const toastSuccess = (text) => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: text,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  


  const allFunctions = {
    toastWarning,
    toastSuccess,
    darkTheme,
    setDarkTheme,
  };
  return (
    <AuthContext.Provider value={allFunctions}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
