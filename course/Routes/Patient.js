var express = require("express");
const PatientController = require("../Controllers/Patient");
const RoleController = require("../Controllers/Role");
const passport = require("passport");
module.exports = () => {
  var router = express.Router();
  router.post(
    "/post",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    PatientController.PostPatient
  );
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    PatientController.GetAllPatient
  );
  router.get(
    "/get",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleDoctor,
    PatientController.GetAllPatient
  );
  router.get(
    "/getbyfirstandlastname",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    PatientController.GetByFirstAndLastName
  );
  router.delete(
    "/delete/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    PatientController.DeletePatient
  );
  router.put(
    "/put/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    PatientController.PutPatient
  );
  return router;
};
