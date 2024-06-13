import React from "react";
import * as Icons from "react-icons/vsc";

import { NavLink, matchPath, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const SidebarLinks = ({ e, iconName, onClick }) => {
  const Icon = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  const getIcon = () => {
    if (e.name === "Cart") {
      return <FaShoppingCart className="text-lg" />;
    }
    return <Icon className="text-lg" />;
  };

  return (
    <NavLink
      to={e.path}
      onClick={onClick}
      className={`py-2 px-4 relative md:px-8 md:py-2 text-lg font-medium transition-all duration-300 ${
        matchRoute(e.path) ? "text-yellow-50 bg-yellow-800" : "bg-opacity-0"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-1 bg-yellow-50 ${
          matchRoute(e.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex flex-row gap-2 items-center">
        {getIcon()}
        <p>{e.name}</p>
      </div>
    </NavLink>
  );
};

export default SidebarLinks;
