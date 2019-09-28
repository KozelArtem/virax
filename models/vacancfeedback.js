'use strict';
module.exports = (sequelize, DataTypes) => {
  const VacancFeedback = sequelize.define('VacancFeedback', {
    studentId: DataTypes.INTEGER,
    companyId: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {});
  VacancFeedback.associate = function(models) {
    // associations can be defined here
  };
  return VacancFeedback;
};