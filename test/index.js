const assert = require('assert');
const moment = require('moment');

const Eslife = require('../lib/index.js');
const eslife = new Eslife({
  partner_id: process.env.PARTNER_ID,
  partner_secret: process.env.PARTNER_SECRET,
});

describe('module', function () {

  it('Termbyarea', function (done) {
    eslife.termbyarea(440306).then(function (data) {
      data = JSON.parse(data);
      assert(data.code, 0);
      console.log(data.data.length);

      done();
    });
  });

  it('Termbypoint', function (done) {
    eslife.termbypoint(39.886089, 116.670331, 50).then(function (data) {
      data = JSON.parse(data);
      assert(data.code, 0);
      console.log(data.data.length);

      done();
    });
  });

  it('Boxtypelist', function (done) {
    eslife.boxtypelist('518131B048', 0).then(function (data) {
      data = JSON.parse(data);
      assert(data.code, 0);
      console.log(data.data);

      done();
    });
  }
  );

  it('applyrent', function (done) {
    const overdueTime = moment().add(1, 'hours').format('YYYY-MM-DD HH:mm:ss'); // 1 hour later

    const bizOrderId = `${moment().format('YYYYMMDDHHmm')}74391477109498`;

    const opMobile = '18624357886';
    const opUser = 'zhaolei';
    const callbackUrl = 'http://wx.hearn1.com/eslife/noti';

    eslife.applyrent('518131B048', 10, bizOrderId, 'medium', opMobile, opUser, overdueTime, callbackUrl).then(function(data) {
      data = JSON.parse(data);
      console.log('data.data', data.data);
      assert(data.code, '0');

      const borderId = data.data.borderId;
      eslife.applyquery(borderId).then(function (data) {
        data = JSON.parse(data);
        console.log('data.data', data.data);
        assert(data.code, '0');

        const actionType = 3;
        eslife.applycancel(borderId, bizOrderId, actionType, opMobile, opUser).then(function (data) {
          data = JSON.parse(data);
          console.log('data.data', data.data);
          console.log(data.data);

          done();
        });
      });
    });
  });

  // it('applyrecover', function (done) {

  //   const borderId = 'B1017022818448278845107591';

  //   const opMobile = '18624357886';
  //   const opUser = 'zhaolei';

  //   eslife.applyrecover(borderId, opMobile, opUser, opMobile, opUser).then(function (data) {
  //     data = JSON.parse(data);
  //     assert(data.code, 0);
  //     console.log(data.data);

  //     done();
  //   });
  // });
});
