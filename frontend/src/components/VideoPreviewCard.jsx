import React from "react";
import { BsCardImage } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function VideoPreviewCard({
  video,
  thumbnail,
  title,
  description,
  name,
}) {
  const theme = useSelector((state) => state.theme.theme); // Get the current theme

  const thumbnailSrc =
    thumbnail instanceof File ? URL.createObjectURL(thumbnail) : thumbnail;
  const videoSrc = video instanceof File ? URL.createObjectURL(video) : video;

  return (
    <div
      className={`w-full rounded-lg shadow-md overflow-hidden ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <div className="relative mb-2 w-full pt-[56%]">
        <div className="absolute inset-0">
          {thumbnailSrc && videoSrc ? (
            <img
              src={thumbnailSrc}
              alt="thumbnail-videocard"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex flex-col items-center justify-center">
              <BsCardImage className="w-full h-full" />
              <p
                className={`mt-2 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Please upload both Video and Thumbnail to see Preview
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h6
          className={`mb-2 font-semibold text-lg ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {title || "Video Title"}
        </h6>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          } mb-2`}
        >
          {description && description.length > 250
            ? `${description.substring(0, 250)}...`
            : description || "Video description ........"}
        </p>
        <p
          className={`text-sm ${
            theme === "dark" ? "text-gray-500" : "text-gray-600"
          }`}
        >
          By {name}
        </p>
      </div>
    </div>
  );
}
