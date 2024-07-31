const applicationService = require('../services/applicationService');
const fs = require('fs');
const path = require('path');
const Boom = require('@hapi/boom');
const Message = require("../messages/Message")
const Httpcode = require("../codes/httpCodes")
const Response = require('../response/Response');
const Application = require('../models/Application');
class ApplicationController{

  static async applyForJob(request, h)  {
  //   const { jobId, userId, resume } = request.payload;
  
  //   const file = request.payload.resume;
  //   const fileName = `${Date.now()}-${file.hapi.filename}`;
  //   const filePath = path.join(__dirname, '..', 'uploads', fileName);
  
  //   try {
  //     // Save the file
  //     const fileStream = fs.createWriteStream(filePath);
  //     file.pipe(fileStream);
  
  //     file.on('end', async (err) => {
  //       if (err) {
  //         throw Boom.badRequest(err.message);
  //       }
  
  //       // Save application to database
  //       const applicationData = {
  //         jobId,
  //         userId,
  //         resume: filePath,
  //       };
  //       const application = await applicationService.applyForJob(applicationData);
  
  //       return h.response({ message: 'Application submitted successfully', applicationId: application.id }).code(201);
  //     });
  //   } catch (error) {
  //     return h.response({ message: error.message }).code(400);
  //   }
  // };

  //     
  const userId = request.user.user_id
  const jobId = request.title.jobId
  const { file } = request.payload;

  if (!file) {
    return Boom.badRequest('No file provided');
  }

  // Ensure the uploads directory exists
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Create a unique filename and save the file
  const filename = `${Date.now()}-${file.hapi.filename}`;
  const filepath = path.join(uploadsDir, filename);
  const fileStream = fs.createWriteStream(filepath);

  return new Promise((resolve, reject) => {
    file.pipe(fileStream);

    file.on('end', async (err) => {
      if (err) {
        console.error('File upload error:', err);
        return reject(Boom.internal('File upload failed'));
      }

      try {
        // Save file metadata to the database
        const fileRecord = await Application.create({ resume:filename, userId ,jobId});

        resolve(h.response({ message: 'File uploaded successfully', fileId: fileRecord.id }).code(201));
      } catch (error) {
        console.error('Error saving file metadata:', error);
        reject(Boom.internal('Error saving file metadata'));
      }
    });

    fileStream.on('error', (err) => {
      console.error('File stream error:', err);
      reject(Boom.internal('File upload failed'));
    });
  })
      }
      static async getApplicationsByJob(request, h) {
              try {
                console.log(request.payload)
                const result = await applicationService.getApplicationsByJob(request);
          
                if (!result.success) {
                  return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
                }
          
                return Response.success(request, h, result.status, result.data, result.message);
              } catch (err) {
                console.error(err);
                return Response.error(request, h, Httpcode.HTTP_INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
              }}
              static async applicationgetByApplicationid(request,h){
                try {
                  console.log(request.payload)
                  const result = await applicationService.applicationgetByApplicationid(request);
            
                  if (!result.success) {
                    return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
                  }
            
                  return Response.success(request, h, result.status, result.data, result.message);
                } catch (err) {
                  console.error(err);
                  return Response.error(request, h, Httpcode.HTTP_INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
                }
              }
      
  static async updateApplicationStatus(request, h) {
    try {
      const result = await applicationService.updateApplicationStatus(request);
      if (!result.success) {
        return Response.error(request, h, result.status, null, result.message);
      }
      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      throw err;
    }
  }

  static async getApplicationsByUser(request, h) {
    try {
      const result = await applicationService.getApplicationsByUser(request);

      if (!result.success) {
        return Response.error(request, h, Httpcode.HTTP_BAD_REQUEST, null, Message[124]);
      }

      return Response.success(request, h, result.status, result.data, result.message);
    } catch (err) {
      console.error(err);
      return Response.error(request, h, Httpcode.HTTP_INTERNAL_SERVER_ERROR, null, 'Internal Server Error');
    }
  }


}

module.exports = ApplicationController
