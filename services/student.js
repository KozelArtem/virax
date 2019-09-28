const { Student, UserContact, User, Skill } = require('../models');

const USER_INCLUDES = [
  {
    model: User,
    as: 'user',
    attributes: ['id'],
    include: {
      model: UserContact,
      as: 'contacts',
    },
  },
  {
    model: Skill,
    as: 'skills',
    attributes: ['id', 'name'],
    through: {
      attributes: [],
    }
  },
];

module.exports = {
  getById: (id) => Student.findByPk(id, { include: USER_INCLUDES }),

  getByUserId: (userId) => {
    return Student.findOne({
      where: { userId },
      include: USER_INCLUDES,
    });
  },

  createOrUpdateByUserId: async (userId, data) => {
    try {
      const profile = await Student.findOne({ where: { userId } });

      if (!profile) {
        return Student.create(data);
      }

      return profile.update(data);
    } catch (err) {
      throw err;
    }
  },
};
