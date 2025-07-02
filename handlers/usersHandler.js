const db = require('../db/database');
const { createUserSchema } = require('../validations/userValidation');

const createUser = async (request, h) => {
  try {
    const { error, value } = createUserSchema.validate(request.payload);
    if (error) {
      return h.response({ status: 'fail', message: error.message }).code(400);
    }

    const { name, email } = value;

    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
      db.run(query, [name, email], function (err) {
        if (err) {
          resolve(
            h
              .response({
                status: 'error',
                message: 'Email mungkin sudah digunakan.',
              })
              .code(400),
          );
        } else {
          resolve(
            h
              .response({
                status: 'success',
                data: { id: this.lastID, name, email },
              })
              .code(201),
          );
        }
      });
    });
  } catch (err) {
    return h.response({ status: 'error', message: err.message }).code(500);
  }
};

const getUser = async (request, h) => {
  const { id } = request.params;

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [id], (err, row) => {
      if (err) {
        resolve(
          h.response({ status: 'error', message: err.message }).code(500),
        );
      } else if (!row) {
        resolve(
          h.response({ status: 'fail', message: 'User not found' }).code(400),
        );
      } else {
        resolve(h.response({ status: 'success', data: row }).code(200));
      }
    });
  });
};

module.exports = {
  createUser,
  getUser,
};
