module.exports = {
    'GET /api/requests/:requestType': (req, res) => {
      const typeMap = {
        'public': '公共--',
        'sent': '已发送--',
        'received': '已接受--',
        'done': '已完成--',
        'draft': '未发送--'
      };
      res.send({
        status: true,
        msg: 'OK',
        data: [
          {
            title: `${typeMap[req.params.requestType]}快递帮拿`,
            tags: ['快递', '明六'],
            desc: '送到明二',
            price: 10,
            campus: 'east',
            owner: '小明',
            publishTime: '2019-05-20 09:30'
          },
          {
            title: `${typeMap[req.params.requestType]}买粽子`,
            tags: ['粽子', '明六'],
            desc: '送到明二',
            price: 5,
            campus: 'east',
            owner: '小明',
            publishTime: '2019-05-20 21:30'
          },
          {
            title: `${typeMap[req.params.requestType]}卖电脑`,
            tags: ['电脑', '明六'],
            desc: '送到明二',
            price: 5,
            campus: 'north',
            owner: '小明',
            publishTime: '2019-05-21 09:30'
          },
          {
            title: `${typeMap[req.params.requestType]}收手机`,
            tags: ['手机', '明六'],
            desc: '送到明二',
            price: 20,
            campus: 'south',
            owner: '小明',
            publishTime: '2019-05-21 19:30'
          },
          {
            title: `${typeMap[req.params.requestType]}外卖`,
            tags: ['外卖', '明六'],
            desc: '送到明二',
            price: 30,
            campus: 'Shenzhen',
            owner: '小明',
            publishTime: '2019-05-14 19:30'
          },
          {
            title: `${typeMap[req.params.requestType]}代课`,
            tags: ['星期二', '工数'],
            desc: '代课',
            price: 30,
            campus: 'Shenzhen',
            owner: '小明',
            publishTime: '2019-03-14 19:30'
          }
        ]
      });
    },
  };
  