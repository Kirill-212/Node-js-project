const UserService = require("../Service/UserService");
var config = require("../libs/config");
const jwt = require("jsonwebtoken");
module.exports = {
  RoleAdmin: async (req, res, next) => {
    const token = req.headers["authorization"].replace("Bearer ", "");

    await jwt.verify(token, config.get("secretKey"), (err, decoded) => {
      if (decoded["id_role"] == "2") {
        req.body["ID"] = decoded["id"];
        res.setHeader("Content-Type", "application/json");
        next();
      } else {
        return res
          .status(400)
          .send(JSON.stringify({ ERROR: "You are not an admin" }));
      }
    });
  },
  RoleUser: async (req, res, next) => {
    const token = req.headers["authorization"].replace("Bearer ", "");

    await jwt.verify(token, config.get("secretKey"), async (err, decoded) => {
      if (decoded["id_role"] == "1") {
        let result = await UserService.GetByIdUserPatient(decoded["id"]);
        req.body["ID"] = result[0]["id"];
        res.setHeader("Content-Type", "application/json");
        next();
      } else {
        return res
          .status(400)
          .send(JSON.stringify({ ERROR: "You are not an user" }));
      }
    });
  },
  RoleDoctor: async (req, res, next) => {
    const token = req.headers["authorization"].replace("Bearer ", "");

    await jwt.verify(token, config.get("secretKey"), async (err, decoded) => {
      if (decoded["id_role"] == "3") {
        let result = await UserService.GetByIdUserDoctor(decoded["id"]);
        req.body["ID"] = result[0]["id"];
        res.setHeader("Content-Type", "application/json");
        next();
      } else {
        return res
          .status(400)
          .send(JSON.stringify({ ERROR: "You are not an doctor" }));
      }
    });
  },
};
