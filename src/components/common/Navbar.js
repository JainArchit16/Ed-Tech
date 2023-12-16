import React, { useEffect, useState } from "react";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiconnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";
import { TiArrowSortedDown } from "react-icons/ti";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSublinks = async () => {
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      // console.log(result);
      // if (result?.data?.allTags?.length > 0) {
      //      setSubLinks(result?.data?.data);
      // }
      // console.log(typeof(result.data.allTags[0].name));
      const data = [];
      result.data.allTags.map((element) => data.push(element.name));
      // console.log(data);
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
  return (
    <div className=" flex flex-row w-full justify-between pt-2 mx-auto items-center border-b-richblack-700 border-b-[1px] pb-3">
      <div className="flex flex-row justify-between w-[80%] items-center mx-auto">
        <div>
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        <ul className="flex flex-row gap-6 text-white">
          {NavbarLinks.map((element, index) =>
            element.title === "Catalog" ? (
              <div className="flex flex-row gap-1 items-center group relative">
                <p>Catalog</p>
                <TiArrowSortedDown />
                <div
                  className="invisible bg-richblack-5 p-4 absolute z-50 gap-2 flex flex-col rounded-lg
                            text-richblack-900 transition-all opacity-0 duration-200 group-hover:visible group-hover:opacity-100
                            lg:w-[200px] translate-y-[65%] -translate-x-[30%]"
                >
                  <div className="bg-richblack-5 w-[40px] h-[40px] absolute rotate-45 -z-20 -translate-y-[50%] translate-x-[226%]"></div>
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
                  }`}
                >
                  {element.title}
                </li>
              </Link>
            )
          )}
        </ul>
        <div className="flex flex-row gap-4 text-white items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative flex flex-row">
              <AiOutlineShoppingCart className="text-2xl mr-3" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <p className="rounded-lg bg-richblack-800 p-2 text-richblack-200">
                Log in
              </p>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <p className="rounded-lg bg-richblack-800 p-2 text-richblack-200">
                Sign up
              </p>
            </Link>
          )}
          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
