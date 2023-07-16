import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Meta from "../components/Meta";
import { categoriesData } from "../static/data";
import axios from "axios";
import { server } from "../server";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 6);
    setData(firstFive);
  }, [allProducts]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategoryData();
  }, []);

  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${server}/category/categories`);
      const data = await response.data;
      dispatch({ type: "SET_CATEGORIES", payload: data });
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const categoriesData = useSelector((state) => state.categories);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  useEffect(() => {
    if (selectedCategory === "") {
      setData(allProducts?.slice(0, 6));
    } else {
      const filteredData = allProducts?.filter(
        (product) => product.category === selectedCategory
      );
      setData(filteredData?.slice(0, 6));
    }
  }, [selectedCategory, allProducts]);

  return (
    <>
      <Meta title="Best Selling" />

      {isLoading || categoriesData === null ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section} appear__smoothly`}>
            <div className="flex justify-start mb-4">
              <div className="lg:flex sm:block">
                <div>
                  <label
                    for="small"
                    className="flex mt-2 mr-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category:
                  </label>
                </div>
                <div>
                  <select
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    id="small"
                    className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Choose a category</option>
                    <option value="">All</option>
                    {categoriesData &&
                      categoriesData.map((i) => (
                        <option value={i.name} key={i.name}>
                          {i.name}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            {/* <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-12 lg:mb-12 border-0">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
