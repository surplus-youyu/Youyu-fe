let isLogin = false;

module.exports = {
  'PUT /api/user/login': (req, res) => {
    isLogin = true;
    res.send({
      status: true,
      msg: 'OK',
      data: {
        uid: 1,
        real_name: 'test',
        nick_name: 'test-nick-name',
        avatar: '',
        age: 10,
        gender: 'm',
        balance: 100,
        major: 'SE',
        grade: 2,
        phone: '1888888888',
        email: 'lll@qq.com',
        description: string = '大家好，我是练习两年半的偶像练习生：kunkun。我喜欢唱、跳、RAP、篮球。Music~'
      }
    });
  },
  'POST /api/user/register': (req, res) => {
    isLogin = true;
    res.send({
      status: true,
      msg: 'OK',
      data: {
        uid: 1,
        real_name: 'test',
        nick_name: 'test-nick-name',
        avatar: '',
        age: 10,
        gender: 'm',
        balance: 100,
        major: 'SE',
        grade: 2,
        phone: '1888888888',
        email: 'lll@qq.com',
        description: string = '大家好，我是练习两年半的偶像练习生：kunkun。我喜欢唱、跳、RAP、篮球。Music~'
      }
    });
  },
  'PUT /api/user/modifyInfo': (req, res) => {
    res.send({
      status: true,
      msg: 'update info ok'
    })
  },
  'GET /api/user': (req, res) => {
    if (isLogin) {
      res.send({
        status: true,
        msg: 'OK',
        data: {
          uid: 1,
          real_name: 'test',
          nick_name: 'test-nick-name',
          avatar: '',
          age: 10,
          gender: 'm',
          balance: 100,
          major: 'SE',
          grade: 2,
          phone: '1888888888',
          email: 'lll@qq.com',
          description: string = '大家好，我是练习两年半的偶像练习生：kunkun。我喜欢唱、跳、RAP、篮球。Music~'
        }
      });
    } else {
      res.statusCode = 401;
      res.send({
        status: false,
        msg: 'unauthorized'
      });
    }
  }
};
