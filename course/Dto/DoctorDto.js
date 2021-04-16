class DoctorDto {
  constructor(json) {
    this.email = json["email"];
    this.first_name = json["first_name"];
    this.last_name = json["last_name"];
    this.bday = json["bday"];
    this.gender = json["gender"];
    this.id_users = json["id"];
    this.id_doctor = json["USERS_DOCTORS.id"];
    this.name_hospital = json["USERS_DOCTORS.name_hospital"];
    this.specialty = json["USERS_DOCTORS.specialty"];
    this.homeaddress = json["USERS_DOCTORS.homeaddress"];
    this.passport = json["USERS_DOCTORS.passport"];
  }
}

module.exports = DoctorDto;
