/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Notifications = sequelize.define(
    'Notifications',
    {
      idnotifications: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      idusers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'users',
          },
          key: 'idusers',
        },
      },

      idproblems: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        references: {
          model: {
            tableName: 'problems',
          },
          key: 'idproblems',
        },
      },
      tokenfcm: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'notifications',
      timestamps: false,
    }
  )
  Notifications.associate = (models) => {
    // associations can be defined here
    Notifications.belongsTo(models.Problems, {
      foreignKey: 'idproblems',
    })
    Notifications.belongsTo(models.Users, {
      foreignKey: 'idusers',
    })
  }
  return Notifications
}
