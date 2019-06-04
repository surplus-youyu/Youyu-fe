module.exports = {
  'GET /api/questionnaires/:id': (req, res) => {
    // if (req.params.id === 1) {
      res.send({
        msg: 'ok',
        status: true,
        data: {
          tid: 1,
          title: 'questionnaire 1',
          owner: 1,
          summary: 'a summary',
          type: 'survey',
          bounty: 10,
          extra: JSON.stringify([
            {
              title: 'question 1',
              type: 1,
              options: ['o1', 'o2', 'o3'],
              optional: true,
              limit: 1
            },
            {
              title: 'question 2',
              type: 2,
              options: ['p1', 'p2', 'p3'],
              optional: true,
              limit: 2
            },
            {
              title: 'question 3',
              type: 3,
              options: [],
              optional: true,
              limit: -1
            }
          ]),
          owner: 1,
          enclosure: '',
        }
      });
    // }
  }
};
