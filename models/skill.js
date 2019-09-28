'use strict';
module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    name: DataTypes.STRING
  }, {});
  Skill.associate = models => {
    Skill.belongsToMany(models.Student, {
      through: {
        model: models.StudentSkill,
        unique: false,
      },
      foreignKey: 'skillId',
    });
  };
  return Skill;
};
