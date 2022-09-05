const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "department_defination",
    {
      parent_deparment_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "department_defination",
          key: "id_department",
        },
      },
      id_department: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_department: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code_department: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      note_department: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_department: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "department_defination",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_department" }],
        },

        {
          name: "fk_department_defination_department_defination",
          using: "BTREE",
          fields: [{ name: "parent_deparment_id" }],
        },
      ],
    }
  );
};
