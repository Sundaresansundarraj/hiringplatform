const { where } = require('../config/database');
const Job = require('../models/Job');
const jwt = require('jsonwebtoken');
const { SECRETKEY } = process.env;
const { Op } = require('sequelize');

class jobService{
    static async postJob(request){
        try {
            const userId = request.user.user_id;
            const Jobdetail = await Job.create({  
              jobId:request.payload.jobId,             
                title:request.payload.title,
                description:request.payload.description,
                location:request.payload.location,
                companyId:request.payload.companyId,
                salaryMin:request.payload.salaryMin,
                salaryMax:request.payload.salaryMax,
                experience:request.payload.experience,
                user_id:userId
            });  
            const Jobdetails = {
              jobId:request.payload.jobId,
              title:request.payload.title,
              description:request.payload.description,
              location:request.payload.location,
              companyId:request.payload.companyId,
              // salaryMin:request.payload.salaryMin,
              // salaryMax:request.payload.salaryMax,
              experience:request.payload.experience,
              user_id:userId
            }
            const token = jwt.sign(Jobdetails,SECRETKEY);   
            return { success: true, status: 201, data: {details:Jobdetail,token:token}, message: 'Job created successfully' };
          } catch (err) {
            console.error(err);
            return { success: false, status: 500, message: 'Internal Server Error' };
          }
        }



 static async getJobs(request) {
    try {
      const users = await Job.findAll();
      return { success: true, status: 200, data: users, message: 'Jobs retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }


  static async getJobByJobid(request){
    try {
      const jobId = request.params.id
    
     const job = await Job.findOne({ where: { jobId:jobId } });

     if (!job) {
       return { success: false, status: 404, message: 'Job not found' };
     }

     return { success: true, status: 200, data: job, message: 'Job retrieved successfully' };
   } catch (err) {
     console.error(err);
     return { success: false, status: 500, message: 'Internal Server Error' };
   }
  }

  static async getJobById(request) {
    try {
       const title = request.payload.title
       const companyId = request.payload.companyId
      //  console.log(title,companyId)
      // const { title, companyId } = payload || {}; // Ensure payload is not undefined

      if (!title || !companyId) {
        throw new Error('Invalid input: title and companyId are required');
      }

      const job = await Job.findAll({ where: { title, companyId } });

      if (!job) {
        return { success: false, status: 404, message: 'Job not found' };
      }

      return { success: true, status: 200, data: job, message: 'Job retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }



static async updateJob(request) {
    try {
      // const title = request.user.user_id;
      // const companyid = request.title.companyId
      const jobid = request.user.jobId
      const { description } = request.payload;

      // Update user profile
      const job = await Job.update({ description }, { where: {jobId:jobid} });
      if (job[0] === 0) {
        return { success: false, status: 404, message: 'Job not found' };
      }

      return { success: true, status: 200, message: 'Job description updated successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

static async deleteJob(request) {
    try {
      // const title = request.title.title;
      // const companyid = request.title.companyId
      const jobid = request.user.jobId
      const job = await Job.destroy( { where: {jobId:jobid}  });
      if (job[0] === 0) {
        return { success: false, status: 404, message: 'Job not found' };
      }

      return { success: true, status: 200, message: 'Job deleted successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async searchJobs(queryParams) {
    try {
      const { title, companyId, location, salaryMin, salaryMax } = queryParams;

      // Build the search condition object
      const conditions = {};

      if (title) {
        conditions.title = { [Op.like]: `%${title}%` }; // Search for partial matches
      }

      if (companyId) {
        conditions.companyId = companyId;
      }

      if (location) {
        conditions.location = { [Op.like]: `%${location}%` };
      }

      if (salaryMin || salaryMax) {
        conditions.salary = {};
        if (salaryMin) conditions.salary[Op.gte] = salaryMin;
        if (salaryMax) conditions.salary[Op.lte] = salaryMax;
      }

      const jobs = await Job.findAll({ where: conditions });

      return { success: true, status: 200, data: jobs, message: 'Jobs retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }
}

module.exports = jobService
