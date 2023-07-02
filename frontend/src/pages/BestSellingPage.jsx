import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Meta from "../components/Meta";
import { categoriesData } from "../static/data";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { allProducts, isLoading } = useSelector((state) => state.products);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => a.sold_out - b.sold_out);
    const firstFive = sortedData && sortedData.slice(0, 6);
    setData(firstFive);
  }, [allProducts]);

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

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={2} />
          <br />
          <br />
          <div className={`${styles.section}`}>
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
                        <option value={i.title} key={i.title}>
                          {i.title}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
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
