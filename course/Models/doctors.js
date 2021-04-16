module.exports = (Sequelize, sequelize) => {
  return sequelize.define(
    "doctors",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name_hospital: { type: Sequelize.STRING, allowNULL: false },
      passport: { type: Sequelize.STRING, allowNULL: false },
      specialty: { type: Sequelize.STRING, allowNULL: false },
      homeaddress: { type: Sequelize.STRING, allowNULL: false },
    },
    { sequelize, modelName: "doctors", tableName: "doctors" }
  );
};
