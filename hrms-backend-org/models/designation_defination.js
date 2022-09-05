const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "designation_defination",
    {
      // company_id: {
      //   type: DataTypes.BIGINT,
      //   allowNull: false,
      //   references: {
      //     model: 'company_defination',
      //     key: 'id_company'
      //   }
      // },
      designation_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "designation_type",
          key: "id_designation_type",
        },
      },
      parent_designation_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: {
          model: "designation_defination",
          key: "id_designation",
        },
      },
      id_designation: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      name_designation: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      code_designation: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      note_designation: {
        type: DataTypes.STRING(400),
        allowNull: true,
      },
      is_enable_designation: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "designation_defination",
      timestamps: true,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id_designation" }],
        },
        {
          name: "fk_designation_defination_designation_type",
          using: "BTREE",
          fields: [{ name: "designation_type_id" }],
        },
        // {
        //   name: "fk_designation_defination_company_defination",
        //   using: "BTREE",
        //   fields: [
        //     { name: "company_id" },
        //   ]
        // },
        {
          name: "fk_designation_defination_designation_defination",
          using: "BTREE",
          fields: [{ name: "parent_designation_id" }],
        },
      ],
    }
  );
};
