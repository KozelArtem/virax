const { User } = require('../models');

const getById = (id) => User.findByPk(id);
const getByOptions = (options) => User.findOne(options);

const findByEmail = (email) => User.findOne({ where: { email } });
const findByConfirmation = (code) =>
  User.findOne({ where: { confirmation: code } });

const checkEmailForFree = async (email) => {
  const result = await findByEmail(email);

  return !result;
};

const create = (email, password, roleId, confirmation) =>
  User.create({ email, password, roleId, confirmation });

const updatePassword = (id, password) => update(id, { password });
const update = (id, data) => User.update(data, { where: { id } });

module.exports = {
  getById,
  findByEmail,
  findByConfirmation,
  getByOptions,
  create,
  updatePassword,
  update,
  checkEmailForFree,
};
