var express = require("express");
const DoctorController = require("../Controllers/Doctor");
const RoleController = require("../Controllers/Role");
const passport = require("passport");
module.exports = () => {
  var router = express.Router();
  router.post(
    "/post",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    DoctorController.PostDoctor
  );

  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    DoctorController.GetAllDoctorsFullInf
  );
  router.get(
    "/get",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleUser,
    DoctorController.GetAllDoctorsForPatient
  );

  router.get(
    "/getbyfirstandlastname",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    DoctorController.GetByFirstAndLastName
  );
  router.delete(
    "/delete/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    DoctorController.DeleteDoctor
  );
  router.put(
    "/put/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    DoctorController.PutDoctor
  );
  return router;
};
