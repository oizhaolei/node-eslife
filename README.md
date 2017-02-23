# node-eslife [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]


e栈开放平台API

e栈开放平台API是基于文档([e栈开放平台API说明](http://opendoc.eslife.cn/api.html) 的Node.js实现。

## Install

```sh
$ npm install --save oizhaolei/node-eslife
```


## Usage

```js
var Eslife = require('node-eslife');
var eslife = new Eslife({
  partner_id: "_ID_",
  partner_secret: "_SECRET__"
});

eslife.termbypoint(39.886089, 116.670331, 5000).then(function (data) {
  data = JSON.parse(data);
  ...
});

```


## License

Apache-2.0 © [oizhaolei](oizhaolei.github.io)
