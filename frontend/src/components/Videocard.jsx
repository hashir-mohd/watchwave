import React from "react";
import { useSelector } from "react-redux";
import { formatDuration, timeAgo } from "../assets/timeAgo";

function Videocard({ video }) {
  // Access the current theme from Redux
  const theme = useSelector((state) => state.theme.theme);

  return (
    <div className="w-full font-roboto ">
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          <img
            src={video?.thumbnail?.url}
            alt={video?.title}
            className="h-full w-full border-[#000000] rounded-xl object-cover"
          />
        </div>
        <span
          className={`absolute bottom-1 right-1 inline-block rounded px-1.5 text-sm ${
            theme === "dark" ? "bg-black text-white" : "bg-gray-200 text-black"
          }`}
        >
          {video && formatDuration(video?.duration)}
        </span>
      </div>
      <div className="flex gap-x-2">
        <div className="h-10 w-10 shrink-0">
          <img
            src={video?.ownerDetails?.avatar?.url}
            alt={video?.ownerDetails?.username}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <div className="w-full">
          <h6
            className={` ${
              theme === "dark" ? "text-white" : "text-black"
            }`}
            style={{ lineHeight: "1.2" }} // Adjusted line height
          >
            {video?.title}
          </h6>
          <span
            className={`flex text-xs ${
              theme === "dark" ? "text-gray-200" : "text-gray-600"
            }`} // Reduced font size to 'text-xs'
          >
            {video?.ownerDetails?.username}
          </span>
          <p
            className={`text-xs ${
              theme === "dark" ? "text-gray-200" : "text-gray-600"
            }`} // Reduced font size to 'text-xs'
          >
            {video?.views} Views · {timeAgo(video?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Videocard;
