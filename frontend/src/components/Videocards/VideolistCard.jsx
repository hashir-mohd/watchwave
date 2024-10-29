import React from "react";
import { useSelector } from "react-redux";
import { formatDuration, timeAgo } from "../../assets/timeAgo";

const VideolistCard = ({ video, owner }) => {
  // Access the current theme from Redux
  const theme = useSelector((state) => state.theme.theme);

  return (
    <>
      {video && (
        <div
          className={`w-full max-w-3xl gap-x-4 md:flex ${
            theme === "dark" ? "bg-[#121212]" : "bg-white"
          }`}
        >
          <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
            <div className="w-full pt-[56%]">
              <div className="absolute inset-0">
                <img
                  src={video?.thumbnail?.url}
                  alt={video?.title}
                  className="h-full w-full object-cover rounded-lg"
                />
              </div>
              <span
                className={`absolute bottom-1 right-1 inline-block rounded px-1.5 text-sm ${
                  theme === "dark"
                    ? "bg-black text-white"
                    : "bg-gray-900 text-white"
                }`}
              >
                {formatDuration(video?.duration)}
              </span>
            </div>
          </div>
          <div className="flex gap-x-2 md:w-7/12">
            <div className="h-10 w-10 shrink-0 md:hidden">
              <img
                src={video?.ownerDetails?.avatar?.url || owner?.avatar?.url}
                alt={video?.ownerDetails?.username || owner?.username}
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div className="w-full">
              <h6
                className={`mb-1 font-semibold md:max-w-[75%] ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {video?.title}
              </h6>
              <p
                className={`flex text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                } sm:mt-3`}
              >
                {video?.views} Views · {timeAgo(video?.createdAt)}
              </p>
              <div className="flex items-center gap-x-4">
                <div className="mt-2 hidden h-10 w-10 shrink-0 md:block">
                  <img
                    src={video?.ownerDetails?.avatar?.url || owner?.avatar?.url}
                    alt={video?.ownerDetails?.username || owner?.username}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
                <p
                  className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {video?.ownerDetails?.username || owner?.username}
                </p>
              </div>
              <p
                className={`mt-2 hidden text-sm md:block ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {video?.description?.length > 100
                  ? video?.description.slice(0, 100) + "..."
                  : video?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideolistCard;
