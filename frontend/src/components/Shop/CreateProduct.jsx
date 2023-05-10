import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../redux/actions/product";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";

const createProductSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  tags: yup.string().required("Tags is required"),
  originalPrice: yup.string().required("Original Price is required"),
  discountPrice: yup.string().required("Discount Price is required"),
  stock: yup.string().required("Stock is required"),
});

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  // const [name, setName] = useState("");
  // const [description, setDescription] = useState("");
  // const [category, setCategory] = useState("");
  // const [tags, setTags] = useState("");
  // const [originalPrice, setOriginalPrice] = useState();
  // const [discountPrice, setDiscountPrice] = useState();
  // const [stock, setStock] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    e.preventDefault();

    let files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  console.log(images);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tags: "",
      originalPrice: "",
      discountPrice: "",
      stock: "",
    },
    validationSchema: createProductSchema,
    onSubmit: async (values) => {
      const name = values.name;
      const description = values.description;
      const category = values.category;
      const tags = values.tags;
      const originalPrice = values.originalPrice;
      const discountPrice = values.discountPrice;
      const stock = values.stock;
      const imagesi = images;

      const newForm = new FormData();

      imagesi.forEach((image) => {
        newForm.append("images", image);
      });
      newForm.append("name", name);
      newForm.append("description", description);
      newForm.append("category", category);
      newForm.append("tags", tags);
      newForm.append("originalPrice", originalPrice);
      newForm.append("discountPrice", discountPrice);
      newForm.append("stock", stock);
      newForm.append("shopId", seller._id);
      dispatch(createProduct(newForm));
    },
  });

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const newForm = new FormData();

  //   images.forEach((image) => {
  //     newForm.append("images", image);
  //   });
  //   newForm.append("name", name);
  //   newForm.append("description", description);
  //   newForm.append("category", category);
  //   newForm.append("tags", tags);
  //   newForm.append("originalPrice", originalPrice);
  //   newForm.append("discountPrice", discountPrice);
  //   newForm.append("stock", stock);
  //   newForm.append("shopId", seller._id);
  //   dispatch(createProduct(newForm));
  // };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      {/* create product form */}
      <form onSubmit={formik.handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="text"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            value={formik.values.name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product name..."
          />
          <div className="text-red-500">
            {formik.touched.name && formik.errors.name}
          </div>
        </div>
        <br />
        <div>
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <ReactQuill
            theme="snow"
            // required
            // type="text"
            name="description"
            onChange={formik.handleChange("description")}
            // onBlur={formik.handleBlur("description")}
            value={formik.values.description}
            placeholder="Enter your product description..."
          />
          {/* <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}
            value={formik.values.description}
            className="mt-2 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter your product description..."
          ></textarea> */}
          <div className="text-red-500">
            {formik.touched.description && formik.errors.description}
          </div>
        </div>
        <br />
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
            <option value="Choose a category">Choose a category</option>
            {categoriesData &&
              categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
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
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
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
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            onChange={formik.handleChange("originalPrice")}
            onBlur={formik.handleBlur("originalPrice")}
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
            name="price"
            onChange={formik.handleChange("discountPrice")}
            onBlur={formik.handleBlur("discountPrice")}
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
            name="price"
            onChange={formik.handleChange("stock")}
            onBlur={formik.handleBlur("stock")}
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
              <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
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
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
