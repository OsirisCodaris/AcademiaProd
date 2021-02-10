/* jshint indent: 2 */
const config = require('../config/config')

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
      file: {
        type: 'TEXT',
        allowNull: true,
        get() {
          return this.getDataValue('file') != null
            ? `${config.URL_READ_FORUM_FILE}/${this.getDataValue('file')}`
            : null
        },
      },
      status: {
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
