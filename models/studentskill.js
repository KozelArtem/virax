'use strict';
module.exports = (sequelize, DataTypes) => {
  const StudentSkill = sequelize.define('StudentSkill', {
    studentId: DataTypes.INTEGER,
    skillId: DataTypes.INTEGER
  }, {});
  StudentSkill.associate = models => {
    // associations can be defined here
  };
  return StudentSkill;
};
