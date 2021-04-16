const DoctorService = require("../Service/DoctorService");
const validation = require("../Validation/Validation");
module.exports = {
  PostDoctor: (req, res) => {
    if (!req.body) {
      return res.status(400).send(JSON.stringify({ ERROR: "invalid data" }));
    }
    var result = validation.AddDoctorSchema.validate({
      name_hospital: req.body["name_hospital"],
      homeaddress: req.body["homeaddress"],
      specialty: req.body["specialty"],
      id_users: req.body["id_users"],
      passport: req.body["passport"],
    });

    if (result["error"] != undefined) {
      return res.status(400).send(JSON.stringify({ ERROR: result["error"] }));
    }
    DoctorService.PostDoctor(req.body)
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  DeleteDoctor: (req, res) => {
    DoctorService.DeleteDoctor(req.params["ID"])
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  PutDoctor: (req, res) => {
    var result = validation.PutDoctorSchema.validate({
      name_hospital: req.body["name_hospital"],
      homeaddress: req.body["homeaddress"],
      specialty: req.body["specialty"],
      passport: req.body["passport"],
    });
    if (result["error"] != undefined) {
      return res.status(400).send(JSON.stringify({ ERROR: result["error"] }));
    }
    DoctorService.PutDoctor(req.params["ID"], req.body)
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetAllDoctorsFullInf: (req, res) => {
    DoctorService.GetAllDoctorsFullInf()
      .then((result) => {
        return res.status(200).json({ doctors: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetAllDoctorsForPatient: (req, res) => {
    DoctorService.GetAllDoctorsForPatient()
      .then((result) => {
        return res.status(200).json({ doctors: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetByFirstAndLastName: (req, res) => {
    if (!req.body) {
      return res.status(400).send(JSON.stringify({ ERROR: "invalid data" }));
    }
    DoctorService.GetDoctorsByFirstAndLastName(req.body)
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
};
