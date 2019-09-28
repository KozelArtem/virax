'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      userId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      livingInfo: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      birthday: DataTypes.DATE,
      private: DataTypes.BOOLEAN,
      photoPath: DataTypes.STRING,
      personalDetails: DataTypes.STRING,
    },
    {},
  );
  Student.associate = (models) => {
    Student.hasOne(models.User, {
      foreignKey: 'id',
      as: 'user',
      sourceKey: 'userId',
    });

    Student.belongsToMany(models.Skill, {
      as: 'skills',
      through: {
        model: models.StudentSkill,
        unique: false,
      },
      foreignKey: 'studentId',
    });
  };
  return Student;
};
