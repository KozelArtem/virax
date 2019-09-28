'use strict';
module.exports = (sequelize, DataTypes) => {
  const VacancySkill = sequelize.define('VacancySkill', {
    vacancyId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {});
  VacancySkill.associate = function(models) {
    // associations can be defined here
  };
  return VacancySkill;
};