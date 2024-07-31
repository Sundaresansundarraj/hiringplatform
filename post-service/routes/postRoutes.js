// src/routes/postRoutes.js
const postController = require('../controllers/postController');
const auth = require("../authentication/token-verfy")

module.exports = [
    {
        method: 'POST',
        path: '/upload',
        options: {
            pre: [{ method: auth.tokenVerificationForUser }, { method: auth.tokenVerificationForjob }],
          
            payload: {
                maxBytes: 10485760, // 10MB limit
                output: 'file',
                parse: true,
                multipart: true,
                allow: 'multipart/form-data',
            },
            handler: postController.createpost
    }},
    {
        method: 'POST',
        path: '/posts/{id}/like',
        handler: postController.updateLikepost,
        options: {
            pre: [{ method: auth.tokenVerificationForUser }],
          },
      },
      {
        method: 'POST',
        path: '/posts/{id}/comment',
        handler: postController.updatecommentpost,
        options: {
            pre: [auth.tokenVerificationForUser],
          }
      },
      {
        method: 'POST',
        path: '/posts/{id}/share',
        handler: postController.updatesharepost,
        options: {
            pre: [auth.tokenVerificationForUser],
          }
      }
];





