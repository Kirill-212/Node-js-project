const ReceptionService = require("../Service/ReceptionService");
const validation = require("../Validation/Validation");
module.exports = {
  PostPatient: (req, res) => {
    if (!req.body) {
      return res.status(400).send(JSON.stringify({ ERROR: "invalid data" }));
    }
    req.body["id_patient"] = req.body["ID"];
    var result = validation.PostReceptionSchema.validate({
      date_reception: req.body["date_reception"],
      symptoms: req.body["symptoms"],
      id_doctor: req.body["id_doctor"],
      id_patient: req.body["id_patient"],
      time: req.body["time"],
    });

    if (result["error"] != undefined) {
      return res.status(400).send(JSON.stringify({ ERROR: result["error"] }));
    }
    ReceptionService.PostReception(req.body)
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  DeleteForPatient: (req, res) => {
    ReceptionService.DeleteForPatientReception(req.params["ID"], req.body["ID"])
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetAllByPatient: (req, res) => {
    ReceptionService.GetAllByPatient(req.body["ID"])
      .then((result) => {
        return res.status(200).json({ patients: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetAllByDoctor: (req, res) => {
    ReceptionService.GetAllByDoctor(req.body["ID"])
      .then((result) => {
        return res.status(200).json({ patients: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  Delete: (req, res) => {
    ReceptionService.Delete(req.params["ID"], req.body["ID"])
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },

  Put: (req, res) => {
    var result = validation.PutReceptionSchema.validate({
      comments: req.body["comments"],
      diagnosis: req.body["diagnosis"],
    });
    if (result["error"] != undefined) {
      return res.status(400).send(JSON.stringify({ ERROR: result["error"] }));
    }
    ReceptionService.Put(req.body, req.body["ID"], req.params["ID"])
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
};
