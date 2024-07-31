const UserService = require('../services/user-service');
const Message = require("../messages/Message")
const Httpcode = require("../codes/httpCodes")
const Response = require('../response/Response');

class UserController {
  static async signup(request, h) {
    try {
      const result = await UserService.signup(request.payload);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async login(request, h) {
    try {
      const result = await UserService.login(request.payload);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async forgetPassword(request, h) {
    try {
      const result = await UserService.forgetPassword(request.payload);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async generateAndSendOTP(request, h) {
    try {
      const result = await UserService.generateAndSendOTP(request);
      if (!result.success) {
        return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[123]);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async verifypassword(request, h) {
    try {
      const result = await UserService.verifypassword(request);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async resetPassword(request, h) {
    try {
      const result = await UserService.resetPassword(request);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async getAllUser(request, h) {
    try {
      const result = await UserService.getAllUsers(request);
      if (!result.success) {
        return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[123]);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async getspecficUserByuserid(request, h) {
    try {
      const result = await UserService.getspecficUserByuserid(request);
      if (!result.success) {
        return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async getSpecficUser(request, h) {
    try {
      const result = await UserService.getspecficUser(request);
      if (!result.success) {
        return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(request, h) {
    try {
      const result = await UserService.updateProfile(request);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserController;
