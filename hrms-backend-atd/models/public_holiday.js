const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "public_holiday",
    {
      id_public_holiday: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_public_holiday: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code_public_holiday: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      is_working_public_holiday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      is_halfday_public_holiday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      date_public_holidy: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      note_public_holiday: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_public_holiday: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "public_holiday",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_public_holiday" }],
        },
      ],
    }
  );
};
