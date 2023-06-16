import React, { useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useDispatch, useSelector } from "react-redux";
import { addTocompare, removeFromCompare } from "../redux/actions/compare";
import CompareProductsCard from "../components/compare/CompareProductsCard";
import Meta from "../components/Meta";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const CompareProducts = () => {
  const { compare, isLoading } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const removeFromCompareHandler = (data) => {
    dispatch(removeFromCompare(data));
  };
  return (
    <>
      <Meta title="Compare-Products" />

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {compare &&
                compare.map((i, index) => (
                  <CompareProductsCard data={i} key={index} />
                ))}
            </div>
            {compare && compare.length === 0 ? (
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

export default CompareProducts;
