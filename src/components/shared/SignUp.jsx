import { Formik, Form, Field, ErrorMessage } from "formik";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PageTitle from "./../PageTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const SignUp = () => {
  const { createUser, toastWarning } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const upperCaseCheck = /(?=.*[A-Z])/;
  const lowerCaseCheck = /(?=.*[a-z])/;

  //   Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="hero">
        <div className="flex w-full flex-col-reverse lg:flex-row justify-evenly items-center">
          {/* Animation Side */}
          <div className="flex-1">
            <DotLottieReact
              src="https://lottie.host/060d9670-1e92-4f07-a1e1-6128e6955733/HwSLbEoZO0.lottie"
              loop
              autoplay
              className=""
            />
          </div>

          {/* Form Side */}
          <div className="flex-1 flex mr-0 lg:mr-20 max-w-md">
            <div className="card bg-base-100 shrink-0 shadow-2xl p-6 w-full">
              <div className="self-center">
                <PageTitle heading={"SignUp"}></PageTitle>
              </div>
              <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.name) {
                    errors.name = "*Name Required";
                  }
                  if (!values.email) {
                    errors.email = "*Email Required";
                  }
                  if (!values.password) {
                    errors.password = "*Password Required";
                  }
                  if (!lowerCaseCheck.test(values.password)) {
                    errors.password =
                      "Must have an Lowercase letter in the password";
                  }
                  if (!upperCaseCheck.test(values.password)) {
                    errors.password =
                      "Must have an Uppercase letter in the password";
                  }
                  if (values.password.length < 6) {
                    errors.password =
                      "You Must have at least 6 letters in your password";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const userData = {
                    name: values?.name,
                    email: values?.email,
                    photo: values?.photoURL,
                    role: "user",
                  };
                  axiosPublic
                    .post("/users", userData)
                    .then((res) => {
                      if (res.data.insertedId) {
                        createUser(values?.email, values?.password).then(() => {
                          updateProfile(auth?.currentUser, {
                            displayName: values?.name,
                            photoURL: values?.photoURL,
                          });
                        });
                        navigate(location?.state ? location?.state : "/");
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Welcome",
                          showConfirmButton: false,
                          timer: 2500,
                        });
                      } else {
                        Swal.fire({
                          position: "top-end",
                          icon: "error",
                          title: res.data.message,
                          showConfirmButton: false,
                          timer: 2500,
                        });
                      }
                    })
                    .catch((error) => {
                      if (error?.code == "auth/invalid-email") {
                        toastWarning("Please provide a valid email");
                      }
                      if (error?.code == "auth/invalid-credential") {
                        toastWarning("Please provide a valid Password");
                      }
                    });
                  setSubmitting(false);
                }}
              >
                {({ isSubmitting }) => (
                  <Form>
                    {/* Name */}
                    <label className="label">
                      <span className="text-xl">Name</span>
                    </label>
                    <Field
                      className="input input-bordered w-full "
                      type="text"
                      name="name"
                    />
                    <div className="text-red-600 text-right">
                      <ErrorMessage name="name" component="div" />
                    </div>

                    {/* Email */}
                    <label className="label">
                      <span className="text-xl">Email</span>
                    </label>
                    <Field
                      className="input input-bordered w-full "
                      type="email"
                      name="email"
                    />
                    <div className="text-red-600 text-right">
                      <ErrorMessage name="email" component="div" />
                    </div>

                    {/* photoURL */}
                    <label className="label">
                      <span className="text-xl">PhotoURL</span>
                    </label>
                    <Field
                      className="input input-bordered w-full "
                      type="text"
                      name="photoURL"
                    />

                    {/* Password */}
                    <label className="label">
                      <span className="text-xl">Password</span>
                    </label>
                    <Field
                      className="input input-bordered w-full "
                      type="password"
                      name="password"
                    />
                    <ErrorMessage name="password" component="div" />

                    {/* Submit Button */}
                    <button
                      className="button-style mt-3 w-full"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Signup
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="my-1 py-2 text-center accentColor">
                <Link to={"/login"} className="hyperLink">
                  Already have an account.
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
