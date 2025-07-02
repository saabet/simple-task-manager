const db = require('../db/database');
const { createTaskSchema } = require('../validations/taskValidation');
const { updateTaskSchema } = require('../validations/taskValidation');

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
  const { status } = request.query;

  let query = 'SELECT * FROM tasks';
  const params = [];

  if (status) {
    query += 'WHERE status = ?';
    params.push(status);
  }

  return new Promise((resolve) => {
    db.all(query, params, (err, rows) => {
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
        resolve(h.response({ status: 'fail', message: 'task not found' }).code(
          404,
        ));
      } else {
        resolve(h.response({ status: 'success', data: row }).code(200));
      }
    });
  });
};

const getTasksByUser = async (request, h) => {
  const { id } = request.params;

  return new Promise((resolve) => {
    const query = 'SELECT * FROM tasks WHERE id = ?';
    db.all(query, [id], (err, rows) => {
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

const updateTask = async (request, h) => {
  const { id } = request.params;
  const { error, value } = updateTaskSchema.validate(request.payload);

  if (error) {
    return h.response({ status: 'fail', message: error.message }).code(400);
  }

  const fields = Object.keys(value);
  if (fields.length === 0) {
    return h
      .response({ status: 'fail', message: 'No fields to update.' })
      .code(400);
  }

  const query = `UPDATE tasks SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`;
  const values = [...fields.map((f) => value[f]), id];

  return new Promise((resolve) => {
    db.run(query, values, function (err) {
      if (err) {
        resolve(
          h.response({ status: 'error', message: err.message }).code(500),
        );
      } else if (this.changes === 0) {
        resolve(
          h.response({ status: 'fail', message: 'Task not found' }).code(404),
        );
      } else {
        resolve(
          h.response({ status: 'success', message: 'Task updated' }).code(200),
        );
      }
    });
  });
};

const deleteTask = async (request, h) => {
  const { id } = request.params;

  return new Promise((resolve) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
      if (err) {
        resolve(
          h.response({ status: 'error', message: err.message }).code(500),
        );
      } else if (this.changes === 0) {
        resolve(
          h.response({ status: 'fail', message: 'Task not found' }).code(404),
        );
      } else {
        resolve(
          h.response({ status: 'success', message: 'Task deleted' }).code(200),
        );
      }
    });
  });
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskbyId,
  getTasksByUser,
  updateTask,
  deleteTask,
};
