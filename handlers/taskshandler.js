const db = require('../db/database');
const { createTaskSchema } = require('../validations/taskValidation');

const createTask = async (request, h) => {
  const { error, value } = createTaskSchema.validate(request.payload);
  if (error) {
    return h.response({ status: 'fail', message: error.message }).code(400);
  }

  const { title, description, status = 'pending', due_date, user_id } = value;

  return new Promise((resolve) => {
    const query =
      'INSERT INTO tasks (title, description, status, due_date, user_id) VALUES (?, ?, ?, ?, ?)';
    db.run(
      query,
      [title, description, status, due_date, user_id],
      function (err) {
        if (err) {
          resolve(
            h.response({ status: 'error', message: err.message }).code(500),
          );
        } else {
          resolve(
            h
              .response({
                status: 'success',
                data: {
                  id: this.lastID,
                  title,
                  description,
                  status,
                  due_date,
                  user_id,
                },
              })
              .code(201),
          );
        }
      },
    );
  });
};

const getAllTasks = async (request, h) => {
  return new Promise((resolve) => {
    const query = 'SELECT * FROM tasks';
    db.all(query, [], (err, rows) => {
      if (err) {
        resolve(
          h.response({ status: 'error', message: err.message }).code(500),
        );
      } else {
        resolve(h.response({ status: 'success', data: rows }).code(200));
      }
    });
  });
};

const getTaskbyId = async (request, h) => {
  const { id } = request.params;

  return new Promise((resolve) => {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    db.get(query, [id], (err, row) => {
      if (err) {
        resolve(
          h.response({ status: 'error', message: err.message }).code(500),
        );
      } else if (!row) {
        resolve(h.response({ status: 'fail', message: 'task not found' })).code(
          404,
        );
      } else {
        resolve(h.response({ status: 'success', data: row }).code(200));
      }
    });
  });
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskbyId,
};
