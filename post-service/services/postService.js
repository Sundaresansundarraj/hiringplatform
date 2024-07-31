const fs = require('fs');
const Path = require('path');
const Post =require("../models/Post")

class postService{
    static async createpost(request){
        const { payload } = request;
    const file = payload.file;
    const {title,likes,comment,share,likeCount,shareCount,commentCount,content} = payload
    const userId = request.user.user_id
    const companyId = request.title.companyId

        if (!file) {
            throw Boom.badRequest('No file uploaded');
        }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.headers['content-type'])) {
        throw new Error('Invalid file type');
    }

    const uploadPath = Path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
    }

    const filePath = Path.join(uploadPath, file.filename);
    await new Promise((resolve, reject) => {
        fs.createReadStream(file.path)
            .pipe(fs.createWriteStream(filePath))
            .on('finish', resolve)
            .on('error', reject);
    });

    const newFile = await Post.create({
        imageUrl: file.filename,
        title,likes,comment,share,likeCount,shareCount,commentCount,content,userId,companyId
    });

    return newFile;
};
//   static async updatepost(request){
//     const postId = request.payload
//     const userId = request.payload
    
//     if (!post) {
//         return h.response({ error: 'Post not found' }).code(404);
//       }
//       post.likes = post.likes || [];  
//     const post = Post.findByPk(postId)
//     const updatedpostdetails={
//         like: like || post.like
//     }

//     post.update(like?like||  post.like)


  }





module.exports = postService



