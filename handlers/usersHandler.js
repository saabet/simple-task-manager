const db = require('../db/database');
const { createUserSchema } = require('../validations/userValidation');
const {
  response_success,
  response_fail,
  response_error,
} = require('../utils/responseFormatter');

const createUser = async (request, h) => {
  try {
    const { error, value } = createUserSchema.validate(request.payload);
    if (error) {
      return response_fail(h, error.message);
    }

    const { name, email } = value;

    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
      db.run(query, [name, email], function (err) {
        if (err) {
          resolve(response_error(h, 'Email mungkin sudah digunakan.', 400));
        } else {
          resolve(response_success(h, { id: this.lastID, name, email }, 201));
        }
      });
    });
  } catch (err) {
    return response_error(h, err.message);
  }
};

const getUser = async (request, h) => {
  const { id } = request.params;

  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [id], (err, row) => {
      if (err) {
        resolve(response_error(h, err.message));
      } else if (!row) {
        resolve(response_fail(h, 'User not found'));
      } else {
        resolve(response_success(h, row));
      }
    });
  });
};

module.exports = {
  createUser,
  getUser,
};
