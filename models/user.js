'use strict';
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const config = require('../config/app.json');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
      confirmation: DataTypes.STRING,
    },
    {},
  );
  User.associate = (models) => {
    User.beforeCreate(async (user) => {
      const data = user;

      data.status = false;
      data.password = await bcrypt.hash(user.password, config.passwordSalt);
      data.confirmation = await crypto.randomBytes(20).toString('hex');

      return data;
    });

    User.beforeUpdate(async (user) => {
      const data = user;

      if (user.changed('password')) {
        data.password = await bcrypt.hash(user.password, config.passwordSalt);
      }

      return data;
    });

    User.hasOne(models.Role, {
      targetKey: 'roleId',
      foreignKey: 'id',
      as: 'role',
    });

    User.hasMany(models.UserContact, {
      foreignKey: 'userId', 
      sourceKey: 'id',
      as: 'contacts',
    });
  };
  return User;
};
