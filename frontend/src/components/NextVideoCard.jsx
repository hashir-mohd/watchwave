import React from "react";
import { formatDuration, timeAgo } from "../assets/timeAgo";
import { useSelector } from "react-redux";

function NextVideoCard({ video }) {
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      <div className="w-full gap-x-2 border pr-2 md:flex">
        <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
          <div className="w-full pt-[56%]">
            <div className="absolute inset-0">
              <img
                src={video?.thumbnail?.url}
                alt={video?.title}
                className="h-full w-full"
              />
            </div>
            <span
              className={`absolute bottom-1 right-1 inline-block rounded px-1.5 text-sm ${
                theme === "dark"
                  ? "bg-gray-800 text-gray-200"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {formatDuration(video?.duration)}
            </span>
          </div>
        </div>
        <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
          <div className="h-12 w-12 shrink-0 md:hidden">
            <img
              src={video?.ownerDetails?.avatar?.url}
              alt="User avatar"
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="w-full pt-1 md:pt-0">
            <h6
              className={`mb-1 text-sm font-semibold ${
                theme === "dark" ? "text-gray-200" : "text-gray-600"
              }`}
            >
              {video?.title} 
            </h6>
            <p
              className={`mb-0.5 mt-2 text-sm ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {video?.ownerDetails?.username}
            </p>
            <p
              className={`flex text-xs ${
                theme === "dark" ? "text-gray-200" : "text-gray-600"
              }`}
            >
              {video?.views} Views · {timeAgo(video?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default NextVideoCard;
