module.exports = (Sequelize, sequelize) => {
  return sequelize.define(
    "role",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: { type: Sequelize.STRING, allowNULL: false },
    },
    { sequelize, modelName: "role", tableName: "role" }
  );
};
