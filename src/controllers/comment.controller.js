import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    const {videoId} = req.params;
    const {content} = req.body;

    if(!content){
        throw new ApiError("Content is required", 400);
    }
    
    const video = await Video.findById(videoId);
    
    if(!video){
        throw new ApiError(404,"Video does not exist" );
    }

    const comment = await Comment.create({
        content,
        video : videoId,
        owner : req.user._id
    })
    
    if(!comment){
        throw new ApiError(500, "Something went wrong while creating the comment");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200, content, "Comment created successfully")
    )

})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
