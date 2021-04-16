const UserRepository = require("../Repository/UserRepository");
const DoctorRepository = require("../Repository/DoctorRepository");
const PatientRepository = require("../Repository/PatientRepository");
const ReceptionRepository = require("../Repository/ReceptionRepository");
var DoctorDto = require("../Dto/DoctorDto");
var DoctorForPatientDto = require("../Dto/DoctorForPatientDto");
module.exports = {
  PostDoctor: async (json) => {
    var CheckUser = await UserRepository.GetById(json["id_users"]);
    if (CheckUser.length == 0) throw new Error("This user not found");
    if (CheckUser[0]["id_role"] == 3)
      throw new Error("This user don`t added on doctore or patient");
    var checPatient = await PatientRepository.CheckPatient(json["id_users"]);
    var checkDoctor = await DoctorRepository.CheckDoctor(json["id_users"]);
    if (checkDoctor.length == 0 && checPatient.length == 0) {
      let doctor = await DoctorRepository.PostDoctor(json);
      UserRepository.UpdateStatus(doctor["id_users"]);
      UserRepository.UpdateRoleDoctor(doctor["id_users"]);
      return doctor;
    } else {
      throw new Error("Check post id");
    }
  },
  GetAllDoctor: async () => {
    return await DoctorRepository.GetAllDoctors();
  },
  DeleteDoctor: async (id) => {
    var doctor = await DoctorRepository.FindbyId(id);
    await ReceptionRepository.UpdateDoctorReceptionForDelete(doctor[0]["id"]);
    await UserRepository.UpdateStatusNotActive(doctor[0]["id_users"]);
    await UserRepository.UpdateRole({
      id_role: 1,
      id_users: doctor[0]["id_users"],
    });
    let count_doctor_delete = await DoctorRepository.DeleteDoctorById(id);
    if (count_doctor_delete == 0) throw new Error("Check delete id");

    return count_doctor_delete;
  },
  PutDoctor: async (id, json) => {
    let count_put_doctor = await DoctorRepository.PutDoctorById(id, json);
    if (count_put_doctor == 0) throw new Error("Check put id");
    return count_put_doctor;
  },
  GetAllDoctorsFullInf: async () => {
    let doctor = await DoctorRepository.GetAllDoctorsFullInf();
    var return_doctors = doctor.map(function (params) {
      return new DoctorDto(params);
    });
    return return_doctors;
  },
  GetAllDoctorsForPatient: async () => {
    let doctor = await DoctorRepository.GetAllDoctorsFullInf();
    var return_doctors = doctor.map(function (params) {
      return new DoctorForPatientDto(params);
    });
    return return_doctors;
  },
  GetDoctorsByFirstAndLastName: async (json) => {
    let doctor = await DoctorRepository.GetDoctorsByFirstAndLastName(json);
    var return_doctors = doctor.map(function (params) {
      return new DoctorDto(params);
    });
    return return_doctors;
  },
};
