const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('city', {
    state_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'state',
        key: 'id_state'
      }
    },
    id_city: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_city: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    is_enable_city: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'city',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_city" },
        ]
      },
      {
        name: "fk_city_state",
        using: "BTREE",
        fields: [
          { name: "state_id" },
        ]
      },
    ]
  });
};
