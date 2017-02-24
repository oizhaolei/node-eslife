
e栈开放平台API

e栈开放平台API的Node.js实现。

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
