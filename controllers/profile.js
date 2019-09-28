const { student: studentSvc, company: companySvc } = require('../services');


const get = async (req, res) => {
  const roleId = req.user.roleId;

  try {
    if (roleId === 1) {
      const profile = await studentSvc.getByUserId(req.user.id);

      res.send(profile || { roleId });

      return;
    } else if (roleId === 2) {
      const profile = await companySvc.getByUserId(req.user.id);

      res.send(profile || { roleId });

      return;
    }
  } catch(err) {
    res.status(500).send({ message: err.message });
  }
};



module.exports = {
  get,
}
