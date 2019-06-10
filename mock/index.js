const user = require('./user.js');
const questionnaire = require('./questionnaire.js');
const requests = require('./requests.js');

module.exports = {
  ...user,
  ...questionnaire,
  ...requests
};
