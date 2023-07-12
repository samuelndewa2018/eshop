import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getAllProductsShop, updateProduct } from "../../redux/actions/product";
import { categoriesData, conditionsData } from "../../static/data";
import axios from "axios";
import { server } from "../../server";
import Spinner from "../Spinner";
import AdminSideBar from "./Layout/AdminSidebar";
import AdminHeader from "../Layout/AdminHeader";

const editProductSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  tags: yup.string().required("Tags is required"),
  originalPrice: yup.string().required("Original Price is required"),
  discountPrice: yup.string().required("Discount Price is required"),
  stock: yup.string().required("Stock is required"),
  // condition: yup.string().required("Condition is required"),
});

const EditProduct = () => {
  // const { user } = useSelector((state) => state.user.role);
  const { success, error, product } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productId } = useParams();

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: product?.name,
      description: product?.description,
      category: product?.category,
      tags: product?.tags,
      originalPrice: product?.originalPrice,
      discountPrice: product?.discountPrice,
      stock: product?.stock,
      // condition: product?.condition,
    },
    validationSchema: editProductSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const updatedProduct = {
          productId,
          name: values.name,
          description: values.description,
          category: values.category,
          tags: values.tags,
          originalPrice: values.originalPrice,
          discountPrice: values.discountPrice,
          stock: values.stock,
          // condition: values.condition,
          images: images,
          // shopId: seller._id,
        };

        await dispatch(updateProduct(productId, updatedProduct));
        setLoading(false);
        toast.success("Product updated!");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
      // navuigate('/')
      // window.location.reload();
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product updated successfully!");
      // navigate("/dashboard");
      // window.location.reload();
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/category/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        // const response =  getAllProductsShop(productId);
        const response = await axios.get(
          `${server}/product/get-product/${productId}`
        );

        const productData = response.data.product;

        console.log("productData", productData);

        formik.setValues({
          name: productData.name,
          description: productData.description,
          category: productData.category,
          tags: productData.tags,
          originalPrice: productData.originalPrice,
          discountPrice: productData.discountPrice,
          stock: productData.stock,
          // condition: productData.condition,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchProductData();
  }, [productId]);

  const handleImageChange = (e) => {
    e.preventDefault();
    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  return (
    <div>
      <AdminHeader />
      <div className="flex items-stretch">
        <div className="w-[80px] 800px:w-[330px]">
          <AdminSideBar active={5} />
        </div>
        <div className="w-[90%] 800px:w-[50%] bg-white shadow mx-auto rounded p-6">
          <h1 className="text-2xl font-bold ">Edit Product</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter product name"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.name}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <ReactQuill
                id="description"
                name="description"
                value={formik.values.description}
                onChange={(value) => formik.setFieldValue("description", value)}
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.description}
                </p>
              )}
            </div>
            {/* Rest of the form fields */}
            <div>
              <label className="pb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                onChange={formik.handleChange("category")}
                onBlur={formik.handleBlur("category")}
                value={formik.values.category}
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="text-red-500">
                {formik.touched.category && formik.errors.category}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">Tags</label>
              <input
                type="text"
                name="tags"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product tags..."
              />
              <div className="text-red-500">
                {formik.touched.tags && formik.errors.tags}
              </div>
            </div>
            <br />
            {/* <div>
              <label className="pb-2">
                Condition<span className="text-red-500">*</span>
              </label>
              <select
                className="w-full mt-2 border h-[35px] rounded-[5px]"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.condition}
                name="condition"
              >
                <option value="Choose Product Condition">
                  Choose Product Condition
                </option>
                {conditionsData &&
                  conditionsData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
              <div className="text-red-500">
                {formik.touched.condition && formik.errors.condition}
              </div>
            </div> */}
            <br />
            <div>
              <label className="pb-2">Original Price</label>
              <input
                type="number"
                name="originalPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.originalPrice}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price..."
              />
              <div className="text-red-500">
                {formik.touched.originalPrice && formik.errors.originalPrice}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Price (With Discount) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="discountPrice"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.discountPrice}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product price with discount..."
              />
              <div className="text-red-500">
                {formik.touched.discountPrice && formik.errors.discountPrice}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Product Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="stock"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
                className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your product stock..."
              />
              <div className="text-red-500">
                {formik.touched.stock && formik.errors.stock}
              </div>
            </div>
            <br />
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name=""
                id="upload"
                className="hidden"
                multiple
                onChange={handleImageChange}
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload">
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3"
                    color="#555"
                  />
                </label>
                {images &&
                  images.map((i) => (
                    <img
                      src={URL.createObjectURL(i)}
                      key={i}
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                  ))}
              </div>
              <br />
            </div>{" "}
            <button
              disabled={loading}
              type="submit"
              className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <p className="flex">
                  <Spinner /> Updating...
                </p>
              ) : (
                <p className="">Update Product</p>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
