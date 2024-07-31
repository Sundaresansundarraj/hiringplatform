const applicationController = require('../controllers/applicationController');
const tokenVerification = require('../authentication/token-verfy');


module.exports = [
    {
        method: 'POST',
        path: '/api/applications',
        handler: applicationController.applyForJob,
        options: {
          pre: [{ method:tokenVerification.tokenVerificationForUser},{ method:tokenVerification.tokenVerificationForjobid}],
          payload: {
            output: 'stream',
            allow: 'multipart/form-data',
            maxBytes: 10485760, // 10MB limit
            parse: true,
            multipart: true,
          },
        },
        
      },
  {
    method: 'POST',
    path: '/api/applicationss/jobid',
    handler: applicationController.getApplicationsByJob,
  },
  {
    method: 'POST',
    path: '/api/applicationss/applicationid',
    handler: applicationController.applicationgetByApplicationid,
  },
  {
    method: 'PUT',
    path: '/api/applications',
    handler: applicationController.updateApplicationStatus,
  },
  {
    method: 'POST',
    path: '/api/applications/userid',
    handler: applicationController.getApplicationsByUser,  
  },
];
