const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reason', {
    id_reason: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    reason_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'reason_type',
        key: 'id_reason_type'
      }
    },
    text_reason: {
      type: DataTypes.STRING(300),
      allowNull: false
    },
    is_enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'reason',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_reason" },
        ]
      },
      {
        name: "fk_reason_reason_type",
        using: "BTREE",
        fields: [
          { name: "reason_type_id" },
        ]
      },
    ]
  });
};
