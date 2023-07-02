import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Categories = () => {
  const navigate = useNavigate();
  // scrolls
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };
  return (
    <>
      <div className={`${styles.section} hidden sm:block`}>
        <div
          className={`branding my-12 flex justify-between w-full shadow-sm bg-white p-5 rounded-md`}
        >
          {brandingData &&
            brandingData.map((i, index) => (
              <div className="flex items-start" key={index}>
                {i.icon}
                <div className="px-3">
                  <h3 className="font-bold text-sm md:text-base">{i.title}</h3>
                  <p className="text-xs md:text-sm">{i.Description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="">
        <div
          className={`${styles.section} relative bg-white lg:p-6 sm:p-2 rounded-lg lg:mb-12 sm:mb-3`}
          id="categories"
        >
          <MdChevronLeft
            className="absolute z-10 top-[37%] rounded-full left-[-11px] bg-[#f9f4f4]"
            onClick={slideLeft}
            size={35}
          />
          <div
            className="overflow-x-auto flex space-x-4 border-0"
            id="slider"
            style={{ scrollBehavior: "smooth" }}
          >
            {categoriesData &&
              categoriesData.map((i) => {
                const handleSubmit = (i) => {
                  navigate(`/products?category=${i.title}`);
                };
                return (
                  <div
                    className="border mb-2 p-3 min-w-[127px] rounded-md"
                    key={i.id}
                    onClick={() => handleSubmit(i)}
                  >
                    <p className="text-sm">{i.title}</p>
                    <img
                      src={i.image_Url}
                      className="lg:w-[170px] sm:w-[100px] object-cover lg:h-[100px] sm:h-[50px]"
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
          <MdChevronRight
            className="absolute z-10 top-[37%] rounded-full right-[-11px] bg-[#f9f4f4]"
            onClick={slideRight}
            size={35}
          />
        </div>
      </div>
    </>
  );
};

export default Categories;
