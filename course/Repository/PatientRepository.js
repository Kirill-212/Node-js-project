var patient = require("../Models/index").patients;
var users = require("../Models/index").users;
module.exports = {
  PostPatient: async (json) => {
    return await patient.create({
      homeaddress: json["homeaddress"],
      passport: json["passport"],
      id_users: json["id_users"],
    });
  },
  GetAllPatient: async () => {
    return await users.findAll({
      include: [{ model: patient, as: "PATIENTS_DOCTORS", required: true }],
      raw: true,
    });
  },
  GetByFirstAndLastName: async (json) => {
    return await users.findAll({
      include: [{ model: patient, as: "PATIENTS_DOCTORS", required: true }],
      where: { first_name: json["first_name"], last_name: json["last_name"] },
      raw: true,
    });
  },
  DeletePatientById: async (id) => {
    return await patient.destroy({
      where: {
        id: id,
      },
    });
  },
  PutPatientById: async (id, json) => {
    return await patient.update(
      { homeaddress: json["homeaddress"], passport: json["passport"] },
      { where: { id: id } }
    );
  },
  CheckPatient: async (id) => {
    return await patient.findAll({
      where: { id_users: id },
      raw: true,
    });
  },
  FindById: async (id) => {
    return await patient.findAll({
      where: {
        id: id,
      },
    });
  },
  FindByIdUser: async (id) => {
    return await patient.findAll({
      where: {
        id_users: id,
      },
    });
  },
};
