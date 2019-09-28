'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserContact = sequelize.define(
    'UserContact',
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      typeId: DataTypes.INTEGER,
      data: DataTypes.STRING,
    },
    {},
  );
  UserContact.associate = (models) => {
    UserContact.hasOne(models.ContactType, {
      foreignKey: 'typeId',
      targetKey: 'id',
      as: 'type',
    });

    UserContact.belongsTo(models.User, {
      foreignKey: 'id',
      sourceKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return UserContact;
};
