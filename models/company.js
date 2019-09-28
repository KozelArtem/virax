'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define(
    'Company',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      imagePath: DataTypes.STRING,
    },
    {},
  );
  Company.associate = (models) => {
    Company.hasMany(models.Vacancy, {
      foreignKey: 'companyId',
      as: 'vacancies',
      sourceKey: 'id',
    });
  };
  return Company;
};
