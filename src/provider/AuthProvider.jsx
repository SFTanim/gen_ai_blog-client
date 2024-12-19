import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types"; // ES6


const AuthProvider = ({ children }) => {
  const name = "tanim";

  const allFunctions = {
    name,
  };
  return (
    <AuthContext.Provider value={allFunctions}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.object,
};

export default AuthProvider;
