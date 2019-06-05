const user = require('./user.js');
const questionnaire = require('./questionnaire.js');
const auth = require('./auth.js');

module.exports = {
  ...user,
  ...questionnaire,
  ...auth
};
