const UserRepository = require("../Repository/UserRepository");
const PatientRepository = require("../Repository/PatientRepository");
const DoctorRepository = require("../Repository/DoctorRepository");
var PatientDto = require("../Dto/PatientDto");
var PatientForDoctorDto = require("../Dto/PatientForDoctorDto");
module.exports = {
  PostPatient: async (json) => {
    var CheckUser = await UserRepository.GetById(json["id_users"]);
    if (CheckUser.length == 0) throw new Error("This user not found");
    if (CheckUser[0]["id_role"] == 3)
      throw new Error("This user don`t added on doctore or patient");
    var checPatient = await PatientRepository.CheckPatient(json["id_users"]);
    var checkDoctor = await DoctorRepository.CheckDoctor(json["id_users"]);
    if (checkDoctor.length == 0 && checPatient.length == 0) {
      let patient = await PatientRepository.PostPatient(json);
      UserRepository.UpdateStatus(patient["id_users"]);
      return patient;
    } else {
      throw new Error("Check post id");
    }
  },
  GetAllPatient: async () => {
    let patients = await PatientRepository.GetAllPatient();
    var return_pateints = patients.map(function (params) {
      return new PatientDto(params);
    });
    return return_pateints;
  },
  GetAllPatientForDoctor: async () => {
    let patients = await PatientRepository.GetAllPatient();
    var return_pateints = patients.map(function (params) {
      return new PatientForDoctorDto(params);
    });
    return return_pateints;
  },
  GetByFirstAndLastName: async (json) => {
    let patients = await PatientRepository.GetByFirstAndLastName(json);
    var return_pateints = patients.map(function (params) {
      return new PatientDto(params);
    });
    return return_pateints;
  },
  DeletePatient: async (id) => {
    var patient = await PatientRepository.FindById(id);
    await UserRepository.UpdateStatusNotActive(patient[0]["id_users"]);
    let count_patient_delete = await PatientRepository.DeletePatientById(id);
    if (count_patient_delete == 0) throw new Error("Check delete id");
    return count_patient_delete;
  },
  PutPatient: async (id, json) => {
    let count_put_patient = await PatientRepository.PutPatientById(id, json);
    if (count_put_patient == 0) throw new Error("Check put id");
    return count_put_patient;
  },
};
