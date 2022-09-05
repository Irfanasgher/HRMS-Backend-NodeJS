const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mapping_company_policy', {
    id_mapping_company_policy: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'company_defination',
        key: 'id_company'
      }
    },
    policy_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'policy_defination',
        key: 'id_policy'
      }
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'mapping_company_policy',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_mapping_company_policy" },
        ]
      },
      {
        name: "fk_mapping_company_policy_policy_defination",
        using: "BTREE",
        fields: [
          { name: "policy_id" },
        ]
      },
      {
        name: "fk_mapping_company_policy_company_defination",
        using: "BTREE",
        fields: [
          { name: "company_id" },
        ]
      },
    ]
  });
};
