#### Code
```
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('hello, express')
})

app.get('/users/:name', function (req, res) {
  res.send('hello, ' + req.params.name)
})

app.listen(3000)
```

不难看出：`req`包含了请求来的相关信息，`res`则用来返回该请求的响应。

#### `req`常用属性
- `req.query`: 解析后的`url`中的`querystring`，如`?name=haha`，`req.query`的值为`{name: 'haha'}`
- `req.params`：解析`url`中的占位符，如`/:name`，访问`/haha`，`req.params`的值为`{name: 'haha'}`
- `req.body`：解析请求体，需使用相关的模块，如`body-parser`，请求体为`{"name": "haha"}`，则`req.body`为`{name: 'haha'}`