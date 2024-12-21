import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import PageTitle from "../components/PageTitle";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useAxiosPublic from "./../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const axiosPublic = useAxiosPublic();
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const {
    data: aiData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["aiData", input],
    queryFn: async () => {
      const res = await axiosPublic.post("/api/suggest", { input });
      return res.data;
    },
    enabled: !!input,
  });

  const handleBlogPost = () => {
    const data = {
      title: aiData.title,
      subtitle: aiData.subtitle,
      description: aiData.description,
      userEmail: "sdfkkd@gamil.com",
      userImage: "sfdksdfkdsjk",
    };
    Swal.fire({
      title: "Are you sure you want to post it?",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Discard",
      confirmButtonText: "Post it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .post("/blogs", data)
          .then((res) => {
            if (res?.data?.acknowledged) {
              navigate("/");
              Swal.fire({
                title: "Done",
              });
            }
          })
          .catch((err) =>
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message,
              footer: '<a href="#">Why do I have this issue?</a>',
            })
          );
      }
    });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center">
      {/* LottoImage */}
      <DotLottieReact
        src="https://lottie.host/7ee26a40-3808-4826-a1a5-de8af7083974/73w9BXYyAY.lottie"
        loop
        autoplay
        className="w-full lg:w-1/3 flex-1 mt-16 lg:mt-0 h-full "
      />

      {/* Form Side */}
      <div className="flex-1">
        <PageTitle
          heading={"Blog Creations Hub"}
          subHeading={
            "Type a paragraph about your blog topic or idea, and we'll generate a catchy title and description for you!"
          }
        ></PageTitle>
        <div className="mt-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <div className="skeleton h-32 w-full"></div>
              <div className="skeleton h-4 w-28"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ) : isError ? (
            // Error State
            <div className="text-red-500 text-center">
              <div role="alert" className="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p>
                  Something went wrong while generating suggestions.
                  {error?.response?.data?.error ? (
                    <p>{error.response.data.error}</p>
                  ) : (
                    <p>{error?.message || "An unexpected error occurred."}</p>
                  )}
                </p>
                <button
                  onClick={() => {
                    setInput(null);
                    refetch();
                  }}
                  className="button-style"
                >
                  Reload
                </button>
              </div>
            </div>
          ) : aiData ? (
            <div className="flex  flex-col gap-4">
              <div className="flex  flex-col gap-4 min-h-full">
                <div className="card bg-base-100 h-full shadow-xl">
                  <div className="p-6 space-y-2">
                    <h2 className="text-lg lg:text-2xl font-semibold">
                      {aiData?.title}
                    </h2>
                    <p className="text-xs lg:text-base">{aiData?.subtitle}</p>
                    <p className="font-medium text-wrap">
                      {aiData?.description}
                    </p>
                    <div className="card-actions">
                      <button
                        onClick={() => {
                          handleBlogPost();
                        }}
                        className="button-style"
                      >
                        Post this
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
                      <ErrorMessage
                        name="message"
                        component="div"
                        className=""
                      />
                    </div>
                    <div className="flex justify-center lg:justify-end">
                      <button
                        className="button-style w-full"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Generate with AI
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
