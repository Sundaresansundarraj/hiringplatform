const jobService = require('../services/jobService');
const Message = require("../messages/Message")
const Httpcode = require("../codes/httpCodes")
const Response = require('../response/Response');
class jobController{
    static async postJob(request, h) {
        try {
          const result = await jobService.postJob(request);
          if (!result.success) {
            return Response.error(request, h, result.status, null, result.message);
          }
          return Response.success(request, h, result.status, result.data, result.message);
        } catch (err) {
          throw err;
        }
      }
      static async getJobs(request, h) {
        try {
          const result = await jobService.getJobs(request);
          if (!result.success) {
            return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[123]);
          }
          return Response.success(request, h, result.status, result.data, result.message);
        } catch (err) {
          throw err;
        }
      }

      static async getJobById(request, h) {
        try {
          // console.log(request.payload)
          // const payload = request.payload || {}; // For POST/PUT requests
          const result = await jobService.getJobById(request);
    
          if (!result.success) {
            return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
          }
    
          return Response.success(request, h, result.status, result.data, result.message);
        } catch (err) {
          console.error(err);
          return Response.error(request, h, Httpcode.HTTP_INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
        }
      }
      static async getJobByJobid(request, h) {
        try {
          const result = await jobService.getJobByJobid(request);
    
          if (!result.success) {
            return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
          }
    
          return Response.success(request, h, result.status, result.data, result.message);
        } catch (err) {
          console.error(err);
          return Response.error(request, h, Httpcode.HTTP_INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
        }
      }
      
  static async updateJob(request, h) {
    try {
      const result = await jobService.updateJob(request);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async deleteJob(request, h) {
    try {
      const result = await jobService.deleteJob(request);
      if (!result.success) {
        return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }
  static async searchJobs(request, h) {
    try {
      const queryParams = request.query || {}; 
      const result = await jobService.searchJobs(queryParams);

      if (!result.success) {
        return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, result.message);
      }

      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      console.error(err);
      return Response.error(request, h, Httpcode.HTTP_INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
    }
  }
}




module.exports = jobController
