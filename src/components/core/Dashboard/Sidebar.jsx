import React, { useEffect, useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../common/Loader";
import SidebarLinks from "./SidebarLinks";
import { useNavigate } from "react-router-dom";
import { VscSignOut, VscClose } from "react-icons/vsc";
import ConfirmationModal from "../../common/ConfirmationModal";
import { FiMenu } from "react-icons/fi";

const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { Loading: authLoading } = useSelector((state) => state.auth);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (authLoading || profileLoading) {
    return <Loader />;
  }

  return (
    <div
      className={`min-h-full overflow-y-auto ${
        isSidebarOpen ? "fixed inset-0 bg-richblack-800 z-50" : ""
      }`}
    >
      {/* Hamburger Menu for small screens */}
      <div className="md:hidden flex justify-end p-4">
        <button className="text-3xl text-white">
          {isSidebarOpen ? (
            <VscClose onClick={() => setIsSidebarOpen(false)} />
          ) : (
            <FiMenu onClick={() => setIsSidebarOpen(true)} />
          )}
        </button>
      </div>

      <div
        className={`flex flex-col border-r-[1px] border-richblack-700 h-[100%] bg-richblack-800 py-10 text-[#838894] gap-4 w-full min-h-screen justify-between ${
          isSidebarOpen ? "block" : "hidden"
        } md:flex`}
      >
        <div className="flex flex-col gap-3 h-full">
          {sidebarLinks.map((element) => {
            if (element.type && user?.accountType !== element.type) return null;
            return (
              <SidebarLinks
                key={element.id}
                e={element}
                iconName={element.icon}
                onClick={toggleSidebar}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-2">
          <div className="mx-auto mb-4 h-[1px] w-10/12 bg-richblack-600"></div>
          <div className="mx-auto h-[1px] w-10/12 bg-red-600"></div>
          <div className="flex flex-col">
            <SidebarLinks
              e={{ name: "Settings", path: "/dashboard/Settings" }}
              iconName={"VscSettingsGear"}
              onClick={toggleSidebar}
            />

            <button
              onClick={() =>
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
              }
              className="py-2 text-lg font-medium px-8 text-[#838894] ml-4 md:ml-8"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-lg" />
                <span>Logout</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );

  // return (
  //   <div className="relative">
  //     <button
  //       className="absolute top-4 left-4 md:hidden text-2xl text-white z-[10000]"
  //       onClick={() => setIsSidebarOpen(!isSidebarOpen)}
  //     >
  //       {!isSidebarOpen ? <VscMenu /> : <VscClose />}
  //     </button>
  //     <div
  //       className={`fixed md:relative w-full min-h-[100vh] bg-richblack-800 py-10 text-[#838894] gap-4 transform transition-transform duration-300  ${
  //         isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
  //       }`}
  //     >
  //       <div className="flex flex-col border-r-[1px] border-richblack-700 h-[100%] gap-4 w-full min-h-screen">
  //         <div className="flex flex-col gap-3 h-full">
  //           {sidebarLinks.map((element) => {
  //             if (element.type && user?.accountType !== element.type)
  //               return null;
  //             return (
  //               <SidebarLinks
  //                 key={element.id}
  //                 e={element}
  //                 iconName={element.icon}
  //               />
  //             );
  //           })}
  //         </div>

  //         <div className="mx-auto my-4 h-[1px] w-10/12 bg-richblack-600"></div>

  //         <div className="flex flex-col gap-2">
  //           <SidebarLinks
  //             e={{ name: "Settings", path: "/dashboard/settings" }}
  //             iconName={"VscSettingsGear"}
  //           />

  //           <button
  //             onClick={() =>
  //               setConfirmationModal({
  //                 text1: "Are you sure?",
  //                 text2: "You will be logged out of your account.",
  //                 btn1Text: "Logout",
  //                 btn2Text: "Cancel",
  //                 btn1Handler: () => dispatch(logout(navigate)),
  //                 btn2Handler: () => setConfirmationModal(null),
  //               })
  //             }
  //             className="px-8 py-2 text-lg font-medium text-[#838894]"
  //           >
  //             <div className="flex items-center gap-x-2">
  //               <VscSignOut className="text-lg" />
  //               <span>Logout</span>
  //             </div>
  //           </button>
  //         </div>
  //       </div>
  //       {confirmationModal && (
  //         <ConfirmationModal modalData={confirmationModal} />
  //       )}
  //     </div>
  //   </div>
  // );
};

export default Sidebar;
