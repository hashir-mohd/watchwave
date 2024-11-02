import React, { useEffect } from "react";
import { setSideBarFullSize } from "../features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useChannelStats } from "../hooks/studio.hook";
import { VideoStats, UploadVideo, EditVideo } from "../components/index.js";
import { setShowUploadVideo } from "../features/uiSlice";

import { FaRegEye } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { BiSolidVideos } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { IconContext } from "react-icons";

function MyStudio() {
  const dispatch = useDispatch();
  const channelInfo = useSelector((state) => state.auth.user);
  const showEdit = useSelector((state) => state.ui.showEditVideo);
  const showUpload = useSelector((state) => state.ui.showUploadVideo);
  const videoForEdit = useSelector((state) => state.video.videoForEdit);
  const theme = useSelector((state) => state.theme.theme); // Added theme selection

  useEffect(() => {
    dispatch(setSideBarFullSize(false));

    return () => {
      dispatch(setSideBarFullSize(true));
    };
  }, [dispatch]);

  const { data: channelStats, isLoading: statsLoading } = useChannelStats();

  const channelStatsItems = [
    {
      icon: <FaRegEye />,
      title: "Total views",
      value: channelStats?.totalViews,
    },
    {
      icon: <FaUserFriends />,
      title: "Total subscribers",
      value: channelStats?.totalSubscribers,
    },
    {
      icon: <FaHeart />,
      title: "Total likes",
      value: channelStats?.totalLikes,
    },
    {
      icon: <BiSolidVideos />,
      title: "Total videos",
      value: channelStats?.totalVideos,
    },
  ];

  const handleUploadVideoClick = () => {
    dispatch(setShowUploadVideo(true));
  };

  return (
    <div
      className={`mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8 ${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-wrap justify-between gap-4">
        <div className="block">
          <h1
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
          >
            Welcome Back, {channelInfo?.fullName}
          </h1>
          <p
            className={`text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Seamless Video Management, Elevated Results.
          </p>
        </div>
        <div className="block">
          <button
            onClick={handleUploadVideoClick}
            className="inline-flex border-collapse rounded-xl items-center gap-x-2 bg-[#00bcd4] px-3 py-2 font-semibold text-black"
          >
            <CiSquarePlus className="text-black font-bold text-2xl" />
            Upload video
          </button>
        </div>
      </div>

      <div
        className={`grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 ${
          theme === "dark" ? "bg-[#121212]" : "bg-white"
        }`}
      >
        <IconContext.Provider value={{ className: "text-2xl font-bold" }}>
          {channelStatsItems.map((item, index) => (
            <div
              key={index}
              className={`border p-4 ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <div className="mb-4 block">
                <span className="h-9 w-9 flex justify-center items-center rounded-full bg-[#E4D3FF] p-1 text-[#00bcd4]">
                  {item.icon}
                </span>
              </div>
              <h6
                className={`text-gray-300 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-800"
                }`}
              >
                {item.title}
              </h6>
              <p
                className={`text-3xl font-semibold ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </IconContext.Provider>
      </div>

      {/* {These are the modals only shown when their respective state in store changes} */}
      {showUpload && <UploadVideo />}
      {showEdit && videoForEdit && <EditVideo />}

      <VideoStats />
    </div>
  );
}

export default MyStudio;
