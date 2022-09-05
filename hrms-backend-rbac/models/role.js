const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "role",
    {
      id_role: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_role: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      is_sysadmin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "role",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_role" }],
        },
      ],
    }
  );
};
