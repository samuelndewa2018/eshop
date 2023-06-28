import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateProduct } from "../actions/productActions";

const UpdateProduct = ({ productId }) => {
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.find((p) => p.id === productId)
  );

  const [images, setImages] = useState([]);
  const [variations, setVariations] = useState([]);

  useEffect(() => {
    if (product) {
      formik.setValues({
        name: product.name,
        description: product.description,
        category: product.category,
        tags: product.tags.join(","),
      });

      setImages(product.images);
      setVariations(product.variations);
    }
  }, [product]);

  const handleImageChange = (e) => {
    setImages([...images, ...e.target.files]);
  };

  const handleVariationChange = (index, key, value) => {
    const updatedVariations = [...variations];
    updatedVariations[index][key] = value;
    setVariations(updatedVariations);
  };

  const handleAddVariation = () => {
    setVariations([...variations, { name: "", price: "", stock: "" }]);
  };

  const handleRemoveVariation = (index) => {
    const updatedVariations = [...variations];
    updatedVariations.splice(index, 1);
    setVariations(updatedVariations);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      category: "",
      tags: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("tags", values.tags);
      images.forEach((image) => formData.append("images", image));
      variations.forEach((variation, index) => {
        formData.append(`variations[${index}][name]`, variation.name);
        formData.append(`variations[${index}][price]`, variation.price);
        formData.append(`variations[${index}][stock]`, variation.stock);
      });

      dispatch(updateProduct(productId, formData));
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="my-4">
          <label className="text-lg font-bold">Product Name</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter product name..."
          />
          {formik.touched.name && formik.errors.name && (
            <div className="text-red-500">{formik.errors.name}</div>
          )}
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

        <div className="my-4">
          <label className="text-lg font-bold">Product Category</label>
          <input
            type="text"
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter product category..."
          />
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500">{formik.errors.category}</div>
          )}
        </div>

        <div className="my-4">
          <label className="text-lg font-bold">Product Tags</label>
          <input
            type="text"
            name="tags"
            onChange={formik.handleChange}
            value={formik.values.tags}
            className="w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter product tags..."
          />
          {formik.touched.tags && formik.errors.tags && (
            <div className="text-red-500">{formik.errors.tags}</div>
          )}
        </div>

        <div className="my-4">
          <label className="text-lg font-bold">Product Images</label>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            multiple
            className="mt-2"
          />
        </div>

        <div className="my-4">
          <label className="text-lg font-bold">Product Variations</label>
          {variations.map((variation, index) => (
            <div key={index} className="my-2">
              <div className="flex items-center">
                <input
                  type="text"
                  name={`variations[${index}][name]`}
                  value={variation.name}
                  onChange={(e) =>
                    handleVariationChange(index, "name", e.target.value)
                  }
                  className="w-24 border border-gray-300 p-2 rounded-md mr-4"
                  placeholder="Name"
                />
                <input
                  type="text"
                  name={`variations[${index}][price]`}
                  value={variation.price}
                  onChange={(e) =>
                    handleVariationChange(index, "price", e.target.value)
                  }
                  className="w-24 border border-gray-300 p-2 rounded-md mr-4"
                  placeholder="Price"
                />
                <input
                  type="text"
                  name={`variations[${index}][stock]`}
                  value={variation.stock}
                  onChange={(e) =>
                    handleVariationChange(index, "stock", e.target.value)
                  }
                  className="w-24 border border-gray-300 p-2 rounded-md mr-4"
                  placeholder="Stock"
                />
                <AiOutlinePlusCircle
                  onClick={handleAddVariation}
                  className="text-2xl text-green-500 cursor-pointer"
                />
                {index !== 0 && (
                  <AiOutlineMinusCircle
                    onClick={() => handleRemoveVariation(index)}
                    className="text-2xl text-red-500 cursor-pointer ml-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
