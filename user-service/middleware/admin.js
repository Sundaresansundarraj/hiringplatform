const User = require('../models/User');

const isAdmin = async (request, h) => {
  const userId = request.user.user_id;
  const user = await User.findByPk(userId);
  if (!user || user.role !== 'admin') {
    return h.response({ error: 'Access denied. Only admins can perform this action.' }).code(403).takeover();
  }
  return h.continue;
};

module.exports = isAdmin;
