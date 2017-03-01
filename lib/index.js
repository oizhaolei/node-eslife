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

const json2String = (json) => {
  // 排序
  const jsn = Object.keys(json).sort().reduce((r, k) => (r[k] = json[k], r), {});

  return _.map(jsn, (value, key) =>
    `${key}${value}`
  ).join('');
};

function getSign(json, secret) {
  const str = json2String(json);

  const stringSignTemp = `${secret}${str}${secret}`;
  console.log(stringSignTemp);
  const sign = md5(stringSignTemp).toUpperCase();
  return sign;
}


//
Eslife.prototype = {

  // 指定区域编号查询终端列表
  termbyarea: function(area) {
    return this._fetchData('Termbyarea/gets', {
      area,
    });
  },

  // 根据经纬度查询附近终端列表
  termbypoint: function(lat, lng, r) {
    return this._fetchData('Termbypoint/gets', {
      lat,
      lng,
      r,
    });
  },

  // 获取指定终端箱格类型及可用数
  boxtypelist: function(sn, useType) {
    return this._fetchData('Boxtypelist/gets', {
      sn,
      useType,
    });
  },

  // 箱格预约（同步/异步）
  // 箱格预约取消
  // 修改收件人（同步/异步）
  // 查询平台订单信息

  // 申请暂存（同步/异步）
  applyrent: function(sn, orderType, bizId, boxType, opMobile, opUser, overdueTime, callbackUrl) {
    return this._fetchData('Applyrent/put', {
      sn,
      orderType,
      bizId,
      boxType,
      opMobile,
      opUser,
      overdueTime,
      callbackUrl,
    });
  },

  // 申请取件（同步/异步）
  applytake: function(borderId, bizOrderId, takeMobile, takeUser, opMobile, opUser) {
    return this._fetchData('Applytake/put', {
      borderId,
      bizOrderId,
      takeMobile,
      takeUser,
      opMobile,
      opUser,
    });
  },
  // 申请归还（同步/异步）
  applyback: function(sn, boxType, borderId, bizOrderId, opMobile, opUser, overdueTime) {
    return this._fetchData('Applyback/put', {
      sn,
      boxType,
      borderId,
      bizOrderId,
      opMobile,
      opUser,
      overdueTime,
    });
  },
  // 申请回收（同步/异步）
  applyrecover: function(borderId, takeMobile, takeUser, opMobile, opUser) {
    return this._fetchData('Applyrecover/put', {
      borderId,
      takeMobile,
      takeUser,
      opMobile,
      opUser,
    });
  },
  // 取消申请
  applycancel: function(borderId, bizOrderId, actionType, opMobile, opUser) {
    return this._fetchData('Applycancel/put', {
      borderId,
      bizOrderId,
      actionType,
      opMobile,
      opUser,
    });
  },
  // 暂存查询
  applyquery: function(borderId) {
    return this._fetchData('Applyquery/get', {
      borderId,
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

      data.sign = getSign(data, _self.conf.partner_secret);

      const p = _.join(_.map(data, (v, k) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`), '&');
      console.log(`${url}${path}?${p}`);

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
