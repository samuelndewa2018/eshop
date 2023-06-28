import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";
import Meta from "../components/Meta";
import { categoriesData } from "../static/data";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState(""); // State for sorting option
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [allProducts, categoryData]);

  // Function to handle sorting option change and category selection
  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);

    let sortedData = [...data];

    if (selectedSort === "priceLowToHigh") {
      sortedData = sortedData.sort((a, b) => a.discountPrice - b.discountPrice);
    } else if (selectedSort === "priceHighToLow") {
      sortedData = sortedData.sort((a, b) => b.discountPrice - a.discountPrice);
    } else if (selectedSort === "ratingHighToLow") {
      sortedData = sortedData.sort((a, b) => b.ratings - a.ratings);
    } else if (selectedSort === "salesHighToLow") {
      sortedData = sortedData.sort((a, b) => b.sold_out - a.sold_out);
    }

    setData(sortedData);
  };

  // Function to handle category selection
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === "") {
      setData(allProducts);
    } else {
      const filteredData =
        allProducts &&
        allProducts.filter((i) => i.category === selectedCategory);
      setData(filteredData);
    }
  };

  return (
    <>
      <Meta title="Products" />

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            {/* Sorting options */}
            <div
              className="flex justify-start
             mb-4"
            >
              <label className="mr-2">Sort By:</label>
              <select value={sortBy} onChange={handleSortChange}>
                <option value="">Select</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="ratingHighToLow">Rating: High to Low</option>
                <option value="salesHighToLow">Sales: High to Low</option>
              </select>
            </div>

            {/* Category selection */}
            <div
              className="flex justify-start
             mb-4"
            >
              <label className="mr-2">Category:</label>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="Choose a category">Choose a category</option>
                <option value="">All</option>
                {categoriesData &&
                  categoriesData.map((i) => (
                    <option value={i.title} key={i.title}>
                      {i.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((i, index) => <ProductCard data={i} key={index} />)}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default ProductsPage;
