const { Company, UserContact, User, Vacancy } = require('../models');

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
    model: Vacancy,
    as: 'vacancies',
  },
];

module.exports = {
  getById: (id) => Company.findByPk(id, { include: USER_INCLUDES }),

  getByUserId: (userId) => {
    return Company.findOne({
      where: { userId },
      include: USER_INCLUDES,
    });
  },

  createOrUpdateByUserId: async (userId, data) => {
    try {
      const profile = await Company.findOne({ where: { userId } });

      if (!profile) {
        return Company.create(data);
      }

      return profile.update(data);
    } catch (err) {
      throw err;
    }
  },
};
