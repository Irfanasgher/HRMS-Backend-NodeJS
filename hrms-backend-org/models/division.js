const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('division', {
    state_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'state',
        key: 'id_state'
      }
    },
    id_division: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_division: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_enable_division: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'division',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_division" },
        ]
      },
      {
        name: "fk_division_state",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
    ]
  });
};
