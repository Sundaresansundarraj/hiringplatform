const Application = require('../models/Application');
// const { where } = require('../config/database');
// const jwt = require('jsonwebtoken');
// const { SECRETKEY } = process.env;
class ApplicationService{

  // static async applyForJob(applicationData) {
  //   const application = await Application.create(applicationData);
  //   return application;
  // };
  static async applicationgetByApplicationid(request,h){
    try {
    const applicationId = request.payload.applicationId 
    const application = await Application.findOne({ where: { applicationId:applicationId } });

      if (!application) {
        return { success: false, status: 404, message: 'application not found' };
      }

      return { success: true, status: 200, data: application, message: 'application retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }
   
  static async getApplicationsByJob(request) {
    try {
       const jobId = request.payload.jobId
       

      const application = await Application.findAll({ where: { jobId:jobId } });

      if (!application) {
        return { success: false, status: 404, message: 'application not found' };
      }

      return { success: true, status: 200, data: application, message: 'application retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

static async updateApplicationStatus(request) {
    try {
      
        const applicationId = request.payload.applicationId
        const status = request.payload.status
        
      const updateApplicationStatus = await Application.update({ status }, { where: {applicationId:applicationId} });
      if (updateApplicationStatus[0] === 0) {
        return { success: false, status: 404, message: 'Application not found' };
      }

      return { success: true, status: 200, message: 'updateApplicationStatus updated successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async getApplicationsByUser(request) {
    try {
       const userId = request.payload.userId

      const application = await Application.findAll({ where: { userId:userId } });

      if (!application) {
        return { success: false, status: 404, message: 'application not found' };
      }

      return { success: true, status: 200, data: application, message: 'application retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

}






module.exports = ApplicationService
