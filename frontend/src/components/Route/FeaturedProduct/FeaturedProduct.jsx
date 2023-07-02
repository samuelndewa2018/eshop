import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const FeaturedProduct = () => {
  const { allProducts } = useSelector((state) => state.products);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Featured Products</h1>
        </div>
        <div className="overflow-x-auto flex space-x-4 mb-12 border-0">
          {" "}
          {allProducts && allProducts.length !== 0 && (
            <>
              {allProducts &&
                allProducts.map((i, index) => (
                  <div className="h-full w-full">
                    <ProductCard data={i} key={index} />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
    //    <div className="overflow-x-auto flex space-x-4 mb-12 border-0">
    //    {data &&
    //      data.map((i, index) => (
    //        <div className="flex-none w-[250px] h-[400px]" key={index}>
    //          <ProductCard data={i} />
    //        </div>
    //      ))}
    //  </div>
  );
};

export default FeaturedProduct;
