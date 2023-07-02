import React, { useState } from "react";
import axios from "axios";
import { server } from "../../server";
import Header from "../Layout/Header";
import { useFormik } from "formik";
import * as yup from "yup";
import Spinner from "../Spinner";
import Footer from "../Layout/Footer";
import { toast } from "react-toastify";

const carouselSchema = yup.object({
  imageUrl: yup.string().required("Image Url is required"),
  caption: yup.string().required("Caption is required"),
});

const CreateCarouselPage = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      imageUrl: "",
      caption: "",
    },
    validationSchema: carouselSchema,
    onSubmit: async (values) => {
      const imageUrl = values.imageUrl;
      const caption = values.caption;

      setLoading(true);
      try {
        await axios.post(`${server}/carousel/carousel`, {
          imageUrl,
          caption,
        });
        setLoading(false);
        setSuccess(true);
        setError(false);
        toast.success("Carousel created sucessfully");
        setSuccessMessage("Carousel created sucessfully");
      } catch (error) {
        toast.error("Carousel created failed");
        setLoading(false);
        setError(true);
        setSuccess(false);
        setErrorMessage("Carousel created failed");
      }
      setLoading(false);
    },
  });
  console.log(success);
  return (
    <div>
      <Header />
      <div
        className="bg-gray-50 flex flex-col justify-center py-1 sm:px-6 lg:px-8 mb-1"
        style={{ margin: "0 20px" }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a carousel
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 text-center mb-2 rounded relative"
                role="alert"
              >
                <p>{errorMessage}</p>
              </div>
            )}
            {success && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-1 py-1 text-center mb-2 rounded relative"
                role="alert"
              >
                <p>{successMessage}</p>
              </div>
            )}
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label
                  htmlFor="imageUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Image URL:
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  onChange={formik.handleChange("imageUrl")}
                  onBlur={formik.handleBlur("imageUrl")}
                  value={formik.values.imageUrl}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <div className="text-red-500 text-xs">
                  {formik.touched.imageUrl && formik.errors.imageUrl}
                </div>
              </div>
              <div>
                <label
                  htmlFor="caption"
                  className="block text-sm font-medium text-gray-700"
                >
                  Caption:
                </label>
                <textarea
                  type="text"
                  id="caption"
                  onChange={formik.handleChange("caption")}
                  onBlur={formik.handleBlur("caption")}
                  value={formik.values.caption}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                ></textarea>
                <div className="text-red-500 text-xs">
                  {formik.touched.caption && formik.errors.caption}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group mt-3 relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? (
                    <p className="flex">
                      <Spinner /> creating...
                    </p>
                  ) : (
                    <p className="">Create</p>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateCarouselPage;
