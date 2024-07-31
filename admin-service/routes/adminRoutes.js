const adminController = require('../controllers/adminController');
const tokenVerification = require('../authentication/token-verfy');

module.exports = [
  {
    method: 'POST',
    path: '/api/admin',
    handler: adminController.updateApplicationStatus,
    options: {
      pre: [{ method:tokenVerification.tokenVerificationForUser}],
    },
  },
  // {
  //   method: 'GET',
  //   path: '/api/admin/reports',
  //   handler: adminController.getReports,
  //   options: {
  //     pre: [{ method: authMiddleware }],
  //   },
  // },
];
