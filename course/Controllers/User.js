const UserService = require("../Service/UserService");
const jwt = require("jsonwebtoken");
const validation = require("../Validation/Validation");
var config = require("../libs/config");
module.exports = {
  PostUser: (req, res) => {
    res.setHeader("Content-Type", "application/json");
    if (!req.body) {
      return res.status(400).send(JSON.stringify({ ERROR: "invalid data" }));
    }

    var result = validation.AddUserSchema.validate({
      first_name: req.body["first_name"],
      last_name: req.body["last_name"],
      password: req.body["password"],
      email: req.body["email"],
      bday: req.body["bday"],
      gender: req.body["gender"],
    });

    if (result["error"] != undefined) {
      return res.status(400).send(JSON.stringify({ ERROR: result["error"] }));
    }

    UserService.PostUsers(req.body)
      .then((result) => {
        return res.send(result);
      })
      .catch((error) => {
        res.status(400);
        return res.send(JSON.stringify({ ERROR: error.message }));
      });
  },
  AutUser: (req, res) => {
    UserService.AuthenticationUsers(req.body)
      .then((result) => {
        return res.status(200).json({
          user: result,
          token: jwt.sign(
            { id: result[0]["id"], id_role: result[0]["id_role"] },
            config.get("secretKey"),
            { expiresIn: 60 * 60 }
          ),
        });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  DeleteUsers: (req, res) => {
    UserService.DeleteUsers(req.params["ID"])
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  GetAllUsers: (req, res) => {
    UserService.GetAllUsers()
      .then((result) => {
        return res.status(200).json({ users: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  PutUser: (req, res) => {
    var result = validation.PutUserSchema.validate({
      first_name: req.body["first_name"],
      last_name: req.body["last_name"],
      email: req.body["email"],
      bday: req.body["bday"],
      gender: req.body["gender"],
    });
    if (result["error"] != undefined) {
      return res.status(400).send(JSON.stringify({ ERROR: result["error"] }));
    }
    UserService.PutUsers(req.params["ID"], req.body)
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
  PutUserRole: (req, res) => {
    UserService.UpdateRole(req.body, req.body["ID"])
      .then((result) => {
        return res.status(200).json({ ID: result });
      })
      .catch((error) => {
        return res.status(400).send(JSON.stringify({ ERROR: error.message }));
      });
  },
};
