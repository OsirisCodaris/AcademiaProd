/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define(
    'Responses',
    {
      idresponses: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: 'LONGTEXT',
        allowNull: true,
      },
      state: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      idproblems: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'problems',
          },
          key: 'idproblems',
        },
      },
      idusers: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
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
      tableName: 'responses',
    }
  )
  Response.associate = (models) => {
    // associations can be defined here
    Response.belongsTo(models.Problems, {
      foreignKey: 'idproblems',
    })
    Response.belongsTo(models.Users, {
      foreignKey: 'idusers',
    })
  }
  return Response
}
