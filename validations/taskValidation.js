const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().allow('').optional(),
  status: Joi.string().valid('pending', 'in-progress', 'done').optional(),
  due_date: Joi.string().isoDate().optional(),
  user_id: Joi.number().integer().required(),
});

module.exports = { createTaskSchema };
