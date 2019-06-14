const myassignment = [];
const question1 = {
  tid: 1 || req.params.id,
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
  enclosure: ''
};

const task = {
  tid: 2 || req.params.id,
  title: '快递帮拿',
  owner: 1,
  summary: '去明德园丰巢3号柜取快递',
  type: 'normal',
  bounty: 10,
  owner: 1,
  enclosure: ''
}

module.exports = {
  'GET /api/tasks/:id': (req, res) => {
    if (req.params.id == 1) {
      res.send({
        msg: 'ok',
        status: true,
        data: question1
      });
    } else {
      res.send({
        status: true,
        msg: 'OK',
        data: task
      });
    }
  },
  'POST /api/tasks': (req, res) => {
    res.send({
      status: true,
      msg: 'OK'
    });
  },
  'GET /api/tasks': (req, res) => {
    res.send({
      status: true,
      msg: 'OK',
      data: {
        total: 2,
        tasks: [question1, task]
      }
    });
  },
  'POST /api/assignments': (req, res) => {
    myassignment.push({
      assign_id: myassignment.length,
      
    });
    res.send({
      status: true,
      msg: 'OK'
    });
  },
  'GET /api/assignments': (req, res) => {
    const data = [];
    if (myassignment.includes(1)) {
      data.push(question1);
    }
    if (myassignment.includes(2)) {
      data.push(task);
    }
    res.send({
      status: true,
      msg: 'OK',
      data: data
    });
  }
};
