const assert = require('assert');
const moment = require('moment');

const Eslife = require('../lib/index.js');
const eslife = new Eslife({
  partner_id: process.env.PARTNER_ID,
  partner_secret: process.env.PARTNER_SECRET,
});

describe('module', function () {

  // it('Termbyarea', async function () {
  //   let data = await eslife.termbyarea(440306);
  //   assert(data.code, 0);
  //   console.log(data.data.length);
  // });

  // it('Termbypoint', async function () {
  //   let data = await eslife.termbypoint(39.886089, 116.670331, 50);
  //   assert(data.code, 0);
  //   console.log(data.data.length);
  // });

  // it('Boxtypelist', async function () {
  //   let data = await eslife.boxtypelist('518131B048', 1);
  //   assert(data.code, 0);
  //   console.log(data.data);
  // });

  it('applyrent', async function () {
    const overdueTime = moment().add(1, 'minutes').format('YYYY-MM-DD HH:mm:ss'); // 1 hour later
    const bizId = `${moment().format('YYYYMMDDHHmmss')}74391477109498`;
    const opMobile = '18624357886';
    const opUser = 'zhaolei';
    const callbackUrl = 'http://wx.hearn1.com/eslife/noti';

    let data = await eslife.applyrent('518131B048', 10, bizId, 'small', opMobile, opUser, overdueTime, callbackUrl);
    console.log('data.data', data.data);
    assert(data.code, '0');

    const borderId = data.data.borderId;
    data = await eslife.applyquery(borderId);
    console.log('data.data', data.data);
    assert(data.code, '0');

    const actionType = 3;
    data = await eslife.applycancel(borderId, bizId, actionType, opMobile, opUser);
    console.log('data.data', data.data);
    console.log(data.data);
  });

  // it('applyrecover', async function () {

  //   const borderId = 'B1017022818448278845107591';

  //   const opMobile = '18624357886';
  //   const opUser = 'zhaolei';

  //   let data = await eslife.applyrecover(borderId, opMobile, opUser, opMobile, opUser);
  //   assert(data.code, 0);
  //   console.log(data.data);
  // });
});
