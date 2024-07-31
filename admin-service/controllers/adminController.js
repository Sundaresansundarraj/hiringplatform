const adminService = require('../services/adminService');
const Response = require('../response/Response');
class AdminControll{
  static async updateApplicationStatus(request, h) {
    try {
      const result = await adminService.updateApplicationStatus(request);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }
}

// const approveJob = async (request, h) => {
//   const jobId = request.params.id;
//   const { status } = request.payload;
//   try {
//     await adminService.approveJob(jobId, status);
//     return h.response({ message: 'Job status updated successfully' }).code(200);
//   } catch (error) {
//     return h.response({ message: error.message }).code(400);
//   }
// };

// const getReports = async (request, h) => {
//   try {
//     const reports = await adminService.getReports();
//     return h.response({ reports }).code(200);
//   } catch (error) {
//     return h.response({ message: error.message }).code(400);
//   }
// };

module.exports = AdminControll
