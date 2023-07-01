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
              <label className="mr-2">Category:</label>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">All</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
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
