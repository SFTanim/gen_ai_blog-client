import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PageTitle from "../components/PageTitle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const CreateBlog = () => {
  const axiosPublic = useAxiosPublic();
  const [input, setInput] = useState("");
  const [aiData, setAiData] = useState([]);

  useEffect(() => {
    if (input) {
      const fetchData = async () => {
        const res = await axiosPublic.post("/api/suggest", {
          input,
        });
        console.log("response from fetching: ", res);
        if (res?.data) {
          console.log(res?.data?.title);
          console.log(res?.data?.description);
          setAiData(aiData);
        }
      };
      fetchData();
    }
  }, [input, axiosPublic, aiData]);

  console.log(aiData);

  return (
    <div className="flex flex-col-reverse lg:flex-row">
      {/* Animation */}
      <DotLottieReact
        src="https://lottie.host/7ee26a40-3808-4826-a1a5-de8af7083974/73w9BXYyAY.lottie"
        loop
        autoplay
        className="w-full lg:w-1/3 flex-1 mt-16 lg:mt-0"
      />

      {/* Form Section */}
      <div className="flex-1">
        <PageTitle
          heading={"Blog Creations Hub"}
          subHeading={
            "Type a paragraph about your blog topic or idea, and we'll generate a catchy title and description for you!"
          }
        ></PageTitle>
        <div className="mt-2">
          <Formik
            initialValues={{ message: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.message) {
                errors.message = "*Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setInput(values?.message);
              console.log(values?.message);
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  className="input input-bordered w-full min-h-32 pt-2"
                  as="textarea"
                  name="message"
                  placeholder="Enter a paragraph about your blog topic..."
                />
                <div className="text-red-700 text-sm w-full flex justify-center lg:justify-end mb-2">
                  <ErrorMessage name="message" component="div" className="" />
                </div>
                <div className="flex justify-center lg:justify-end">
                  <button
                    className="button-style w-full"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Generate with AI {/* Updated button text */}
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
