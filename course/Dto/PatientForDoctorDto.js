class PatientForDoctorDto {
  constructor(json) {
    this.email = json["email"];
    this.first_name = json["first_name"];
    this.last_name = json["last_name"];
    this.bday = json["bday"];
    this.gender = json["gender"];
    this.homeaddress = json["PATIENTS_DOCTORS.homeaddress"];
  }
}

module.exports = PatientForDoctorDto;
