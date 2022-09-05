const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('over_time', {
    id_over_time: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name_over_time: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    code_over_time: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    required_duration_over_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    adjustment_percentage_over_time: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: true
    },
    adjustment_value_over_time: {
      type: DataTypes.DECIMAL(18,4),
      allowNull: true
    },
    max_duration_over_time: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    note_over_time: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    is_enable_over_time: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'over_time',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_over_time" },
        ]
      },
    ]
  });
};
