import React, { useState, useEffect } from "react";
import SpButton from "../SpButton";
import Logo from "../Logo";
import Button from "../Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogout } from "../../hooks/auth.hook";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/authSlice";

import { BiLike } from "react-icons/bi";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { IconContext } from "react-icons";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { setShowUploadVideo } from "../../features/uiSlice";
import Search from "./Search";
import ThemeToggle from "../ThemeToggle";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.user);
  const theme = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();
  const { mutateAsync: logout } = useLogout();

  const [sideBar, setSideBar] = useState(false);

  const handleLogout = async () => {
    const sessionStatus = await logout();
    if (sessionStatus) {
      dispatch(setUser(null));
    }
  };

  const handleUploadVideo = () => {
    navigate("/my-studio");
    dispatch(setShowUploadVideo(true));
  };

  const mobileSidebarItems = [
    {
      name: "Liked Videos",
      path: "/liked-videos",
      icon: <BiLike />,
    },
    {
      name: "My Channel",
      path: `/channel/${userData?.username}/videos`,
      icon: <GoDeviceCameraVideo />,
    },
    {
      name: "Support",
      path: "/support",
      icon: <RxQuestionMarkCircled />,
    },
    {
      name: "Settings",
      path: "/edit-profile/personal-info",
      icon: <CiSettings />,
    },
  ];

  const handleSideBar = () => {
    setSideBar((prev) => !prev);
  };

  useEffect(() => {
    setSideBar(false);
  }, [location.pathname]);

  return (
    <header
      className={`z-[9999] sticky inset-x-0 top-0 w-full border-b px-4 ${
        theme === "dark"
          ? "bg-[#000000] text-white border-[#121212]"
          : "bg-white text-black border-gray-200"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center py-2">
        <Link to="/" className="flex items-center w-2/12">
          <Logo className="shrink-0 sm:w-[8rem]" mobile={true} />
        </Link>

        <Search />

        <ThemeToggle />

        <button
          onClick={handleSideBar}
          className="cursor-pointer group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden"
        >
          <span
            className={`block h-[2px] w-full ${
              theme === "dark" ? "bg-white" : "bg-black"
            } group-hover:bg-[#00bcd4]`}
          ></span>
          <span
            className={`block h-[2px] w-2/3 ${
              theme === "dark" ? "bg-white" : "bg-black"
            } group-hover:bg-[#00bcd4]`}
          ></span>
          <span
            className={`block h-[2px] w-full ${
              theme === "dark" ? "bg-white" : "bg-black"
            } group-hover:bg-[#00bcd4]`}
          ></span>
        </button>

        <div
          className={`fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 ${
            sideBar ? "translate-x-0" : "translate-x-full"
          } flex-col duration-200 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 ${
            theme === "dark"
              ? "bg-[#121212] border-white"
              : "bg-white border-gray-200"
          }`}
        >
          <div
            className={`relative flex w-full h-[4rem] items-center justify-end px-4 py-2 sm:hidden ${
              theme === "dark"
                ? "border-b border-white"
                : "border-b border-gray-200"
            }`}
          >
            <button
              onClick={handleSideBar}
              className="inline-block cursor-pointer"
            >
              <IoIosCloseCircleOutline
                className={`w-9 h-9 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              />
            </button>
          </div>

          <IconContext.Provider value={{ className: "w-6 h-6" }}>
            <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
              {mobileSidebarItems.map((item, index) => (
                <li key={index} className="w-full">
                  <Link
                    to={item.path}
                    className={`flex w-full items-center justify-start gap-x-4 px-4 py-1.5 text-left border ${
                      theme === "dark"
                        ? "border-white hover:bg-[#00bcd4] hover:text-black focus:bg-[#00bcd4]"
                        : "border-gray-200 hover:bg-gray-100 focus:bg-gray-100"
                    }`}
                  >
                    <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </IconContext.Provider>

          <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
            {authStatus ? (
              <button
                className={` p-3 rounded-full flex items-center justify-center ${
                  theme === "dark"
                    ? "bg-[#10c1f3] hover:bg-slate-400 text-white"
                    : "bg-[#10c1f3] hover:bg-gray-300 text-black"
                }`}
                onClick={handleUploadVideo}
              >
                {" "}
                <MdOutlineVideoLibrary size={24} />
              </button>
            ) : (
              <Button onClick={handleUploadVideo}>
                {" "}
                <MdOutlineVideoLibrary size={24} />
              </Button>
            )}

            {authStatus && userData && (
              <>
                <button
                  className={` p-3 rounded-full flex items-center justify-center ${
                    theme === "dark"
                      ? "bg-[#f20f0f] hover:bg-slate-400 text-white"
                      : "bg-[#f20f0f] hover:bg-gray-300 text-black"
                  }`}
                  onClick={handleLogout}
                >
                  <FiLogOut size={20} />
                </button>
                <div className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0">
                  <Link
                    to={`/channel/${userData?.username}/videos`}
                    className="flex w-full gap-4 text-left sm:items-center"
                  >
                    <img
                      src={userData.avatar?.url}
                      alt={userData.username}
                      className="object-cover h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
                    />
                    <div className="w-full pt-2 sm:hidden">
                      <h6 className="font-semibold">{userData.fullName}</h6>
                      <p className="text-sm text-gray-300">
                        {userData.username}
                      </p>
                    </div>
                  </Link>
                </div>
              </>
            )}

            {!authStatus && (
              <>
                <Link to="/login">
                  <SpButton>Log in</SpButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
