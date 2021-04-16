var users = require("../Models/index").users;
var roles = require("../Models/index").roles;
module.exports = {
  PostUsers: async (json) => {
    return await users.create({
      email: json["email"],
      first_name: json["first_name"],
      last_name: json["last_name"],
      password: json["password"],
      status: "NOT_ACTIVE",
      gender: json["gender"],
      bday: Date.parse(json["bday"]),
      id_role: 1,
    });
  },
  GetByEmail: async (json) => {
    return await users.findAll({
      where: { email: json },
      raw: true,
    });
  },
  GetByEmailAndPassword: async (json) => {
    return await users.findAll({
      where: { email: json["email"] },
      raw: true,
    });
  },
  DeleteUserById: async (id) => {
    return await users.destroy({
      where: {
        id: id,
      },
    });
  },
  GetAllUsers: async () => {
    return await roles.findAll({
      include: [{ model: users, as: "ROLES_USERS", reqired: true }],
      raw: true,
    });
  },
  PutUsers: async (id, json) => {
    return await users.update(
      {
        bday: Date.parse(json["bday"]),
        email: json["email"],
        gender: json["gender"],
        first_name: json["first_name"],
        last_name: json["last_name"],
      },
      { where: { id: id } }
    );
  },
  UpdateStatus: async (id) => {
    return await users.update({ status: "ACTIVE" }, { where: { id: id } });
  },
  UpdateStatusNotActive: async (id) => {
    return await users.update({ status: "NOT_ACTIVE" }, { where: { id: id } });
  },
  GetByIdAndIdRole: async (id, id_role) => {
    return await users.findAll({
      where: { id: id, id_role: id_role },
      raw: true,
    });
  },
  GetById: async (id) => {
    return await users.findAll({
      where: { id: id },
      raw: true,
    });
  },
  UpdateRole: async (json) => {
    return await users.update(
      { id_role: json["id_role"] },
      { where: { id: json["id_users"] } }
    );
  },
  UpdateRoleDoctor: async (id) => {
    return await users.update({ id_role: 3 }, { where: { id: id } });
  },
};
