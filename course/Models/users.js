module.exports = (Sequelize, sequelize) => {
  return sequelize.define(
    "users",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNULL: false,
        primaryKey: true,
        autoIncrement: true,
      },
      email: { type: Sequelize.STRING, allowNULL: false },
      first_name: { type: Sequelize.STRING, allowNULL: false },
      last_name: { type: Sequelize.STRING, allowNULL: false },
      password: { type: Sequelize.STRING, allowNULL: false },
      status: { type: Sequelize.STRING, allowNULL: false },
      bday: { type: Sequelize.DATE },
      gender: { type: Sequelize.STRING },
    },
    { sequelize, modelName: "users", tableName: "users" }
  );
};
