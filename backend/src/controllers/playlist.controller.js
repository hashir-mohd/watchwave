import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body
    if(!name){
        throw new ApiError(400, "Name is required")
    }
    const playlist = await Playlist.create({
        name,
        description,
        owner: req.user?._id
    })
    if(!playlist){
        throw new ApiError(500, "Error creating playlist")
    }
    return res
    .status(201)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"))
    
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    if(!isValidObjectId(userId)){
        throw new ApiError(400, "Invalid user id")
    }
    
    const playlist = await Playlist.aggregate([
        {
            $match:{
                owner : new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup:{
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "videos"
            }
        },
        {
            $addFields:{
                totalVideos: {
                    $size: "$videos"
                }
            }
        },
        {
            $project:{
                _id:1,
                name:1,
                description:1,
                totalVideos:1,
                updatedAt:1,
            }
        }
    ])

    return res
    .status(200)
    .json(new ApiResponse(200, playlist, "User's playlists fetched successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    

  if (!isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid playlistId");
  }

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  const playlistVideos = await Playlist.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(playlistId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },
    {
      $unwind: "$videos",
    },
    {
      $project: {
        _id: 1,
        name: 1,
        description: 1,
        videoId: "$videos._id",
        videoTitle: "$videos.title",
        videoDescription: "$videos.description",
        videoThumbnail: "$videos.thumbnail",
        videoDuration: "$videos.duration",
        videoUploadDate: "$videos.uploadDate",
      },
    },
  ])

  if(playlistVideos[0] === undefined){
    return res.status(200).json(new ApiResponse(200, [], "playlist fetched successfully"))
 } 
  return res
    .status(200)
    .json(
      new ApiResponse(200, playlistVideos, "playlist fetched successfully")
    );
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if(!isValidObjectId(playlistId) || isValidObjectId(videoId)){
        throw new ApiError(400, "Invalid playlist or video id")
    }

    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(404, "Playlist does not exist")
    }
    
    const video = await Video.findById(videoId)
    if(!video){
        throw new ApiError(404, "Video does not exist")
    }

    if(playlist.owner?.toString() !== req.user?._id.toString()){
        throw new ApiError(403, "Unauthorized to add video to this playlist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $addToSet:{
                videos: videoId
            }
        },
        {
            new: true
        }
    )
    if(!updatedPlaylist){
        throw new ApiError(500, "Error updating playlist")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Video added to playlist successfully"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params;
    if (!isValidObjectId(playlistId) || !isValidObjectId(videoId)) {
      throw new ApiError(400, "Invalid playlistId or videoId");
    }
  
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      throw new ApiError(404, "Playlist not found");
    }
  
    const video = await Video.findById(videoId);
    if (!video) {
      throw new ApiError(404, "Video not found");
    }
  
    if (playlist.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "Only owner can remove video from playlist");
    }
  
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $pull: {
          videos: videoId,
        },
      },
      { new: true }
    );
  
    if (!updatedPlaylist) {
      throw new ApiError(500, "Failed to remove video from playlist");
    }
  
    return res
      .status(200)
      .json(new ApiResponse(200, updatedPlaylist, "Video removed from playlist"));
  });

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    if(!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Playlist id is required")
    }
    const deletePlaylistRequest = await Playlist.findByIdAndDelete(playlistId)
    if(!deletePlaylistRequest){
        throw new ApiError(404, "Playlist not found")
    }

    return res
   .status(200)
   .json(new ApiResponse(200, deletePlaylistRequest, "Playlist deleted successfully"))

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params;
    const { name, description } = req.body;
  
    if (
      [name, description].some(
        (field) => field === undefined || field?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fields are required");
    }
  
    if (!isValidObjectId(playlistId)) {
      throw new ApiError(400, "Invalid playlistId");
    }
  
    const playlist = await Playlist.findById(playlistId);
  
    if (!playlist) {
      throw new ApiError(404, "Playlist not found");
    }
  
    if (playlist.owner.toString() !== req.user._id.toString()) {
      throw new ApiError(401, "Only owner can update playlist");
    }
  
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      playlistId,
      {
        $set: {
          name,
          description,
        },
      },
      { new: true }
    );
  
    if (!updatedPlaylist) {
      throw new ApiError(500, "Failed to update playlist");
    }
  
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedPlaylist, "Playlist updated successfully")
      );
  });

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
