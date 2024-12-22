import { AuthContext } from "../context/AuthContext";
import PropTypes from "prop-types"; // ES6
import Swal from "sweetalert2";
import useLocalStorage from "use-local-storage";
import auth from "./../firebase/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [darkTheme, setDarkTheme] = useLocalStorage("darkTheme", false);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

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

  // Login With Google
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Login With GitHub
  const githubSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unSubscribe();
    };
  }, []);

  console.log(user);

  const allFunctions = {
    user,
    loading,
    setLoading,
    toastWarning,
    toastSuccess,
    googleSignIn,
    githubSignIn,
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
