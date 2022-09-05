const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "unit",
    {
      company_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "company_defination",
          key: "id_company",
        },
      },
      id_unit: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        // references: {
        //   model: 'location',
        //   key: 'unit_id'
        // }
      },
      name_unit: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code_unit: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      note_unit: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_unit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "unit",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_unit" }],
        },
        {
          name: "fk_unit_company_defination",
          using: "BTREE",
          fields: [{ name: "company_id" }],
        },
      ],
    }
  );
};
