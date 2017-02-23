const assert = require('assert');

const Eslife = require('../lib/index.js');
const eslife = new Eslife({
  partner_id: process.env.PARTNER_ID,
  partner_secret: process.env.PARTNER_SECRET,
});

describe('module', function () {

  it('area', function (done) {
    eslife.termbypoint(39.886089, 116.670331, 5000).then(function (data) {
      data = JSON.parse(data);
      console.log(data);

      done();
    });
  });


});
