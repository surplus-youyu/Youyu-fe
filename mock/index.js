const user = require('./user.js');
const questionnaire = require('./questionnaire.js');

module.exports = {
  ...user,
  ...questionnaire
};
