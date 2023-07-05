import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Categories = () => {
  const navigate = useNavigate();
  const [hideLeftArrow, setHideLeftArrow] = useState(true);
  const [hideRightArrow, setHideRightArrow] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    slider.addEventListener("scroll", handleScroll);

    return () => {
      slider.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const slider = sliderRef.current;
    const isAtStart = slider.scrollLeft === 0;
    const isAtEnd =
      slider.scrollLeft + slider.offsetWidth >= slider.scrollWidth;

    setHideLeftArrow(isAtStart);
    setHideRightArrow(isAtEnd);
  };

  const slideLeft = () => {
    const slider = sliderRef.current;
    slider.scrollLeft -= 250;
  };

  const slideRight = () => {
    const slider = sliderRef.current;
    slider.scrollLeft += 250;
  };

  const handleSubmit = (category) => {
    navigate(`/products?category=${category.title}`);
  };

  return (
    <>
      {/* Branding component */}
      <div className={`${styles.section} hidden sm:block`}>
        {/* Branding content */}
      </div>

      {/* Categories component */}
      <div className="mt-1 lg:mt-6">
        <div
          className={`${styles.section} relative bg-white lg:p-6 sm:p-2 rounded-lg lg:mb-12 sm:mb-3`}
          id="categories"
        >
          {!hideLeftArrow && (
            <MdChevronLeft
              className="absolute z-10 top-[37%] rounded-full left-[-11px] bg-[#f9f4f4]"
              onClick={slideLeft}
              size={35}
            />
          )}

          <div
            className="overflow-x-auto flex space-x-4 border-0"
            id="slider"
            ref={sliderRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {categoriesData &&
              categoriesData.map((category) => (
                <div
                  className="border mb-2 p-3 min-w-[127px] rounded-md"
                  key={category.id}
                  onClick={() => handleSubmit(category)}
                >
                  <p className="text-sm">{category.title}</p>
                  <img
                    src={category.image_Url}
                    className="lg:w-[170px] sm:w-[100px] object-cover lg:h-[100px] sm:h-[50px]"
                    alt=""
                  />
                </div>
              ))}
          </div>

          {!hideRightArrow && (
            <MdChevronRight
              className="absolute z-10 top-[37%] rounded-full right-[-11px] bg-[#f9f4f4]"
              onClick={slideRight}
              size={35}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Categories;
