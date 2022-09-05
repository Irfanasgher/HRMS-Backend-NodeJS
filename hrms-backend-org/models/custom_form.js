const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "custom_form",
    {
      company_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "company_defination",
          key: "id_company",
        },
      },
      id_custom_form: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        // references: {
        //   model: 'location',
        //   key: 'unit_id'
        // }
      },
      name_custom_form: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      nick_name_custom_form: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      description_custom_form: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      name_for_entity: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "custom_form",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_custom_form" }],
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
