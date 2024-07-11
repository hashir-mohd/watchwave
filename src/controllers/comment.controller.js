import mongoose, { isValidObjectId } from "mongoose"
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
    /*
    1.check if comment exist or No
    2.check user Validity
    3.update the content
    4.save
    */
    
    const {commentId} = req.params;
    const {content} = req.body;
    
    if(!content){
        throw new ApiError( 400,"Content is required");
    }
    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid comment id");
    }

    const comment = await Comment.findById(commentId);
    if(!comment){
        throw new ApiError(404,"Comment does not exist");
    }
    
    if(comment?.owner.toString()!== req.user?._id.toString()){
        throw new ApiError(403, "You are not authorized to update this comment");
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content
            }
        },
        {new: true}
    )
    if(!updatedComment){
        throw new ApiError(500, "Something went wrong while updating the comment");
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, content, "Comment updated successfully")
    )
})

const deleteComment = asyncHandler(async (req, res) => {
    const {commentId} = req.params;
    const userid = req.user?._id;

    if(!isValidObjectId(commentId)){
        throw new ApiError(400, "Invalid comment id");
    }
    const comment = await Comment.findById(commentId);
    if(!comment){
        throw new ApiError(404,"Comment does not exist");
    }
    
    if(comment?.owner.toString()!== userid.toString()){
        throw new ApiError(403, "You are not authorized to delete this comment");
    }
    await Comment.findByIdAndDelete(commentId);
    return res
    .status(200)
    .json(
        new ApiResponse(200, null, "Comment deleted successfully")
    )
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
