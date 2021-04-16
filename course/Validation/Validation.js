const Joi = require("joi");

module.exports = {
  AddUserSchema: Joi.object({
    first_name: Joi.string().max(10).required(),
    last_name: Joi.string().alphanum().max(10).required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{6,16}$/)
      .min(6)
      .required(),
    email: Joi.string().email().required(),
    bday: Joi.date()
      .max("now")
      .message('"date" cannot be earlier than today')
      .required(),
    gender: Joi.string().max(1).required(),
  }),
  PutUserSchema: Joi.object({
    first_name: Joi.string().max(10).required(),
    last_name: Joi.string().alphanum().max(10).required(),
    email: Joi.string().email().required(),
    bday: Joi.date()
      .max("now")
      .message('"date" cannot be earlier than today')
      .required(),
    gender: Joi.string().max(1).required(),
  }),
  PatientSchema: Joi.object({
    homeaddress: Joi.string().max(50).min(10).required(),
    passport: Joi.string().alphanum().max(10).min(9).required(),
    id: Joi.number().integer().required(),
  }),
  AddDoctorSchema: Joi.object({
    name_hospital: Joi.string().max(30).min(5).required(),
    passport: Joi.string().alphanum().max(10).min(9).required(),
    specialty: Joi.string().max(30).min(5).required(),
    id_users: Joi.number().integer().required(),
    homeaddress: Joi.string().max(50).min(10).required(),
  }),
  PutDoctorSchema: Joi.object({
    name_hospital: Joi.string().max(30).min(5).required(),
    passport: Joi.string().alphanum().max(10).min(9).required(),
    specialty: Joi.string().max(30).min(5).required(),
    homeaddress: Joi.string().max(50).min(10).required(),
  }),
  PostReceptionSchema: Joi.object({
    date_reception: Joi.date()
      .min("now")
      .message('"date" cannot be earlier than today')
      .required(),
    symptoms: Joi.string().max(100).required(),
    id_doctor: Joi.number().integer().required(),
    id_patient: Joi.number().integer().required(),
    time: Joi.string().max(5).required(),
  }),
  PutReceptionSchema: Joi.object({
    comments: Joi.string().max(100).required(),
    diagnosis: Joi.string().max(35).required(),
  }),
};
