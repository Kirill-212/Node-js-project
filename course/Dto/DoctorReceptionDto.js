class DoctorReceptionDto {
  constructor(json) {
    this.email = json["email"];
    this.first_name = json["first_name"];
    this.last_name = json["last_name"];
    this.homeaddress = json["PATIENTS_DOCTORS.homeaddress"];
    this.reception_id = json["PATIENTS_DOCTORS.PATIENTS_RECEPTION.id"];
    this.comments = json["PATIENTS_DOCTORS.PATIENTS_RECEPTION.comments"];
    this.date_reception =
      json["PATIENTS_DOCTORS.PATIENTS_RECEPTION.date_reception"];
    this.diagnosis = json["PATIENTS_DOCTORS.PATIENTS_RECEPTION.diagnosis"];
    this.symptoms = json["PATIENTS_DOCTORS.PATIENTS_RECEPTION.symptoms"];
    this.time = json["PATIENTS_DOCTORS.PATIENTS_RECEPTION.time"];
  }
}

module.exports = DoctorReceptionDto;
