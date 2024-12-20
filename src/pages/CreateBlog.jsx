import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PageTitle from "../components/PageTitle";
import { Formik, Form, Field, ErrorMessage } from "formik";

const CreateBlog = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {/* Animation */}
      <DotLottieReact
        src="https://lottie.host/7ee26a40-3808-4826-a1a5-de8af7083974/73w9BXYyAY.lottie"
        loop
        autoplay
        className="w-full lg:w-1/3 flex-1 mt-10 lg:mt-0"
      />

      {/* Form Section */}
      <div className="flex-1">
        <PageTitle
          heading={"Blog Creations Hub"}
          subHeading={"Create your blog effortlessly with the power of AI."}
        ></PageTitle>
        <div className="mt-2">
          <Formik
            initialValues={{ message: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.message) {
                errors.message = "*Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values.message);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  className="input input-bordered w-full min-h-32"
                  as="textarea"
                  name="message"
                />
                <div className="text-red-700 text-sm w-full flex justify-center lg:justify-end mb-2">
                  <ErrorMessage name="message" component="div" className="" />
                </div>
                <div className="flex justify-center lg:justify-end ">
                  <button
                    className="button-style "
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
