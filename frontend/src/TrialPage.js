import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "./static/data";
import styles from "./styles/styles";
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
      <div className="scrollDivScroll">
        <MdChevronLeft className="rightScroll" onClick={slideLeft} size={40} />
        <div
          className={`${styles.section} bg-white p-6 rounded-lg mb-12`}
          id="categories"
        >
          <div
            className="categoryCard"
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
                    className="categoryCardDetails"
                    key={i.id}
                    onClick={() => handleSubmit(i)}
                  >
                    <h5>{i.title}</h5>
                    <img
                      src={i.image_Url}
                      className="w-[120px] object-cover"
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
        </div>
        <MdChevronRight className="leftScroll" onClick={slideRight} size={40} />
      </div>
    </>
  );
};

export default Categories;
