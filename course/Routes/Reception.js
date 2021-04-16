var express = require("express");
const ReceptionController = require("../Controllers/Reception");
const RoleController = require("../Controllers/Role");
const passport = require("passport");
module.exports = () => {
  var router = express.Router();
  router.post(
    "/post",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleUser, //patient
    ReceptionController.PostPatient
  );
  router.get(
    "/getbyDoctor/",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleDoctor,
    ReceptionController.GetAllByDoctor
  );
  router.get(
    "/getbyPatient",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleUser,
    ReceptionController.GetAllByPatient
  );
  router.delete(
    "/delete/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleDoctor,
    ReceptionController.Delete
  );
  router.delete(
    "/delete/patient/reception/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleUser,
    ReceptionController.DeleteForPatient
  );

  router.put(
    "/put/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleDoctor,
    ReceptionController.Put
  );
  return router;
};
