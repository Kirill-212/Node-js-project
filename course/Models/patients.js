module.exports = (Sequelize, sequelize) => {
  return sequelize.define(
    "patients",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true,
      },
      homeaddress: { type: Sequelize.STRING, allowNULL: false },
      passport: { type: Sequelize.STRING, allowNULL: false },
    },
    { sequelize, modelName: "patients", tableName: "patients" }
  );
};
