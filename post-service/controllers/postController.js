const Boom = require('@hapi/boom');
const postService = require('../services/postService');
const Post =require("../models/Post")
const Sequelize = require('../config/database');
class postcontroller{


static async createpost(request, h){
     
    try {
        const uploadedFile = await postService.createpost(request);
        return h.response({ message: 'File uploaded successfully', file: uploadedFile }).code(200);
    } catch (error) {
        throw Boom.badRequest(error.message);
    }
};

static async updateLikepost(request, h){
    console.log("sss")
    const postId  = request.params.id;
    const userId = request.user.user_id
    
    try {
        // Fetch the post
        const post = await Post.findByPk(postId);
        if (!post) {
          throw Boom.notFound('Post not found');
        }
      
    
        // Check if the user already liked the post
        // const likes = post.likes || [];
        if (post.likes.includes(userId)) {
           const cc=[...post.likes]
            
           const vv =cc.pop(userId)
          
           post.likes = cc
            post.likeCount = post.likes.length ;
        
            // Save the post
            await post.save();
            return h.response({ message: 'post already liked by u',post }).code(200);}
        //   throw Boom.conflict('User already liked this post');
        //   return h.response({ message: 'post already liked by u' }).code(400);
        
    
        if (!post.likes.includes(userId)) {
        post.likes=[...post.likes,userId];
        
        post.likeCount = post.likes.length ;
    
        
        await post.save();}
    
        return h.response({ message: 'Post liked successfully', post }).code(200);
        
        

      } catch (err) {
        return Boom.badImplementation(err);
      }
  };
  static async updatecommentpost(request, h){
    const postId  = request.params.id;
    const userId = request.user.user_id
    const text = request.payload.text
  
    try {
        // Fetch the post
        const post = await Post.findByPk(postId);
        if (!post) {
          throw Boom.notFound('Post not found');
        }
       const nn = [userId,text]
       post.comment = [...post.comment,nn]
        
        post.commentCount = post.comment.length;
    
        await post.save();
    
        return h.response({ message: 'comment added successufully', post }).code(200);
      } catch (err) {
        return Boom.badImplementation(err);
      }
  };
  static async updatesharepost(request, h){
    const postId  = request.params.id;
    const userId = request.user.user_id
    const toid = request.payload.toid
    try {
        const post = await Post.findByPk(postId);
        if (!post) {
          throw Boom.notFound('Post not found');
        }  
        const nn = [userId,toid,postId]
       post.share = [...post.share,nn]
        post.shareCount =post.share.length;
        await post.save();
    
        return h.response({ message: 'Post liked successfully', post }).code(200);
      } catch (err) {
        return Boom.badImplementation(err);
      }
  };
}

module.exports = postcontroller







