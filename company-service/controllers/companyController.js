const companyService = require('../services/companyService');
const Message = require("../messages/Message")
const Httpcode = require("../codes/httpCodes")
const Response = require('../response/Response');
class CompanyController{
    static async createCompany(request, h) {
        try {
          const result = await companyService.createCompany(request);
          if (!result.success) {
            return Response.error(request, h, result.status, null, result.message);
          }
          return Response.success(request, h, result.status, result.data, result.message);
        } catch (err) {
          throw err;
        }
      }
      static async getCompanies(request, h) {
        try {
          const result = await companyService.getCompanies(request);
          if (!result.success) {
            return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[123]);
          }
          return Response.success(request, h, result.status, result.data, result.message);
        } catch (err) {
          throw err;
        }
      }

      static async getCompanyBycomapnyid(request, h) {
        try {
          const result = await companyService.getCompanyBycomapnyid(request);
    
          if (!result.success) {
            return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
          }
    
          return Response.success(request, h, result.status, result.data, result.message);
        } catch (err) {
          console.error(err);
          return Response.error(request, h, Httpcode.HTTP_INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
        }
      }

      static async getCompanyById(request, h) {
        try {
          // console.log(request.payload)
          // const payload = request.payload || {}; // For POST/PUT requests
          const result = await companyService.getCompanyById(request);
    
          if (!result.success) {
            return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
          }
    
          return Response.success(request, h, result.status, result.data, result.message);
        } catch (err) {
          console.error(err);
          return Response.error(request, h, Httpcode.HTTP_INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
        }
      }

      
      
  static async updateCompany(request, h) {
    try {
      const result = await companyService.updateCompany(request);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async deleteCompany(request, h) {
    try {
      const result = await companyService.deleteCompany(request);
      if (!result.success) {
        return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }
}



module.exports =CompanyController;
