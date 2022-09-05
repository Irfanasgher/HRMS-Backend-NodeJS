const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "mapping_designation_company",
    {
      id_mapping_designation_company: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "company_defination",
          key: "id_company",
        },
      },
      designation_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "designation_defination",
          key: "id_designation",
        },
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "mapping_designation_company",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_mapping_designation_company" }],
        },
        {
          name: "fk_unit_company_defination",
          using: "BTREE",
          fields: [{ name: "company_id" }],
        },
        {
          name: "fk_unit_designation_defination",
          using: "BTREE",
          fields: [{ name: "designation_id" }],
        },
      ],
    }
  );
};
