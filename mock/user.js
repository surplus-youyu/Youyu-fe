module.exports = {
  'GET /api/user/': (req, res) => {
    res.send({
      status: true,
      msg: 'OK',
      data: {
        uid: 1,
        real_name: 'test',
        nick_name: 'test-nick-name',
        avatar: 'null',
        age: 10,
        gender: 'm',
        balance: 100,
        major: 'SE',
        grade: 2,
        phone: '1888888888',
        email: 'lll@qq.com'
      }
    });
  }
};
