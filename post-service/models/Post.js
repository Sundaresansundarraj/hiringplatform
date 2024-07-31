const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
    postId:{
        type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId:{
        type: DataTypes.INTEGER,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    likes:{
        type: DataTypes.JSON, // Storing an array of user IDs who liked the post
        defaultValue: []
    },
    likeCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    comment:{
        type: DataTypes.JSON, // Storing an array of user IDs who liked the post
      defaultValue: []
    },
    commentCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      shareCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
    share:{
        type: DataTypes.JSON, // Storing an array of user IDs who liked the post
      defaultValue: []
    },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

module.exports = Post;

// models/Post.js
// src/models/postModel.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Configure your Sequelize instance here

// const Post = sequelize.define('Post', {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     imageUrl: {
//         type: DataTypes.STRING,
//         allowNull: true
//     }
// }, {
//     timestamps: true
// });

// module.exports = Post;



