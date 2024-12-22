import { Formik, Form, Field, ErrorMessage } from "formik";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import PageTitle from "./../PageTitle";
import { Link } from "react-router-dom";

const Login = () => {
  const handleGoogleLogin = () => {};
  const handleGitHubLogin = () => {};
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
                    errors.email = "Required";
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
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                  }, 400);
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
                    <ErrorMessage name="email" component="div" />

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