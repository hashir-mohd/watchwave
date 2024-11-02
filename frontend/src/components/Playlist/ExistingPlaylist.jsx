import React from "react";
import { useSelector } from "react-redux";
import { usePlaylistById, usePlaylistsByUser } from "../../hooks/playlist.hook";
import PlaylistName from "./PlaylistName";
import ProgressBar from "../ProgressBar";

function ExistingPlaylist({ videoId }) {
  const userId = useSelector((state) => state.auth.user?._id);
  const theme = useSelector((state) => state.theme.theme); // Fetching the theme from Redux state

  const {
    data: existingPlaylists,
    isFetched,
    isFetching,
    isRefetching,
  } = usePlaylistsByUser(userId);

  if (isRefetching && !isFetched) {
    return <ProgressBar />;
  }

  return (
    <ul
      className={`mb-4 ${
        theme === "dark"
          ? "bg-[#121212] text-gray-200"
          : "bg-white text-gray-600"
      }`}
    >
      {isFetched && existingPlaylists?.length > 0 ? (
        existingPlaylists.map((playlist) => (
          <PlaylistName
            key={playlist._id}
            playlistId={playlist?._id}
            videoId={videoId}
            playlistName={playlist?.name}
          />
        ))
      ) : (
        <p>No playlists found</p>
      )}
    </ul>
  );
}

export default ExistingPlaylist;
