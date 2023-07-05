import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { backend_url, server } from "../../../server";
import { categoriesData } from "../../../static/data";
import { useSelector } from "react-redux";
import Marquee from "react-fast-marquee";

const Hero = () => {
  const { statements } = useSelector((state) => state.statements);
  const [carouselData, setCarouselData] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [featuredProduct, setFeaturedProduct] = useState([]);

  useEffect(() => {
    fetchData();
    fetchData2();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${server}/carousel/get-carousel`);
      const products = await axios.get(`${server}/product/get-all-products`);

      setCarouselData(response.data);
      setBestSelling(products.data.products);
      // setFeaturedProduct(products.data.products);
    } catch (error) {
      console.error("Error fetching carousel data:", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const products2 = await axios.get(`${server}/product/get-all-products`);
      setFeaturedProduct(products2.data.products);
    } catch (error) {
      console.error("Error fetching carousel data:", error);
    }
  };

  const sortedBestSellingProducts = bestSelling.sort((a, b) => {
    return b.sold_out - a.sold_out;
  });

  const sortedNewProducts = featuredProduct.sort((a, b) => {
    return a.createdAt - b.createdAt;
  });

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-2 sm:grid-cols-1 mb-14">
        <div className="rounded carousel-container mt-3">
          <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
            {carouselData.map((slide) => (
              <div key={slide._id}>
                <img
                  className="rounded carousel-image"
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
        <div>
          <div className="rounded grid grid-cols-3 lg:grid-cols-3 gap-2 mt-3 max-h-[370px] mx-2">
            <div className="flex">
              {sortedBestSellingProducts &&
                sortedBestSellingProducts.slice(0, 1).map((i) => {
                  return (
                    <Link
                      to={`/product/${i._id}`}
                      className="rounded relative overflow-hidden shadow-lg flex flex-col w-36 h-36 lg:w-full lg:h-full"
                    >
                      <div className="absolute top-1 left-2">
                        <span
                          className="bg-blue-500 text-white py-1 px-2 text-xs rounded-full"
                          style={{ transform: "rotate(45deg)" }}
                        >
                          best sold
                        </span>
                      </div>
                      <img
                        className="w-36 h-36 lg:w-full lg:h-full object-cover"
                        src={`${backend_url}${i.images && i.images[0]}`}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-6 py-6 flex-1 hidden lg:flex flex-col">
                        <div className="font-bold text-sm mb-2">{i.name}</div>
                      </div>
                      <div className="absolute bottom-1 left-2 sm:hidden">
                        <span
                          className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                          style={{ transform: "rotate(45deg)" }}
                        >
                          {i.name.length > 10
                            ? i.name.slice(0, 10) + "..."
                            : i.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className="flex">
              {sortedNewProducts &&
                sortedNewProducts.slice(0, 1).map((i) => {
                  return (
                    <Link
                      to={`/product/${i._id}`}
                      className="rounded relative overflow-hidden shadow-lg flex flex-col w-36 h-36 lg:w-full lg:h-full"
                    >
                      <div className="absolute top-1 left-2">
                        <span
                          className="bg-blue-500 text-white py-1 px-2 text-xs rounded-full"
                          style={{ transform: "rotate(45deg)" }}
                        >
                          latest
                        </span>
                      </div>
                      <img
                        className="w-36 h-36 lg:w-full lg:h-full object-cover"
                        src={`${backend_url}${i.images && i.images[0]}`}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-6 py-6 flex-1 flex flex-col">
                        <div className="font-bold text-sm mb-2">{i.name}</div>
                      </div>
                      <div className="absolute bottom-1 left-2 sm:hidden">
                        <span
                          className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                          style={{ transform: "rotate(45deg)" }}
                        >
                          {i.name.length > 10
                            ? i.name.slice(0, 10) + "..."
                            : i.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className="flex">
              {statements &&
                statements.map((i) => {
                  return (
                    <Link
                      to={`/products`}
                      className="rounded relative overflow-hidden shadow-lg flex flex-col w-36 h-36 lg:w-full lg:h-full"
                    >
                      <div className="absolute top-1 left-2">
                        <span
                          className="bg-blue-500 text-white py-1 px-2 text-xs rounded-full"
                          style={{ transform: "rotate(45deg)" }}
                        >
                          sponsored
                        </span>
                      </div>
                      <img
                        className="w-36 h-36 lg:w-full lg:h-full object-cover"
                        src={i.promotionImage}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-6 py-6 flex-1 flex flex-col">
                        <div className="font-bold text-sm mb-2">
                          {i.promotionDetails}
                        </div>
                      </div>
                      <div className="absolute bottom-1 left-2 sm:hidden">
                        <span
                          className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                          style={{ transform: "rotate(45deg)" }}
                        >
                          {i.promotionDetails.length > 10
                            ? i.promotionDetails.slice(0, 10) + "..."
                            : i.promotionDetails}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="rounded flex justify-center lg:grid lg:grid-cols-2 gap-2 mt-3 ml-2">
            <div className="flex max-h-[120px]">
              {sortedNewProducts &&
                sortedNewProducts.slice(0, 1).map((i) => {
                  return (
                    <Link
                      to={`/product/${i._id}`}
                      className="rounded relative overflow-hidden shadow-lg flex flex-row w-36 h-36 lg:w-full lg:h-full"
                    >
                      <img
                        className="w-36 h-36 lg:w-full lg:h-full object-cover"
                        src={`${backend_url}${i.images && i.images[0]}`}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-6 py-4 flex-1 flex flex-col">
                        <div className="font-bold text-sm mb-2">{i.name}</div>
                      </div>
                      <div className="absolute bottom-1 left-2 sm:hidden">
                        <span
                          className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                          style={{ transform: "rotate(45deg)" }}
                        >
                          {i.name.length > 10
                            ? i.name.slice(0, 10) + "..."
                            : i.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
            <div className="flex max-h-[120px]">
              {sortedNewProducts &&
                sortedNewProducts.slice(0, 1).map((i) => {
                  return (
                    <Link
                      to={`/product/${i._id}`}
                      className="rounded relative overflow-hidden shadow-lg flex flex-row w-36 h-36 lg:w-full lg:h-full"
                    >
                      <img
                        className="w-36 h-36 lg:w-full lg:h-full object-cover"
                        src={`${backend_url}${i.images && i.images[0]}`}
                        alt="Sunset in the mountains"
                      />
                      <div className="px-6 py-4 flex-1 flex flex-col">
                        <div className="font-bold text-sm mb-2">{i.name}</div>
                      </div>
                      <div className="absolute bottom-1 left-2 sm:hidden">
                        <span
                          className="bg-zinc-400 text-white py-1 px-2 text-xs rounded-full"
                          style={{ transform: "rotate(45deg)" }}
                        >
                          {i.name.length > 10
                            ? i.name.slice(0, 10) + "..."
                            : i.name}
                        </span>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Hero;
