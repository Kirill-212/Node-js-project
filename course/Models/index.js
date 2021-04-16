const Sequelize = require("sequelize");
var config = require("../libs/config");
const sequelize = new Sequelize(
  config.get("db"),
  config.get("User"),
  config.get("Password"),
  config.get("ConnectionString")
);

const users = require("./users")(Sequelize, sequelize);
const receptions = require("./receptions")(Sequelize, sequelize);
const roles = require("./roles")(Sequelize, sequelize);
const patients = require("./patients")(Sequelize, sequelize);
const doctors = require("./doctors")(Sequelize, sequelize);

users.hasMany(doctors, {
  as: "USERS_DOCTORS",
  foreignKey: "id_users",
  onDelete: "CASCADE",
  sourceKey: "id",
});

users.hasMany(patients, {
  as: "PATIENTS_DOCTORS",
  foreignKey: "id_users",
  onDelete: "CASCADE",
  sourceKey: "id",
});

doctors.hasMany(receptions, {
  as: "DOCTORS_RECEPTION",
  foreignKey: "id_doctor",
  sourceKey: "id",
});

patients.hasMany(receptions, {
  as: "PATIENTS_RECEPTION",
  foreignKey: "id_patient",
  sourceKey: "id",
  onDelete: "CASCADE",
});
roles.hasMany(users, {
  as: "ROLES_USERS",
  foreignKey: "id_role",
  sourceKey: "id",
});

module.exports = {
  doctors: doctors,
  patients: patients,
  roles: roles,
  receptions: receptions,
  users: users,
  sequelize,
  Sequelize,
};
