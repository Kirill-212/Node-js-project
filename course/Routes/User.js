var express = require("express");
const UserController = require("../Controllers/User");
const RoleController = require("../Controllers/Role");
const passport = require("passport");
module.exports = () => {
  var router = express.Router();
  router.post("/post", UserController.PostUser);
  router.post("/autUser", UserController.AutUser);
  router.delete(
    "/delete/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    UserController.DeleteUsers
  );
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    UserController.GetAllUsers
  );
  router.put(
    "/put/:ID",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    UserController.PutUser
  );
  router.put(
    "/putRole",
    passport.authenticate("jwt", { session: false }),
    RoleController.RoleAdmin,
    UserController.PutUserRole
  );
  return router;
};
