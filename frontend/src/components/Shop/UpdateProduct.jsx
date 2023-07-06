import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as yup from "yup";
import { toast } from "react-toastify";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { getProduct, updateProduct } from "../../redux/actions/product";
import { categoriesData, conditionsData } from "../../static/data";
import DashboardSideBar from "./Layout/DashboardSideBar";
import DashboardHeader from "./Layout/DashboardHeader";
import axios from "axios";
import { server } from "../../server";

const editProductSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  tags: yup.string().required("Tags is required"),
  originalPrice: yup.string().required("Original Price is required"),
  discountPrice: yup.string().required("Discount Price is required"),
  stock: yup.string().required("Stock is required"),
  condition: yup.string().required("Condition is required"),
});

const EditProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error, product } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { productId } = useParams();

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: product?.name,
      description: product?.description,
      category: product?.category,
      tags: product?.tags,
      originalPrice: product?.originalPrice,
      discountPrice: product?.discountPrice,
      stock: product?.stock,
      condition: product?.condition,
    },
    validationSchema: editProductSchema,
    onSubmit: async (values) => {
      const updatedProduct = {
        productId,
        name: values.name,
        description: values.description,
        category: values.category,
        tags: values.tags,
        originalPrice: values.originalPrice,
        discountPrice: values.discountPrice,
        stock: values.stock,
        condition: values.condition,
        images: images,
        shopId: seller._id,
      };
      dispatch(updateProduct(productId, updatedProduct));
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product updated successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${server}/category/categories`); // Replace "/api/categories" with the actual API endpoint for retrieving categories
        setCategories(response.data); // Update the categories state with the fetched data
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await getProduct(productId);
        const productData = response.data;
        formik.setValues({
          name: productData.name,
          description: productData.description,
          category: productData.category,
          tags: productData.tags,
          originalPrice: productData.originalPrice,
          discountPrice: productData.discountPrice,
          stock: productData.stock,
          condition: productData.condition,
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
      <DashboardHeader />
      <div className="flex items-stretch">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>

        <div className="my-4">
          <label className="text-lg font-bold">Product Description</label>
          <ReactQuill
            name="description"
            onChange={(value) => formik.setFieldValue("description", value)}
            value={formik.values.description}
            className="mt-2"
          />
          {formik.touched.description && formik.errors.description && (
            <div className="text-red-500">{formik.errors.description}</div>
          )}
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
                className={`mt-1 block w-full ${
                  formik.errors.name ? "border-red-500" : "border-gray-300"
                }`}
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
            <div>
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
            </div>
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
            </div>

            {/* You can use the same format as above for each field */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;

//   return (
//     <div>
//       <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
//         <div className="my-4">
//           <label className="text-lg font-bold">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             onChange={formik.handleChange}
//             value={formik.values.name}
//             className="w-full border border-gray-300 p-2 rounded-md"
//             placeholder="Enter product name..."
//           />
//           {formik.touched.name && formik.errors.name && (
//             <div className="text-red-500">{formik.errors.name}</div>
//           )}
//         </div>

//         <div className="my-4">
//           <label className="text-lg font-bold">Product Description</label>
//           <ReactQuill
//             name="description"
//             onChange={(value) => formik.setFieldValue("description", value)}
//             value={formik.values.description}
//             className="mt-2"
//           />
//           {formik.touched.description && formik.errors.description && (
//             <div className="text-red-500">{formik.errors.description}</div>
//           )}
//         </div>

//         <div className="my-4">
//           <label className="text-lg font-bold">Product Category</label>
//           <input
//             type="text"
//             name="category"
//             onChange={formik.handleChange}
//             value={formik.values.category}
//             className="w-full border border-gray-300 p-2 rounded-md"
//             placeholder="Enter product category..."
//           />
//           {formik.touched.category && formik.errors.category && (
//             <div className="text-red-500">{formik.errors.category}</div>
//           )}
//         </div>

//         <div className="my-4">
//           <label className="text-lg font-bold">Product Tags</label>
//           <input
//             type="text"
//             name="tags"
//             onChange={formik.handleChange}
//             value={formik.values.tags}
//             className="w-full border border-gray-300 p-2 rounded-md"
//             placeholder="Enter product tags..."
//           />
//           {formik.touched.tags && formik.errors.tags && (
//             <div className="text-red-500">{formik.errors.tags}</div>
//           )}
//         </div>

//         <div className="my-4">
//           <label className="text-lg font-bold">Product Images</label>
//           <input
//             type="file"
//             name="images"
//             onChange={handleImageChange}
//             multiple
//             className="mt-2"
//           />
//         </div>

//         <div className="my-4">
//           <label className="text-lg font-bold">Product Variations</label>
//           {variations.map((variation, index) => (
//             <div key={index} className="my-2">
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   name={`variations[${index}][name]`}
//                   value={variation.name}
//                   onChange={(e) =>
//                     handleVariationChange(index, "name", e.target.value)
//                   }
//                   className="w-24 border border-gray-300 p-2 rounded-md mr-4"
//                   placeholder="Name"
//                 />
//                 <input
//                   type="text"
//                   name={`variations[${index}][price]`}
//                   value={variation.price}
//                   onChange={(e) =>
//                     handleVariationChange(index, "price", e.target.value)
//                   }
//                   className="w-24 border border-gray-300 p-2 rounded-md mr-4"
//                   placeholder="Price"
//                 />
//                 <input
//                   type="text"
//                   name={`variations[${index}][stock]`}
//                   value={variation.stock}
//                   onChange={(e) =>
//                     handleVariationChange(index, "stock", e.target.value)
//                   }
//                   className="w-24 border border-gray-300 p-2 rounded-md mr-4"
//                   placeholder="Stock"
//                 />
//                 <AiOutlinePlusCircle
//                   onClick={handleAddVariation}
//                   className="text-2xl text-green-500 cursor-pointer"
//                 />
//                 {index !== 0 && (
//                   <AiOutlineMinusCircle
//                     onClick={() => handleRemoveVariation(index)}
//                     className="text-2xl text-red-500 cursor-pointer ml-2"
//                   />
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Update Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;
