import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { NumericFormat } from "react-number-format";
import { TbArrowsShuffle2 } from "react-icons/tb";
import { addTocompare } from "../../../redux/actions/compare";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { compare } = useSelector((state) => state.compare);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  //   const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };
  const myClickHandler = (e, props) => {
    setOpen(props);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const addToCompareHandler = (id) => {
    const isItemExists = compare && compare.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Product already in comparelist!");
    } else {
      const compareData = { ...data, qty: 1 };
      dispatch(addTocompare(compareData));
      toast.success("Product added to comparelist!");
    }
  };

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const getDescription = () => {
    if (showMore) {
      return data.description;
    } else {
      return data.description.length > 450
        ? data.description.slice(0, 450) + "..."
        : data.description;
    }
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div
          onClick={(e) => myClickHandler(e, false)}
          className="appear__smoothly fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center"
        >
          <div
            onClick={(e) => myClickHandler(e, true)}
            className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4 scroll__bar"
          >
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={(e) => myClickHandler(e, false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt=""
                />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${backend_url}${data?.shop?.avatar}`}
                      alt=""
                      // className="w-[50px] h-[50px] rounded-full mr-2"
                      className="h-[100px] w-[100px] object-cover mr-3 mt-3"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">(4.5) Ratings</h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
                <h5 className="text-[16px] text-[#68d284] mt-5 ml-4">
                  {data?.sold_out !== 0 && <span>({data?.sold_out}) sold</span>}
                </h5>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <div className="disableStyles">
                  <p dangerouslySetInnerHTML={{ __html: getDescription() }}></p>
                  {data.description.length > 450 && (
                    <button
                      className="text-blue-500 hover:underline focus:outline-none"
                      onClick={toggleShowMore}
                    >
                      {showMore ? "Show less" : "Show more"}
                    </button>
                  )}
                </div>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    <NumericFormat
                      value={data.discountPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"Ksh. "}
                    />
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.originalPrice ? (
                      <NumericFormat
                        value={data.originalPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Ksh. "}
                      />
                    ) : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                    onClick={() => addToCartHandler(data._id)}
                  >
                    <span className="text-[#fff] flex items-center">
                      Add to cart <AiOutlineShoppingCart className="ml-1" />
                    </span>
                  </div>
                  <div
                    className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                    onClick={() => addToCompareHandler(data._id)}
                  >
                    <span className="text-white flex items-center">
                      Add to compare <TbArrowsShuffle2 className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
