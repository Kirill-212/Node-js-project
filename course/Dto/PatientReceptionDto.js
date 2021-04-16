class PatientReceptionDto {
  constructor(json) {
    this.email = json["email"];
    this.first_name = json["first_name"];
    this.last_name = json["last_name"];
    this.name_hospital = json["USERS_DOCTORS.name_hospital"];
    this.specialty = json["USERS_DOCTORS.specialty"];
    this.reception_id = json["USERS_DOCTORS.DOCTORS_RECEPTION.id"];
    this.comments = json["USERS_DOCTORS.DOCTORS_RECEPTION.comments"];
    this.date_reception =
      json["USERS_DOCTORS.DOCTORS_RECEPTION.date_reception"];
    this.diagnosis = json["USERS_DOCTORS.DOCTORS_RECEPTION.diagnosis"];
    this.symptoms = json["USERS_DOCTORS.DOCTORS_RECEPTION.symptoms"];
    this.time = json["USERS_DOCTORS.DOCTORS_RECEPTION.time"];
  }
}

module.exports = PatientReceptionDto;
