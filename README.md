
e栈开放平台API

e栈开放平台API是基于文档[e栈开放平台](http://file.ydw123.cn//e%E6%A0%88%E6%9A%82%E5%AD%98%E4%B8%9A%E5%8A%A1%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A31.5.docx) 的Node.js实现。

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
