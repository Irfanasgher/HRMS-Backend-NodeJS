const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "break_bank",
    {
      time_slot_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "time_slot",
          key: "id_time_slot",
        },
      },
      id_break_bank: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_break_bank: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code_break_bank: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      frequency_break_bank: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      duration_break_bank: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      note_break_bank: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_break_bank: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "break_bank",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_break_bank" }],
        },
        {
          name: "fk_break_bank_time_slot",
          using: "BTREE",
          fields: [{ name: "time_slot_id" }],
        },
      ],
    }
  );
};
