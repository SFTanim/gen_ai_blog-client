import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types"; // ES6
import useLocalStorage from "use-local-storage";

const AuthProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme", false);
  const name = "tanim";

  const allFunctions = {
    name,
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
