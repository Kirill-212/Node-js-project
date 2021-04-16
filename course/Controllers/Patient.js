const PatientService = require("../Service/PatientService");
const validation = require("../Validation/Validation");
module.exports = {
  PostPatient: (req, res) => {
    if (!req.body) {
      return res.status(400).send(JSON.stringify({ ERROR: "invalid data" }));
    }
    var result = validation.PatientSchema.validate({
      homeaddress: req.body["homeaddress"],
      id: req.body["id_users"],
      passport: req.body["passport"],
    });

    if (result["error"] != undefined) {
      return res.status(400).send(JSON.stringify({ ERROR: result["error"] }));
    }
    PatientService.PostPatient(req.body)
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetAllPatient: (req, res) => {
    PatientService.GetAllPatient()
      .then((result) => {
        return res.status(200).json({ patients: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetAllPatientForDoctor: (req, res) => {
    PatientService.GetAllPatientForDoctor()
      .then((result) => {
        return res.status(200).json({ patients: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  DeletePatient: (req, res) => {
    PatientService.DeletePatient(req.params["ID"])
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  PutPatient: (req, res) => {
    var result = validation.PatientSchema.validate({
      homeaddress: req.body["homeaddress"],
      id: req.params["ID"],
      passport: req.body["passport"],
    });

    if (result["error"] != undefined) {
      return res.status(400).send(JSON.stringify({ ERROR: result["error"] }));
    }
    PatientService.PutPatient(req.params["ID"], req.body)
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetByFirstAndLastName: (req, res) => {
    if (!req.body) {
      return res.status(400).send(JSON.stringify({ ERROR: "invalid data" }));
    }
    PatientService.GetByFirstAndLastName(req.body)
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
};
