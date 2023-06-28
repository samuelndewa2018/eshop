import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { server } from "../../../server";

const Hero = () => {
  // return (
  //   <div
  //     className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
  //     style={{
  //       backgroundImage:
  //         "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
  //     }}
  //   >
  //     <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
  //       <h1
  //         className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
  //       >
  //         Best Collection for <br /> home Decoration
  //       </h1>
  //       <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
  //         Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
  //         assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
  //         quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
  //         <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
  //       </p>
  //       <Link to="/products" className="inline-block">
  //         <div className={`${styles.button} mt-5`}>
  //           <span className="text-[#fff] font-[Poppins] text-[18px]">
  //             Shop Now
  //           </span>
  //         </div>
  //       </Link>
  //     </div>
  //   </div>
  // );

  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}/carousel/get-carousel`); // Replace with your backend API endpoint
      setCarouselData(response.data);
    } catch (error) {
      console.error("Error fetching carousel data:", error);
    }
  };

  return (
    <div className="carousel-container">
      <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
        {carouselData.map((slide) => (
          <div key={slide._id}>
            <img
              className="carousel-image"
              src={slide.imageUrl}
              alt={slide.caption}
            />
            <p className="legend">{slide.caption}</p>
          </div>
        ))}
      </Carousel>

      <style jsx>{`
        .carousel-image {
          /* Set default size for larger screens */
          max-width: 100%;
          height: 500px;
        }
        @media (max-width: 768px) {
          /* Adjust size for smaller screens */
          .carousel-image {
            /* Increase size for smaller screens */
            max-width: 100%;
            width: 100%;
            height: 400px;
          }
        }
      `}</style>
    </div>
  );
};
export default Hero;
