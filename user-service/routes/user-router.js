const UserController = require('../controllers/user-controller');
const Validation = require('../validations/validation');
const tokenVerification = require('../authentication/token-verfy');
const isAdmin = require('../middleware/admin');



module.exports = [
  {
    method: 'POST',
    path: '/register',
    handler: UserController.signup,
    options: {
      validate: {
        payload: Validation.registerValidation,
        failAction: (request, h, error) => {
          // Handle validation errors
          return h.response({
            status: 'fail',
            message: error.details[0].message,
          }).takeover().code(400);
      },
    },
  },
},
  {
    method: 'POST',
    path: '/login',
    handler: UserController.login,
    options: {
      validate: {
        payload: Validation.loginValidation,
        failAction: (request, h, error) => {
          // Handle validation errors
          return h.response({
            status: 'fail',
            message: error.details[0].message,
          }).takeover().code(400);
      }
      },
    },
  },
  {
    method: 'GET',
    path: '/getallusers',
    handler: UserController.getAllUser,
    options: {
      pre: [{ method: tokenVerification }, { method: isAdmin }],
    },
  },
  {
    method: 'GET',
    path: '/getspecficUser',
    handler: UserController.getSpecficUser,
    options: {
      pre: [tokenVerification],
    },
  },
  {
    method: 'GET',
    path: '/getspecficUserbyuserid/{id}',
    handler: UserController.getspecficUserByuserid,
  },
  {
    method: 'PUT',
    path: '/UpdateProfile',
    handler: UserController.updateUser,
    options: {
      pre: [tokenVerification],
      validate: {
        payload: Validation.updateProfileValidation,
        failAction: (request, h, error) => {
          // Handle validation errors
          return h.response({
            status: 'fail',
            message: error.details[0].message,
          }).takeover().code(400);
      }
      },
    },
  },
  {
    method: 'POST',
    path: '/forgetPassword',
    handler: UserController.forgetPassword,
    options: {
      validate: {
        payload: Validation.forgetPasswordValidation,
        failAction: (request, h, error) => {
          // Handle validation errors
          return h.response({
            status: 'fail',
            message: error.details[0].message,
          }).takeover().code(400);
      }
      },
    },
  },
  {
    method: 'POST',
    path: '/sentotp',
    handler: UserController.generateAndSendOTP,
    options: {
      pre: [tokenVerification],
    },
  },
  {
    method: 'POST',
    path: '/verifypassword',
    handler: UserController.verifypassword,
    options: {
      pre: [tokenVerification],
    },
  },
  {
    method: 'PUT',
    path: '/resetPassword',
    handler: UserController.resetPassword,
    options: {
        pre: [tokenVerification],
      validate: {
        payload: Validation.resetPasswordValidation,
        failAction: (request, h, error) => {
          // Handle validation errors
          return h.response({
            status: 'fail',
            message: error.details[0].message,
          }).takeover().code(400);
      }
      },
    },
  },
];
