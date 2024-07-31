const jobController = require('../controllers/jobController');
const tokenVerification = require('../authentication/token-verfy');
const isAdmin = require('../middleware/admin');
module.exports = [
  {
    method: 'POST',
    path: '/api/jobs',
    handler: jobController.postJob,
    options: {
        pre: [{ method: tokenVerification.tokenVerificationForUser },{ method: isAdmin }]
    },
  },
  {
    method: 'GET',
    path: '/api/jobss',
    handler: jobController.getJobs,
    // options: {
    //     pre: [{ method: tokenVerification.tokenVerificationForUser },{ method: isAdmin }],
    //   }
  },
  // {
  //   method: 'GET',
  //   path: '/api/jobs',
  //   handler: jobController.getJobById,
  //   // options: {
  //   //     pre: [{ method: tokenVerification.tokenVerificationForjob }],
  //   //   }
  // },
  {
    method: 'POST',
    path: '/api/jobss',
    handler: jobController.getJobById,

  },
  {
    method: 'POST',
    path: '/api/jobsss/{id}',
    handler: jobController.getJobByJobid,

  },
  {
    method: 'PUT',
    path: '/api/jobs',
    handler: jobController.updateJob,
    options: {
        pre: [{ method: tokenVerification.tokenVerificationForUser}],
      }
  },
  {
    method: 'DELETE',
    path: '/api/jobs',
    handler: jobController.deleteJob,
    options: {
        pre: [{ method: tokenVerification.tokenVerificationForUser }],
      }
  },
  {
    method: 'GET',
    path: '/api/search/jobs',
    handler:jobController.searchJobs
  },
];
