import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links.jsx";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiconnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { TiArrowSortedDown } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchSublinks = async () => {
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      const data = result.data.allTags.map((element) => element.name);
      setSubLinks(data);
      localStorage.setItem("sublinks", data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchSublinks();
  }, []);

  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full border-b-[1px] border-b-richblack-700 pb-3">
      <div className="flex justify-between items-center w-[90%] mx-auto pt-2">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8 md:h-8" />
          </Link>
        </div>
        <div className="hidden md:flex flex-row gap-6 text-white items-center">
          {NavbarLinks.map((element, index) =>
            element.title === "Catalog" ? (
              <div
                key={index}
                className="flex flex-row gap-1 items-center group relative"
              >
                <p>Catalog</p>
                <TiArrowSortedDown />
                <div
                  className="invisible bg-richblack-5 p-4 absolute z-50 gap-2 flex flex-col rounded-lg
                    text-richblack-900 transition-all opacity-0 duration-200 group-hover:visible group-hover:opacity-100
                    w-[200px] translate-y-[65%] -translate-x-[30%] group"
                >
                  <div className="bg-richblack-5 w-[40px] h-[40px] absolute rotate-45 -z-20 -translate-y-[50%] translate-x-24"></div>
                  {subLinks.length ? (
                    subLinks.map((element, index) => (
                      <Link
                        to={`catalog/${element
                          .split(" ")
                          .join("-")
                          .toLowerCase()}`}
                        key={index}
                        className="hover:bg-richblack-50"
                      >
                        <p>{element}</p>
                      </Link>
                    ))
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ) : (
              <Link to={element.path} key={index}>
                <li
                  className={`${
                    matchRoute(`${element.path}`)
                      ? "text-yellow-25"
                      : "text-white"
                  } list-none`}
                >
                  {element.title}
                </li>
              </Link>
            )
          )}
        </div>
        <div className="hidden md:flex flex-row gap-4 text-white items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative flex">
              <AiOutlineShoppingCart className="text-2xl mr-3" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null ? (
            <>
              <Link to="/login">
                <p className="rounded-lg bg-richblack-800 p-2 text-richblack-200">
                  Log in
                </p>
              </Link>
              <Link to="/signup">
                <p className="rounded-lg bg-richblack-800 p-2 text-richblack-200">
                  Sign up
                </p>
              </Link>
            </>
          ) : (
            <ProfileDropDown />
          )}
        </div>
        <div className="flex md:hidden text-white items-center">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <IoClose size={24} />
            ) : (
              <GiHamburgerMenu size={24} />
            )}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center bg-richblack-800 text-white w-full py-4">
          <ul className="flex flex-col gap-4 w-full items-center">
            {NavbarLinks.map((element, index) =>
              element.title === "Catalog" ? (
                <div key={index} onClick={() => setIsVisible(!isVisible)}>
                  <div className="flex flex-row gap-1 justify-center items-center group">
                    <p>Catalog</p>
                    <TiArrowSortedDown />
                  </div>
                  <div
                    className={`bg-richblack-5 p-4 absolute z-50 gap-2 flex flex-col rounded-lg
                      text-richblack-900 transition-all  duration-200 
                      w-[200px] translate-y-[10%] -translate-x-[30%] group ${
                        isVisible
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                      }`}
                  >
                    <div className="bg-richblack-5 w-[40px] h-[40px] absolute rotate-45 -z-20 -translate-y-[50%] translate-x-24"></div>
                    {subLinks.length ? (
                      subLinks.map((element, index) => (
                        <Link
                          to={`catalog/${element
                            .split(" ")
                            .join("-")
                            .toLowerCase()}`}
                          key={index}
                          className="hover:bg-richblack-50"
                        >
                          <p>{element}</p>
                        </Link>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : (
                <Link to={element.path} key={index} onClick={toggleMobileMenu}>
                  <li
                    className={`${
                      matchRoute(`${element.path}`)
                        ? "text-yellow-25"
                        : "text-white"
                    }`}
                  >
                    {element.title}
                  </li>
                </Link>
              )
            )}
          </ul>
          <div className="flex flex-col gap-4 text-white items-center mt-4">
            {user && user?.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                className="relative flex"
                onClick={toggleMobileMenu}
              >
                <AiOutlineShoppingCart className="text-2xl mr-3" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full text-xs px-1">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null ? (
              <>
                <Link to="/login" onClick={toggleMobileMenu}>
                  <p className="rounded-lg bg-white p-2 text-richblack-800 font-semibold">
                    Log In
                  </p>
                </Link>
                <Link to="/signup" onClick={toggleMobileMenu}>
                  <p className="rounded-lg bg-white p-2 text-richblack-800 font-semibold">
                    Sign Up
                  </p>
                </Link>
              </>
            ) : (
              <ProfileDropDown />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
