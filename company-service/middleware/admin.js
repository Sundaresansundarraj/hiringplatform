

const isAdmin = async (request, h) => {
  const role= request.user.user_role;
  console.log(role)
  if (!role || role !== 'admin') {
    return h.response({ error: 'Access denied. Only admins can perform this action.' }).code(403).takeover();
  }
  return h.continue;
};

module.exports = isAdmin;
