'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    'Student',
    {
      userId: DataTypes.INTEGER,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      birthday: DataTypes.DATE,
      private: DataTypes.BOOLEAN,
      photoPath: DataTypes.STRING,
      personalDetails: DataTypes.STRING,
    },
    {},
  );
  Student.associate = (models) => {
    // Student.hasOne(models.User, {
    //   targetKey: 'id',
    //   as: 'user',
    //   sourceKey: 'userId',
    // });
  };
  return Student;
};
