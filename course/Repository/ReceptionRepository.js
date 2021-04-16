var patients = require("../Models/index").patients;
var users = require("../Models/index").users;
var reception = require("../Models/index").receptions;
var doctors = require("../Models/index").doctors;

module.exports = {
  PostReception: async (json) => {
    return await reception.create({
      comments: "---",
      date_reception: json["date_reception"],
      diagnosis: "---",
      symptoms: json["symptoms"],
      id_doctor: json["id_doctor"],
      id_patient: json["id_patient"],
      time: json["time"],
    });
  },
  PutReception: async (json) => {
    return await reception.update(
      {
        comments: json["comments"],
        diagnosis: json["diagnosis"],
      },
      { where: { id: id } }
    );
  },
  CheckReception: async (json) => {
    return await reception.findAll({
      where: {
        date_reception: json["date_reception"],
        id_doctor: json["id_doctor"],
        id_patient: json["id_patient"],
      },
    });
  },
  CheckReceptionByTime: async (json) => {
    return await reception.findAll({
      where: {
        date_reception: json["date_reception"],
        id_doctor: json["id_doctor"],
        time: json["time"],
      },
    });
  },
  GetAllByDoctor: async (id) => {
    return await users.findAll({
      include: [
        {
          model: patients,
          as: "PATIENTS_DOCTORS",
          required: true,
          include: [
            {
              model: reception,
              as: "PATIENTS_RECEPTION",
              required: true,
              where: { id_doctor: id },
            },
          ],
        },
      ],
      raw: true,
    });
  },
  GetAllByPatient: async (id) => {
    return await users.findAll({
      include: [
        {
          model: doctors,
          as: "USERS_DOCTORS",
          required: true,
          include: [
            {
              model: reception,
              as: "DOCTORS_RECEPTION",
              required: true,
              where: { id_patient: id },
            },
          ],
        },
      ],
      raw: true,
    });
  },
  DeleteById: async (id, id_doctor) => {
    return await reception.destroy({
      where: {
        id: id,
        id_doctor: id_doctor,
        diagnosis: "---",
      },
    });
  },
  DeleteByIdForDoctor: async (id, id_patient) => {
    return await reception.destroy({
      where: {
        id: id,
        id_patient: id_patient,
        diagnosis: "---",
      },
    });
  },
  Put: async (json, id_doctor, id) => {
    return await reception.update(
      {
        id_doctor: id_doctor,
        comments: json["comments"],
        diagnosis: json["diagnosis"],
      },
      { where: { id: id } }
    );
  },
  CheckByUpdate: async (id) => {
    return await reception.findAll({
      where: {
        id: id,
        diagnosis: "---",
      },
    });
  },
  UpdateDoctorReceptionForDelete: async (id) => {
    return await reception.update(
      {
        id_doctor: null,
      },
      { where: { id_doctor: id } }
    );
  },
};
