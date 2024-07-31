const axios = require('axios');
// const Job = require('../models/Job');
// const Application = require('../../application-service/models/Application');
const {approvel} = require("../middleware/rabbitMq")
GETSEPCIFICUSER = process.env.GETSEPCIFICUSER
SER_API = process.env.SER_API
JOB_API = process.env.JOB_API
PPLICATION_API = process.env.PPLICATION_API
APPROVE_API = process.env.APPROVE_API
PANYID = process.env.COMPANYID
class AdminApprovel{
  static async updateApplicationStatus(request) {
    try {
      const applicationId = request.payload.applicationId 
      console.log("aa0",applicationId)
      const applicationResponse = await axios.post(PPLICATION_API, { applicationId :applicationId});
      const application = applicationResponse.data;
      const jobId = application.data.jobId;
      const userinApplication = application.data.userId
      console.log("user",userinApplication)
      console.log("aa1", jobId);

      const jobreasponse = await axios.post(JOB_API+jobId)
      const job = jobreasponse.data
      const user_id = job.data.user_id
      const jobTitle = job.data.title
      const companyid = job.data.companyId
      console.log("aa1", user_id);
     
      const comapnydetails = await axios.get(PANYID+companyid)
      const companydata = comapnydetails.data.data
      const comapnyname = companydata.name
      const companylocation = companydata.location
      console.log("bb",comapnyname)

      const respon = await axios.get(GETSEPCIFICUSER+userinApplication)
      const userres = respon.data
      const email_id = userres.data.email_id
      console.log("bb",email_id)
      const token = request.headers['authorization'];

      const response = await axios.get(SER_API, {
        headers: {
            'Authorization': token
        }})
        const user = response.data
        const userid = user.data.user_id
        console.log("aa1", userid);

        if(user_id === userid){
           console.log("okey")
          const aprove = await axios.put(APPROVE_API,{ applicationId:applicationId,status:"approve" })
          await approvel(userinApplication,email_id,comapnyname,companylocation,jobTitle)
          return { success: true, status: 200, message: 'updateApplicationStatus updated successfully' };
        }
        

        return { success: false, status: 400, message: 'notupdated updated successfully' };
      
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }
}

// const approveJob = async (jobId, status) => {
//   const job = await Job.update({ status }, { where: { id: jobId } });
//   return job;
// };

// const getReports = async () => {
//   // Implement logic to fetch various reports for admin
//   const reports = { /* reports data */ };
//   return reports;
// };

module.exports = AdminApprovel
