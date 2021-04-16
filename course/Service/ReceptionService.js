const UserRepository = require("../Repository/UserRepository");
const PatientRepository = require("../Repository/PatientRepository");
const DoctorRepository = require("../Repository/DoctorRepository");
const ReceptionRepository = require("../Repository/ReceptionRepository");
var DoctorReceptionDto = require("../Dto/DoctorReceptionDto");
var PatientReceptionDto = require("../Dto/PatientReceptionDto");
module.exports = {
  PostReception: async (json) => {
    var checkReception = await ReceptionRepository.CheckReception(json);
    var checkReceptionByTime = await ReceptionRepository.CheckReceptionByTime(
      json
    );
    if (checkReception.length >= 1 || checkReceptionByTime.length >= 1)
      throw new Error("check input time and date");
    var checPatient = await PatientRepository.FindById(json["id_patient"]);
    var checkDoctor = await DoctorRepository.FindbyId(json["id_doctor"]);
    if (checkDoctor.length == 1 && checPatient.length == 1) {
      let checktime = json["time"].split(":");
      if (
        checktime[0] == 13 ||
        checktime[0] == 14 ||
        checktime[0] > 17 ||
        checktime[0] < 9 ||
        (checktime[1] != 30 && checktime[1] != 0 && checktime[1] != 15)
      ) {
        throw new Error("check input time");
      }
      var checkDate = new Date(json["date_reception"]);
      if (
        checkDate.getDay() == 6 ||
        checkDate.getDay() == 0 ||
        checkDate.getFullYear() > new Date().getFullYear()
      ) {
        throw new Error("Check input date reception");
      }
      let reception = await ReceptionRepository.PostReception(json);
      return reception;
    } else {
      throw new Error("Check post id");
    }
  },
  GetAllByDoctor: async (id) => {
    let reception_patient = await ReceptionRepository.GetAllByDoctor(id);
    var return_patient = reception_patient.map(function (params) {
      return new DoctorReceptionDto(params);
    });
    return return_patient;
  },
  GetAllByPatient: async (id) => {
    let reception_doctor = await ReceptionRepository.GetAllByPatient(id);
    var return_doctor = reception_doctor.map(function (params) {
      return new PatientReceptionDto(params);
    });
    console.log(return_doctor);
    return return_doctor;
  },
  Delete: async (id, id_doctor) => {
    let reception = await ReceptionRepository.DeleteById(id, id_doctor);
    if (reception == 0) {
      throw new Error("cannot delete for this");
    } else {
      return reception;
    }
  },
  DeleteForPatientReception: async (id, id_patient) => {
    let reception = await ReceptionRepository.DeleteByIdForDoctor(
      id,
      id_patient
    );
    if (reception == 0) {
      throw new Error("cannot delete for this");
    } else {
      return reception;
    }
  },
  Put: async (json, id_doctor, id) => {
    let checkReceptionForUpdate = await ReceptionRepository.CheckByUpdate(id);
    if (checkReceptionForUpdate.length == 0) {
      throw new Error("this reception not updated");
    }
    let count_put_reception = await ReceptionRepository.Put(
      json,
      id_doctor,
      id
    );
    if (count_put_reception == 0) throw new Error("Check put id");
    return count_put_reception;
  },
};
