/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Subscriber = sequelize.define(
    'Subscribers',
    {
      idsubscribers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      price: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      createdat: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      finishedat: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
    },
    {
      sequelize,
      tableName: 'subscribers',
      timestamps: false,
    }
  )
  Subscriber.associate = (models) => {
    // associations can be defined here
    Subscriber.belongsTo(models.Users, {
      foreignKey: 'idusers',
    })
  }
  return Subscriber
}
