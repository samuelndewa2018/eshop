import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { BiMenuAltLeft, BiHomeAlt2 } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
import Typed from "react-typed";
import axios from "axios";
import { TbArrowsShuffle2 } from "react-icons/tb";
import CustomModal from "../CustomModal";
import { toast } from "react-toastify";
import { getAllProducts } from "../../redux/actions/product";

const Header = ({ activeHeading }) => {
  const { statements } = useSelector((state) => state.statements);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const promotionName = statements?.map((i) => i.promotionName);
  const typingName1 = statements?.map((i) => i.typingName1);
  const typingName2 = statements?.map((i) => i.typingName2);
  const typingName3 = statements?.map((i) => i.typingName3);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );

    setSearchData(filteredProducts);
  };

  const getAlloProducts = () => {
    dispatch(getAllProducts());
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  const myClickHandler = (e, props) => {
    // Here you'll do whatever you want to happen when they click
    setOpen(props);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };

  const myClickHandler2 = (e, props) => {
    // Here you'll do whatever you want to happen when they click
    setOpenCart(props);
    setOpenWishlist(false);
    setSearchOpen(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const myClickHandler3 = (e, props) => {
    // Here you'll do whatever you want to happen when they click
    setOpenWishlist(props);
    setOpenCart(false);
    setSearchOpen(false);
    setOpen(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const myClickHandler4 = (e, props) => {
    setSearchOpen(props);
    setOpenCart(false);
    setOpenWishlist(false);

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const myClickHandler5 = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpenCart(false);
    setOpenWishlist(false);
    navigate("/");

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  const myClickHandler6 = (e) => {
    e.preventDefault();
    setSearchOpen(false);
    setOpenCart(false);
    setOpenWishlist(false);
    navigate("/inbox");

    if (!e) {
      var e = window.event;
      e.cancelBubble = true;
    }
    if (e.stopPropagation) {
      e.stopPropagation();
    }
  };
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios.get(`${server}/category/categories`);
        setCategoriesData(response.data);
      } catch (error) {
        console.error("Error fetching categoriesData:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div onClick={dropDown === true ? () => setDropDown(false) : () => {}}>
      <div className="flex p-auto w-full bg-[#3321c8] h-[40px] justify-between py-[7px] px-[5px] lg:py-[22px] lg:px-[60px] lg:h-[70px]">
        <div className="flex ml-2">
          <p className="hidden text-white lg:block">{promotionName}</p>
          <Typed
            className="text-white lg:ml-20 sm:ml-0"
            strings={[
              `${typingName1 === undefined ? "Welcome to eShop" : typingName1}`,
              `${typingName2 === undefined ? "Welcome to eShop" : typingName2}`,
              `${typingName3 === undefined ? "Welcome to eShop" : typingName3}`,
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </div>
        <p className="hidden text-white lg:block">
          Phone:{" "}
          <a className="text-white" href="tel: +254712012113">
            +254 712 012 113
          </a>
        </p>
      </div>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/bramuels/image/upload/v1689346467/logo_transparent_mrwg4g.png"
                className="w-28 h-28"
                alt=""
              />
            </Link>
          </div>
          {/* search box */}
          <div className="w-[50%] relative">
            <input
              type="search"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
            />
            {searchTerm === "" && (
              <BsSearch
                size={30}
                className="absolute right-2 top-1.5 cursor-pointer"
              />
            )}
            {searchData && searchData.length === 0 && searchTerm !== "" ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                <div className="w-full flex items-start-py-3">
                  <img
                    src="https://res.cloudinary.com/bramuels/image/upload/v1689346467/logo_transparent_mrwg4g.png"
                    alt=""
                    className="w-[40px] h-[40px] mr-[10px]"
                  />
                  <h1>We are sorry, No such Product in our store</h1>
                </div>
              </div>
            ) : searchData && searchData.length !== 0 && searchTerm !== "" ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div
                          onClick={() => {
                            getAlloProducts();
                          }}
                          className="w-full flex items-start-py-3"
                        >
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          <div className={`${styles.button}`}>
            <Link to={`${isAuthenticated ? "/profile" : "/login"}`}>
              <h1 className="text-[#fff] flex items-center">
                {isAuthenticated
                  ? `Hello, ${
                      user?.name.indexOf(" ") >= 0
                        ? user?.name.substring(0, user?.name.indexOf(" "))
                        : user?.name
                    }`
                  : "Login/Register"}
                {!isAuthenticated && <IoIosArrowForward className="ml-1" />}
              </h1>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-20" : null
        } transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.noramlFlex} justify-between`}
        >
          {/* categories */}
          <div onClick={() => setDropDown(!dropDown)}>
            <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
              <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
              <button
                className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
              >
                All Categories
              </button>
              {dropDown === false && (
                <IoIosArrowDown
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                  onClick={() => setDropDown(!dropDown)}
                />
              )}
              {dropDown === true && (
                <IoIosArrowUp
                  size={20}
                  className="absolute right-2 top-4 cursor-pointer"
                />
              )}
              {dropDown ? (
                <DropDown
                  categoriesData={categoriesData}
                  setDropDown={setDropDown}
                />
              ) : null}
            </div>
          </div>
          {/* navitems */}
          <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="flex">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishlist && wishlist.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cart && cart.length}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    <img
                      src={`${backend_url}${user?.avatar}`}
                      // src={`${backend_url}${user?.avatar}`}
                      // onError={() =>
                      //   setImgSrc(`${backend_url}defaultavatar.png`)
                      // }
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={(e) => myClickHandler(e, true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="https://res.cloudinary.com/bramuels/image/upload/v1689346467/logo_transparent_mrwg4g.png"
                alt=""
                className="cursor-pointer h-20 w-20"
              />
            </Link>
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={(e) => myClickHandler2(e, true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute rounded-full flex items-center justify-center bottom-[70%] right-0 h-[20px] w-[20px] border-none text-white bg-[#3bc177]">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0 appear__smoothly`}
            onClick={(e) => myClickHandler(e, false)}
          >
            <div
              onClick={(e) => myClickHandler(e, true)}
              className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll"
            >
              <div className="w-full justify-between flex pr-3">
                <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={(e) => myClickHandler3(e, true)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={(e) => myClickHandler(e, false)}
                />
              </div>

              <div className="relative my-8 w-[92%] m-auto h-[40px relative]">
                <input
                  type="search"
                  placeholder="Search Product..."
                  className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                {searchTerm === "" && (
                  <BsSearch
                    size={30}
                    className="absolute right-2 top-1.5 cursor-pointer"
                  />
                )}
                {searchData && searchData.length === 0 && searchTerm !== "" ? (
                  <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                    <div className="w-full flex items-start-py-3">
                      <img
                        src="https://res.cloudinary.com/bramuels/image/upload/v1689346467/logo_transparent_mrwg4g.png"
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>We are sorry, No such Product in our store</h1>
                    </div>
                  </div>
                ) : searchData &&
                  searchData.length !== 0 &&
                  searchTerm !== "" ? (
                  <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
                    {searchData.map((i) => {
                      return (
                        <Link to={`/product/${i._id}`}>
                          <div
                            onClick={() => {
                              getAlloProducts();
                            }}
                            className="flex items-center"
                          >
                            <img
                              src={`${backend_url}${i.images[0]}`}
                              alt=""
                              className="w-[50px] mr-2"
                            />
                            <h5>
                              {" "}
                              {i.name.length > 40
                                ? i.name.slice(0, 40) + "..."
                                : i.name}
                            </h5>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : null}
              </div>

              <Navbar active={activeHeading} />
              <div>
                {modalOpen && (
                  <CustomModal
                    message={"Are you sure you want to logout?"}
                    ok={" Yes, I'm sure"}
                    cancel={"No, cancel"}
                    setModalOpen={setModalOpen}
                    performAction={() => logoutHandler()}
                    closeModel={() => setModalOpen(false)}
                  />
                )}
                {isAuthenticated && (
                  <div
                    onClick={() => setModalOpen(true)}
                    className="pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer"
                  >
                    Log Out
                  </div>
                )}
              </div>
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to={`${isAuthenticated ? "/profile" : "/login"}`}>
                  <h1 className="text-[#fff] flex items-center">
                    {isAuthenticated
                      ? `Hello, ${
                          user?.name.indexOf(" ") >= 0
                            ? user?.name.substring(0, user?.name.indexOf(" "))
                            : user?.name
                        }`
                      : "Login/Register"}
                    {!isAuthenticated && <IoIosArrowForward className="ml-1" />}
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />
            </div>
          </div>
        )}
        {/* search for bottom tab */}
        {searchOpen && (
          <div
            onClick={(e) => myClickHandler4(e, false)}
            className=" fixed top-0 left-0 right-0 bg-black/[.6] p-4 z-50 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%)] max-h-full appear__smoothly"
          >
            <div className="w-[90%] absolute top-[20%]">
              <input
                type="search"
                placeholder="Search Product..."
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={(e) => myClickHandler4(e, true)}
                className="h-[40px]  w-full px-2 border-[#3957db] border-[2px] rounded-md"
              />
              {searchTerm === "" && (
                <BsSearch
                  size={30}
                  className="absolute right-2 top-1.5 cursor-pointer"
                />
              )}
              {searchData && searchData.length === 0 && searchTerm !== "" ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                  <div className="w-full flex items-start-py-3">
                    <img
                      src="https://res.cloudinary.com/bramuels/image/upload/v1689346467/logo_transparent_mrwg4g.png"
                      alt=""
                      className="w-[40px] h-[40px] mr-[10px]"
                    />
                    <h1>We are sorry, No such Product in our store</h1>
                  </div>
                </div>
              ) : searchData && searchData.length !== 0 && searchTerm !== "" ? (
                <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                  {searchData &&
                    searchData.map((i, index) => {
                      return (
                        <Link
                          to={`/product/${i._id}`}
                          onClick={(e) => myClickHandler4(e, false)}
                        >
                          <div
                            onClick={() => {
                              getAlloProducts();
                            }}
                            className="w-full flex items-start-py-3"
                          >
                            <img
                              src={`${backend_url}${i.images[0]}`}
                              alt=""
                              className="w-[40px] h-[40px] mr-[10px]"
                            />
                            <h1>
                              {" "}
                              {i.name.length > 40
                                ? i.name.slice(0, 40) + "..."
                                : i.name}
                            </h1>
                          </div>
                        </Link>
                      );
                    })}
                </div>
              ) : null}
            </div>
          </div>
        )}
        <div className="bottomOption">
          <div>
            <BiHomeAlt2
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
              onClick={(e) => myClickHandler5(e)}
            />
          </div>

          <div
            style={{
              position: "relative",
            }}
          >
            <AiOutlineHeart
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
              onClick={(e) => myClickHandler3(e, true)}
            />

            <span className="absolute rounded-full flex items-center justify-center bottom-[70%] right-[5%] h-[20px] w-[20px] border-none text-white bg-[#3bc177]">
              {wishlist.length}
            </span>
          </div>
          <div
            style={{
              position: "relative",
            }}
          >
            <AiOutlineMessage
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
              onClick={(e) => myClickHandler6(e, true)}
            />
          </div>

          <div onClick={(e) => myClickHandler4(e, true)}>
            <BsSearch
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
            />
          </div>
          <Link to="/compare-products">
            <TbArrowsShuffle2
              style={{
                color: "#000",
                fontSize: "25px",
                margin: "5px",
                opacity: ".8",
              }}
            />
          </Link>
          <div>
            {isAuthenticated ? (
              <div>
                <Link to="/profile">
                  <img
                    src={`${backend_url}${user?.avatar}`}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full border-[3px] border-[#0eae88]"
                  />
                </Link>
              </div>
            ) : (
              <Link to="/login">
                <CgProfile size={44} color="rgb(0 0 0 / 83%)" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
