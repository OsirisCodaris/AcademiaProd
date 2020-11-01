/* jshint indent: 2 */
const config = require('../config/config')

module.exports = (sequelize, DataTypes) => {
  const docAnswer = sequelize.define(
    'docAnswers',
    {
      iddocanswers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pathfile: {
        type: DataTypes.STRING(255),
        allowNull: false,
        get() {
          return `${config.URL_READ_DOC}/${this.getDataValue('pathfile')}`
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      iddocuments: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
          model: {
            tableName: 'documents',
          },
          key: 'iddocuments',
        },
      },
    },
    {
      sequelize,
      tableName: 'docanswers',
      timestamps: false,
    }
  )
  docAnswer.associate = (models) => {
    // associations can be defined here
    docAnswer.belongsTo(models.Documents, {
      foreignKey: 'iddocuments',
    })
  }
  return docAnswer
}
