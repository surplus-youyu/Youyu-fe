const user = require('./user.js');
const questionnaire = require('./questionnaire.js');
const auth = require('./auth.js');
const requests = require('./requests.js');

module.exports = {
  ...user,
  ...questionnaire,
  ...auth,
  ...requests
};
