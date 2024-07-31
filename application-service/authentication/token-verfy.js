const jwt = require('jsonwebtoken');
const { SECRETKEY } = process.env;

class verifications{
  static async tokenVerificationForUser(request, h){
    try {
      const token = request.headers.authorization;
      
      if (!token) {
        return h.response({ error: 'Authorization header missing' }).code(400).takeover();
      }
      request.user = jwt.verify(token, SECRETKEY);
      return h.continue;
    } catch (err) {
      return h.response({ error: 'Invalid token' }).code(401).takeover();
    }
  }
  static async tokenVerificationForjobid(request, h){
    try {
      const token = request.headers.auth;
      if (!token) {
        return h.response({ error: 'Authorization header missing' }).code(400).takeover();
      }
      request.title = jwt.verify(token, SECRETKEY);
      return h.continue;
    } catch (err) {
      return h.response({ error: 'Invalid token' }).code(401).takeover();
    }
  }
}

module.exports = verifications;

