const rolesList = require('./rolesList');

function checkAccess(routeType, role) {
  if (role === rolesList.admin.name) return true;
  const item = Object.values(rolesList).find((i) => i.name === role);
  if (!item || !item.accessList) return false;
  const flag = item.accessList.includes(routeType);
  return flag;
}

module.exports = checkAccess;
