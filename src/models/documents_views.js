/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const docView = sequelize.define(
    'documentsViews',
    {
      iddocuments: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        references: {
          model: {
            tableName: 'documents',
          },
          key: 'iddocuments',
        },
      },
      idusers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
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
      tableName: 'documents_views',
      timestamps: false,
    }
  )
  return docView
}
