const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "regular_shift",
    {
      id_regular_shift: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_regular_shift: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code_regular_shift: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      note_regular_shift: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_regular_shift: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "regular_shift",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_regular_shift" }],
        },
      ],
    }
  );
};
