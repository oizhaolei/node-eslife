// e栈开放平台API

const md5 = require('md5');
const curl = require('curlrequest');
const moment = require('moment');
const _ = require('lodash');

const url = 'https://dev.api.myeslife.com/Rentapi/';
//
const Eslife = function(conf) {
  this.conf = conf;
};

function sortObject(o) {
  return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}
const json2String = (json) => {
  // 排序
  const jsn = sortObject(json);
  return Object.keys(jsn).map(
    key =>
    `${encodeURIComponent(key)}${encodeURIComponent(jsn[key])}`
  ).join('');
};

function getSign(str, secret) {
  const stringSignTemp = `${secret}${str}${secret}`;
  const sign = md5(stringSignTemp).toUpperCase();
  return sign;
}


//
Eslife.prototype = {

  termbyarea: function(area) {
    return this._fetchData('Termbyarea/gets', {
      area,
    });
  },
  termbypoint: function(lat, lng, r) {
    return this._fetchData('Termbypoint/gets', {
      lat,
      lng,
      r,
    });
  },
  boxtypelist: function(sn, useType) {
    return this._fetchData('Boxtypelist/gets', {
      sn,
      useType,
    });
  },

  _fetchData: function(path, params) {
    const _self = this;
    return new Promise(function(resolve, reject) {
      const data = _.assignIn(params, {
        appKey: _self.conf.partner_id,
        timeStamp: moment().format('YYYYMMDDHHmmss'),
        requestKey: moment().unix(),
        version: '1.0',
      });

      data.sign = getSign(json2String(data), _self.conf.partner_secret);

      const options = {
        url: url + path,
        method: 'POST',
      };
      if (data) {
        options.data = data;
      }
      curl.request(options, function(err, results) {
        console.log('curl', options, err, results);
        if (err) {
          reject(Error(err));
        } else {
          resolve(results);
        }
      });
    });
  },
};

module.exports = Eslife;
