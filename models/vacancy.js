'use strict';
module.exports = (sequelize, DataTypes) => {
  const Vacancy = sequelize.define('Vacancy', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    companyId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {});
  Vacancy.associate = function(models) {
    // associations can be defined here
  };
  return Vacancy;
};
