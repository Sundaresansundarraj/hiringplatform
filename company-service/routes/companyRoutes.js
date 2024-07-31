const companyController = require('../controllers/companyController');
const tokenVerification = require('../authentication/token-verfy');
const isAdmin = require('../middleware/admin');
module.exports = [
  {
    method: 'POST',
    path: '/api/companies',
    handler: companyController.createCompany,
    options: {
      pre: [{ method: tokenVerification.tokenVerificationForUser },{ method: isAdmin }]
  },
  },
  {
    method: 'GET',
    path: '/api/companies',
    handler: companyController.getCompanies,
  },
  {
    method: 'GET',
    path: '/api/companies/{id}',
    handler: companyController.getCompanyBycomapnyid,
  },
  {
    method: 'POST',
    path: '/api/companiess',
    handler: companyController.getCompanyById,
  },
  {
    method: 'PUT',
    path: '/api/companies',
    handler: companyController.updateCompany,
    options: {
      pre: [{ method: tokenVerification.tokenVerificationForUser}],
    }
  },
  {
    method: 'DELETE',
    path: '/api/companies',
    handler: companyController.deleteCompany,
    options: {
      pre: [{ method: tokenVerification.tokenVerificationForUser}],
    }
  },
];
