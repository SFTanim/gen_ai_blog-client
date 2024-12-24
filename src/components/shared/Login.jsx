import { Formik, Form, Field, ErrorMessage } from "formik";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import PageTitle from "./../PageTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useEffect } from "react";

const Login = () => {
  const {
    userLogin,
    googleSignIn,
    githubSignIn,
    setLoading,
    toastWarning,
    toastSuccess,
  } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

//   Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //   Google Login
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((res) => {
        const userInfo = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          photo: res?.user?.photoURL,
          role: "user",
        };
        axiosPublic.post("/users", userInfo);

        toastSuccess("Successfully logged in.");
        {
          navigate(location?.state ? location?.state : "/");
        }
      })
      .catch(() => {
        toastWarning("Login unsuccessful.");
        setLoading(false);
      });
  };

  //   Github Login
  const handleGitHubLogin = () => {
    githubSignIn()
      .then((res) => {
        const userInfo = {
          name: res?.user?.displayName,
          email: res?.user?.email,
          photo: res?.user?.photoURL,
          role: "user",
        };
        axiosPublic.post("/users", userInfo);

        toastSuccess("Successfully logged in.");
        {
          navigate(location?.state ? location.state : "/");
        }
      })
      .catch(() => {
        toastWarning("Login unsuccessful.");
        setLoading(false);
      });
  };
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
                <PageTitle heading={"Login"}></PageTitle>
              </div>
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = "*Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  userLogin(values?.email, values?.password)
                    .then(() => {
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Successfully logged in",
                        showConfirmButton: false,
                        timer: 2500,
                      });
                      navigate(location?.state ? location?.state : "/");
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
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="my-1 py-2 text-center accentColor">
                <Link to={"/signUp"} className="hyperLink">
                  Create a new account.
                </Link>
              </div>
              <div className="">
                <div className="divider divider-info my-5">Login With</div>
                {/* Login With Google and Github */}
                <div className="flex w-1/2 mx-auto justify-evenly">
                  <button onClick={handleGoogleLogin} className="text-4xl">
                    {" "}
                    <FcGoogle />{" "}
                  </button>
                  <button onClick={handleGitHubLogin} className="text-4xl">
                    {" "}
                    <FaGithub />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
