'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      imagePath: DataTypes.STRING,
      address: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {},
  );
  Company.associate = (models) => {
    Company.hasOne(models.User, {
      foreignKey: 'id',
      as: 'user',
      sourceKey: 'userId',
    });

    Company.hasMany(models.Vacancy, {
      foreignKey: 'companyId',
      as: 'vacancies',
      sourceKey: 'id',
    });  
  };
  return Company;
};
