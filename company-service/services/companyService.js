const Company = require('../models/Company');
const jwt = require('jsonwebtoken');
const { SECRETKEY } = process.env;
const { where } = require('../config/database');
class CompanyService{
    static async createCompany(request){
        try {
            const userId = request.user.user_id;
            console.log(userId)
            const Companydetail = await Company.create({               
                name:request.payload.name,
                description:request.payload.description,
                location:request.payload.location,
                companyId:request.payload.companyId,
                user_id:userId
            });   
            const Companydetails = {
                name:request.payload.name,
                description:request.payload.description,
                location:request.payload.location,
                companyId:request.payload.companyId,
                user_id:userId
            }
            const token = jwt.sign(Companydetails,SECRETKEY);   
            return { success: true, status: 201, data: {details:Companydetail,token:token}, message: 'Company created successfully' };
          } catch (err) {
            console.error(err);
            return { success: false, status: 500, message: 'Internal Server Error' };
          }
        }



 static async getCompanies(request) {
    try {
      const users = await Company.findAll();
      return { success: true, status: 200, data: users, message: 'Company retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }


static async getCompanyById(request) {
    try {
        const { name } = request.payload;
        // console.log(name)
      const company = await Company.findAll({ where: { name: name } });
      // console.log(company)
      if (!company) {
        return { success: false, status: 404, message: 'job not found' };
      }

      return { success: true, status: 200, data: company, message: 'company retrieved successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

  static async getCompanyBycomapnyid(request){
    try {
      const companyId = request.params.id
      console.log(companyId)
     const company = await Company.findByPk(companyId);

     if (!company) {
       return { success: false, status: 404, message: 'Job not found' };
     }

     return { success: true, status: 200, data: company, message: 'company retrieved successfully' };
   } catch (err) {
     console.error(err);
     return { success: false, status: 500, message: 'Internal Server Error' };
   }
  }


static async updateCompany(request) {
    try {
      const user_id = request.user.user_id;
      const { description } = request.payload;

      // Update user profile
      const company = await Company.update({ description }, { where: { user_id: user_id } });
      if (company[0] === 0) {
        return { success: false, status: 404, message: 'company not found' };
      }

      return { success: true, status: 200, message: 'company description updated successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }

static async deleteCompany(request) {
    try {
      const user_id = request.user.user_id;
      const job = await Company.destroy( { where: { user_id: user_id } });
      if (job[0] === 0) {
        return { success: false, status: 404, message: 'Job not found' };
      }

      return { success: true, status: 200, message: 'Job deleted successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, status: 500, message: 'Internal Server Error' };
    }
  }
}

module.exports = CompanyService
