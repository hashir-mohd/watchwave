import React, { useState, useMemo } from "react";
import { useChannelVideos } from "../hooks/studio.hook";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { setShowEditVideo } from "../features/uiSlice";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector here
import { MdSearch } from "react-icons/md";
import { useDeleteVideo, useTogglePublish } from "../hooks/video.hook";
import DeletePopup from "./DeletePopup";
import { setVideoForEdit } from "../features/videoSlice";
import VideoStatsSkeleton from "./Loading/VideoStatsSkeleton";

function VideoStats() {
  const dispatch = useDispatch();
  const [deletePopupId, setDeletePopupId] = useState(null);
  const { data: channelVideos, isFetching } = useChannelVideos();
  const { mutateAsync: toggleVideoPublishStatus } = useTogglePublish();
  const { mutateAsync: deleteVideo, isPending: isDeleting } = useDeleteVideo();
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useSelector((state) => state.theme.theme);

  const togglePublishStatus = async (videoId) => {
    await toggleVideoPublishStatus(videoId);
  };

  const handleDelete = (videoId) => {
    setDeletePopupId(videoId);
  };

  const deleteConfirm = async (videoId) => {
    await deleteVideo(videoId);
    setDeletePopupId(null);
  };

  const handleEdit = (video) => {
    dispatch(setVideoForEdit(video));
    dispatch(setShowEditVideo(true));
  };

  const filteredVideos = useMemo(() => {
    return channelVideos?.filter((video) =>
      video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [channelVideos, searchTerm]);

  return (
    <>
      <div
        className={`relative ${
          theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
        }`}
      >
        <input
          className={`${
            theme === "dark" ? "bg-[#121212] text-white" : "bg-white text-black"
          } w-full peer border-2 border-gray-300 focus:border-[#00bcd4] bg-transparent py-2 pl-10 pr-4 rounded-md placeholder-gray-400 outline-none transition-all duration-300 focus:shadow-lg`}
          placeholder="Search videos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MdSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-[#00bcd4]"
          size={20}
        />
      </div>
      <div
        className={`overflow-x-auto rounded-lg md:block hidden ${
          theme === "dark" ? "border-gray-600" : "border-gray-200"
        }`}
      >
        <table
          className={`w-full min-w-[1200px] border-collapse border ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          <thead>
            <tr>
              <th
                className={`border-collapse border-b p-4 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-200"
                }`}
              >
                Status
              </th>
              <th
                className={`border-collapse border-b p-4 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-200"
                }`}
              >
                Status
              </th>
              <th
                className={`border-collapse border-b p-4 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-200"
                }`}
              >
                Uploaded
              </th>
              <th
                className={`border-collapse border-b p-4 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-200"
                }`}
              >
                Rating
              </th>
              <th
                className={`border-collapse border-b p-4 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-200"
                }`}
              >
                Date uploaded
              </th>
              <th
                className={`border-collapse border-b p-4 ${
                  theme === "dark" ? "border-gray-600" : "border-gray-200"
                }`}
              ></th>
            </tr>
          </thead>
          <tbody>
            {filteredVideos &&
              filteredVideos.map((video) => (
                <tr
                  className={`group border ${
                    theme === "dark" ? "border-gray-600" : "border-gray-200"
                  }`}
                  key={video._id}
                >
                  <td
                    className={`border-collapse border-b ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    } px-4 py-3 group-last:border-none whitespace-nowrap`}
                  >
                    <div className="flex justify-center">
                      <label className="relative inline-block w-12 cursor-pointer ">
                        <input
                          type="checkbox"
                          className="peer sr-only"
                          checked={video?.isPublished}
                          onChange={() => togglePublishStatus(video._id)}
                        />
                        <span className="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#00bcd4] peer-checked:after:left-7"></span>
                      </label>
                    </div>
                  </td>
                  <td
                    className={`border-collapse border-b ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    } px-4 py-3 group-last:border-none whitespace-nowrap`}
                  >
                    <div className="flex justify-center">
                      <span
                        className={`inline-block rounded-2xl border px-1.5 py-0.5 ${
                          video?.isPublished
                            ? "border-green-600 text-green-600"
                            : "border-orange-600 text-orange-600"
                        }`}
                      >
                        {video?.isPublished ? "Published" : "Unpublished"}
                      </span>
                    </div>
                  </td>

                  <td
                    className={`border-collapse border-b ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    } px-4 py-3 group-last:border-none whitespace-nowrap`}
                  >
                    <div className="flex items-center gap-4">
                      {deletePopupId === video._id && (
                        <DeletePopup
                          onDeleteConfirm={() => deleteConfirm(video._id)}
                          onCancel={() => setDeletePopupId(null)}
                          isDeleting={isDeleting}
                          type={"Video"}
                        />
                      )}
                      <img
                        className="h-10 w-14 rounded-md object-cover"
                        src={video?.thumbnail.url}
                        alt={video?.title}
                      />
                      <h3 className="font-semibold text-center">
                        {video?.title}
                      </h3>
                    </div>
                  </td>
                  <td
                    className={`border-collapse border-b ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    } px-4 py-3 group-last:border-none whitespace-nowrap`}
                  >
                    <div className="flex justify-center gap-4">
                      <span className="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                        {video?.likesCount} likes
                      </span>
                    </div>
                  </td>
                  <td
                    className={`text-center border-collapse border-b ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    } px-4 py-3 group-last:border-none whitespace-nowrap`}
                  >
                    {new Date(video?.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td
                    className={`border-collapse border-b ${
                      theme === "dark" ? "border-gray-600" : "border-gray-200"
                    } px-4 py-3 group-last:border-none whitespace-nowrap`}
                  >
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(video)}
                        className="h-5 w-5 hover:text-[#00bcd4]"
                      >
                        <MdModeEditOutline className="w-6 h-6" />
                      </button>
                      <button
                        className="h-5 w-5 hover:text-[#00bcd4]"
                        onClick={() => handleDelete(video._id)}
                      >
                        <MdDelete className="w-6 h-6" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div
        className={`md:hidden flex flex-wrap justify-between ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {filteredVideos &&
          filteredVideos.map((video) => (
            <div
              key={video._id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <div
                className={`flex flex-col border-white border border-dashed rounded-lg shadow-md overflow-hidden ${
                  theme === "dark"
                    ? "bg-[#000000] text-white"
                    : "bg-white text-black"
                }`}
              >
                <div className="p-4 gap-3 flex flex-col">
                  <img
                    className="h-40 w-full rounded-md object-cover"
                    src={video?.thumbnail.url}
                    alt={video?.title}
                  />
                  <h3 className="font-semibold">{video?.title}</h3>
                  <span
                    className={`inline-block rounded-2xl border px-1.5 py-0.5 ${
                      video?.isPublished
                        ? "border-green-600 text-green-600"
                        : "border-orange-600 text-orange-600"
                    }`}
                  >
                    {video?.isPublished ? "Published" : "Unpublished"}
                  </span>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleEdit(video)}
                      className="text-[#00bcd4]"
                    >
                      Edit
                    </button>
                    <button
                      className="text-[#00bcd4]"
                      onClick={() => handleDelete(video._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {/* {isFetching && <VideoStatsSkeleton />} */}
    </>
  );
}

export default VideoStats;
