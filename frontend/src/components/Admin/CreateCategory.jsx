import React, { useState, useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import "react-quill/dist/quill.snow.css";
import styles from "../../styles/styles";
import { toast } from "react-toastify";
import { backend_url } from "../../server";
import { RxCross1 } from "react-icons/rx";
import { deleteCategory } from "../../redux/actions/categories";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${server}/category/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error:", error.response.data);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);

      const response = await axios.post(
        `${server}/category/create-category`,
        formData
      );
      toast.success("Category created!");
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleDeleteCategory = ({ categoryId }) => {
    deleteCategory(categoryId);
    navigate("/categories"); // Redirect to categories list after deletion
  };

  return (
    <div className="w-full px-5">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add Category
            </h1>
            <div className="w-full">
              <form
                aria-required
                onSubmit={handleCreateCategory}
                className="w-full"
              >
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="pb-2">Name:</label>
                    <input
                      type="text"
                      name="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Enter Category Name..."
                      required
                    />
                    <br />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">
                      Upload Image <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      className="hidden"
                      id="upload"
                      required
                      name=""
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                      <AiOutlinePlusCircle
                        size={30}
                        className="mt-3"
                        color="#555"
                      />
                    </label>
                    <img
                      alt=""
                      className="h-[120px] w-[120px] object-cover m-2"
                    />
                  </div>
                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      value="Create Category"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] pb-2">
          Categories
        </h1>
        <div
          className={`${styles.button} !rounded-md`}
          onClick={() => setOpen(true)}
        >
          <span className="text-[#fff]">Add New</span>
        </div>
      </div>
      {categories.map((category) => (
        <div
          className="w-full bg-white h-min 800px:h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10 mb-5"
          key={category._id}
        >
          <div className="flex items-center">
            <img
              src={`${backend_url}${category?.image}`}
              className="w-[50px] h-[50px] rounded-full object-cover"
              alt=""
            />
          </div>
          <div className="pl-8 flex items-center">
            <h6 className="text-[12px] 800px:text-[unset]">{category.name}</h6>
          </div>
          <div className="min-w-[10%] flex items-center justify-between pl-8">
            <AiOutlineDelete
              size={25}
              className="cursor-pointer"
              onClick={handleDeleteCategory}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateCategory;
