'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vacancy = sequelize.define(
    'Vacancy',
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      companyId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {},
  );
  Vacancy.associate = (models) => {
    Vacancy.hasOne(models.Company, {
      foreignKey: 'id',
      as: 'company',
      sourceKey: 'companyId',
    });

    
    Vacancy.belongsToMany(models.Skill, {
      as: 'skills',
      through: {
        model: models.VacancySkill,
        unique: false,
      },
      foreignKey: 'vacancyId',
    });
  };
  return Vacancy;
};
