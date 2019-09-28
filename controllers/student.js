const { student: studentSvc } = require('../services');

module.exports = {
  get: async (req, res) => {
    const id = req.params.studentId;

    try {
      const student = await studentSvc.getById(id);

      if (!student) {
        res.send(404).send({ message: `Student with id: ${id} not found` });

        return;
      }

      res.send(student);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },
};
