const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const config = require('../config/app.json');

const { Role, Sequelize } = require('../models');

const { user: userSvc, validator, mailer: mailerSvc } = require('../services');

const { isEmail, minLength } = validator;
const { sendActivation } = mailerSvc;

const PASSWORD_MIN_LENGTH = 6;

const generateToken = (userId) => jwt.sign(userId, config.secret);

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: 'Email and password are required',
      fields: ['email', 'password'],
    });

    return;
  }

  try {
    const user = await userSvc.findByEmail(email);

    if (!user) {
      res.status(400).send({
        message: `Can't find user with email: ${email}`,
        fields: ['email'],
      });

      return;
    }

    const correct = await bcrypt.compare(password, user.password);

    if (!correct) {
      res.status(400).send({
        message: `Incorect password`,
        fields: ['password'],
      });

      return;
    }

    if (user.confirmation) {
      res.status(400).send({
        message: `Account is not activated`,
      });

      return;
    }

    const token = await generateToken(user.id);
    res.send({ token, roleId: user.roleId });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  const { email, password, roleId } = req.body;

  if (!email || !password) {
    res.status(400).send({
      message: 'Email and password are required',
      fields: ['email', 'password'],
    });

    return;
  }

  if (!roleId) {
    res.status(400).send({
      message: 'Please select role',
      fields: ['roleId'],
    });

    return;
  }

  if (!isEmail(email)) {
    res.status(400).send({
      message: 'Email has incorect format',
      fields: ['email'],
    });

    return;
  }

  if (!minLength(password, PASSWORD_MIN_LENGTH)) {
    res.status(400).send({
      message: `Password minimum length is ${PASSWORD_MIN_LENGTH}`,
      fields: ['password'],
    });

    return;
  }

  try {
    const isFreeEmail = await userSvc.checkEmailForFree(email);

    if (!isFreeEmail) {
      res.status(400).send({
        message: `Account with email ${email} already exist`,
        fields: ['email'],
      });

      return;
    }

    const user = await userSvc.create(email, password, roleId);

    const sent = await sendActivation(email, user.confirmation);

    if (!sent) {
      res.status(500).send({
        message: 'Something went wrong. Please try again later.',
      });

      return;
    }

    res
      .status(200)
      .send({ message: 'Account created. Confirmation message sent to email' });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const confirm = async (req, res) => {
  const code = req.query.code;

  if (!code) {
    res.status(400).send({
      message: 'Activation code is required',
      fields: ['code'],
    });

    return;
  }

  try {
    const user = await userSvc.findByConfirmation(code);

    if (!user) {
      res.status(400).send({
        message: 'Invalid confirmation code',
        fields: ['code'],
      });

      return;
    }

    const success = await userSvc.update(user.id, { confirmation: null });

    if (!success) {
      res.status(500).send({
        message: 'Something went wrong. Please try again later.',
      });

      return;
    }

    const token = await generateToken(user.id);

    res.send({ token });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Role.findAll({
      where: {
        name: {
          [Sequelize.Op.not]: 'Admin',
        },
      },
    });

    res.send({ roles });
  } catch (err) {
    res.send(500).send({ message: 'Something went wrong. Try again later.' });
  }
};

module.exports = {
  login,
  register,
  // logout,
  confirm,
  getRoles,
};
