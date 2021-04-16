module.exports = (Sequelize, sequelize) => {
  return sequelize.define(
    "receptions",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true,
      },
      comments: { type: Sequelize.STRING },
      date_reception: { type: Sequelize.STRING, allowNULL: false },
      diagnosis: { type: Sequelize.STRING },
      symptoms: { type: Sequelize.STRING, allowNULL: false },
      time: { type: Sequelize.STRING, allowNULL: false },
    },
    { sequelize, modelName: "receptions", tableName: "receptions" }
  );
};
