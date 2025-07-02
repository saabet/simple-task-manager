const db = require('../db/database');
const { createTaskSchema } = require('../validations/taskValidation');
const { updateTaskSchema } = require('../validations/taskValidation');
const {
  response_success,
  response_fail,
  response_error,
} = require('../utils/responseFormatter');

const createTask = async (request, h) => {
  const { error, value } = createTaskSchema.validate(request.payload);
  if (error) {
    return response_fail(h, error.message);
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
          resolve(response_error(h, err.message));
        } else {
          resolve(
            response_success(
              h,
              {
                id: this.lastID,
                title,
                description,
                status,
                due_date,
                user_id,
              },
              201,
            ),
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
        resolve(response_error(h, err.message));
      } else {
        resolve(response_success(h, rows));
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
        resolve(response_error(h, err.message));
      } else if (!row) {
        resolve(response_fail(h, 'Task not found', 404));
      } else {
        resolve(response_success(h, row));
      }
    });
  });
};

const getTasksByUser = async (request, h) => {
  const { id } = request.params;

  return new Promise((resolve) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    const query2 = 'SELECT * FROM tasks WHERE user_id = ?';

    db.get(query, [id], (err, user) => {
      if (err) return resolve(response_error(h, err.message));
      if (!user) return resolve(response_fail(h, 'User not found.'));

      db.all(query2, [id], (err2, rows) => {
        if (err2) {
          return resolve(response_error(h, err2.message));
        }
        if (rows.length === 0) {
          return resolve(response_success(h, [], 'No tasks found for this user'));
        }
        return resolve(response_success(h, rows));
      });
    });
  });
};

const updateTask = async (request, h) => {
  const { id } = request.params;
  const { error, value } = updateTaskSchema.validate(request.payload);

  if (error) {
    return response_fail(h, error.message);
  }

  const fields = Object.keys(value);
  if (fields.length === 0) {
    return response_fail(h, 'No fields to update');
  }

  const query = `UPDATE tasks SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`;
  const values = [...fields.map((f) => value[f]), id];

  return new Promise((resolve) => {
    db.run(query, values, function (err) {
      if (err) {
        resolve(response_error(h, err.message));
      } else if (this.changes === 0) {
        resolve(response_fail(h, 'Task not found.', 404));
      } else {
        resolve(response_success(h, 'Task updated.'));
      }
    });
  });
};

const deleteTask = async (request, h) => {
  const { id } = request.params;

  return new Promise((resolve) => {
    db.run('DELETE FROM tasks WHERE id = ?', [id], function (err) {
      if (err) {
        resolve(response_error(h, err.message));
      } else if (this.changes === 0) {
        resolve(response_fail(h, 'Task not found.', 404));
      } else {
        resolve(response_success(h, 'Task deleted.'));
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
