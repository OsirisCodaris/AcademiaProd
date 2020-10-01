/* jshint indent: 2 */
const bcrypt = require('bcrypt')

async function hashPassword(user) {
  const SALT_FACTOR = 10

  if (!user.changed('password')) {
    return
  }
  const hashage = await bcrypt.hash(user.password, SALT_FACTOR)
  user.setDataValue('password', hashage)
}
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      idusers: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      fullname: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      refreshtoken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users',
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  )
  // eslint-disable-next-line func-names
  User.prototype.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password)
  }
  User.associate = (models) => {
    // associations can be defined here
    User.hasOne(models.Subscribers, {
      foreignKey: 'idusers',
    })
    User.hasOne(models.Students, {
      foreignKey: 'idstudents',
      as: 'Student',
    })
    User.hasOne(models.Teachers, {
      foreignKey: 'idteachers',
      as: 'Teacher',
    })
    User.hasOne(models.Admins, {
      foreignKey: 'idadmins',
      as: 'Admin',
    })
    User.belongsToMany(models.Teachers, {
      through: 'teachersLikes',
      as: 'teacherLike',
      foreignKey: 'idusers',
      otherKey: 'idteachers',
    })
    User.belongsToMany(models.Documents, {
      through: 'documentsViews',
      as: 'docViews',
      foreignKey: 'idusers',
      otherKey: 'iddocuments',
    })
  }
  return User
}
