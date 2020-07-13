/* jshint indent: 2 */

module.exports = (sequelize, DataTypes) => {
  const Doc = sequelize.define(
    'Documents',
    {
      iddocuments: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      year: {
        type: 'YEAR(4)',
        allowNull: false,
      },
      pathfile: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      status: {
        type: DataTypes.INTEGER(1),
        allowNull: true,
      },
      idtypedocs: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: {
            tableName: 'typedocs',
          },
          key: 'idtypedocs',
        },
      },
    },
    {
      sequelize,
      tableName: 'documents',
      timestamps: false,
    }
  )
  Doc.associate = (models) => {
    // associations can be defined here
    Doc.hasOne(models.docAnswers, {
      foreignKey: 'iddocuments',
    })
    Doc.belongsTo(models.typeDocs, {
      foreignKey: 'idtypedocs',
    })
    Doc.belongsToMany(models.Users, {
      through: 'documentsViews',
      as: 'userViews',
      foreignKey: 'iddocuments',
      otherKey: 'idusers',
    })
  }
  return Doc
}
