var doctor = require("../Models/index").doctors;
var users = require("../Models/index").users;
module.exports = {
  PostDoctor: async (json) => {
    return await doctor.create({
      name_hospital: json["name_hospital"],
      passport: json["passport"],
      specialty: json["specialty"],
      id_users: json["id_users"],
      homeaddress: json["homeaddress"],
    });
  },
  GetAllDoctors: async () => {
    return await doctor.findAll();
  },
  DeleteDoctorById: async (id) => {
    return await doctor.destroy({
      where: {
        id: id,
      },
    });
  },
  PutDoctorById: async (id, json) => {
    return await doctor.update(
      {
        name_hospital: json["name_hospital"],
        passport: json["passport"],
        specialty: json["specialty"],
        homeaddress: json["homeaddress"],
      },
      { where: { id: id } }
    );
  },
  CheckDoctor: async (id) => {
    return await doctor.findAll({
      where: { id_users: id },
      raw: true,
    });
  },
  GetAllDoctorsFullInf: async () => {
    return await users.findAll({
      include: [{ model: doctor, as: "USERS_DOCTORS", required: true }],
      raw: true,
    });
  },
  GetDoctorsByFirstAndLastName: async (json) => {
    return await users.findAll({
      include: [{ model: doctor, as: "USERS_DOCTORS", required: true }],
      where: { first_name: json["first_name"], last_name: json["last_name"] },
      raw: true,
    });
  },
  FindbyId: async (id) => {
    return await doctor.findAll({
      where: { id: id },
      raw: true,
    });
  },
  FindbyIdUser: async (id) => {
    return await doctor.findAll({
      where: { id_users: id },
      raw: true,
    });
  },
};
