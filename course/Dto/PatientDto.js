class PatientDto {
  constructor(json) {
    this.id = json["id"];
    this.id_patient = json["PATIENTS_DOCTORS.id"];
    this.email = json["email"];
    this.first_name = json["first_name"];
    this.last_name = json["last_name"];
    this.bday = json["bday"];
    this.gender = json["gender"];
    this.homeaddress = json["PATIENTS_DOCTORS.homeaddress"];
    this.passport = json["PATIENTS_DOCTORS.passport"];
  }
}

module.exports = PatientDto;
