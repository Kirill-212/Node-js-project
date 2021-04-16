var roles = require("../Models/index").roles;
var users = require("../Models/index").users;
module.exports = {
  GetRole: async (json) => {
    let result = await roles.findAll({
      include: [{ model: users, as: "ROLES_USERS", required: true }],
      where: { id: json["id"] },
      raw: true,
    });
    return result;
  },
};
