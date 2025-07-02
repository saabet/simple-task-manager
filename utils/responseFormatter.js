const response_success = (h, data = null, message = null, code = 200) => {
  const response = {
    status: 'success',
  };

  if (message) {
    response.message = message;
  }
  if (data != null) {
    response.data = data;
  }

  return h.response(response).code(code);
};
const response_fail = (h, message, code = 400) =>
  h.response({ status: 'fail', message }).code(code);
const response_error = (h, message, code = 500) =>
  h.response({ status: 'error', message }).code(code);

module.exports = { response_success, response_fail, response_error };
