#### 基本概述
- `require` 可加载 `.js`、`.json`、`.node`后缀的文件
- `require` 的过程是同步的，所以这样是错误的：
```
setTimeout(() => {
    module.exports = { a: 'hello' }
}, 0)

// require 这个文件得到的是空对象 {}
```

#### 机制
- `require` 目录的机制是：
    - 如果目录下有`package.json`并指定了`main`字段，则用之
    - 如果不存在`package.json`, 则一次尝试加载目录下的`index.js`和`index.node`
- `require`过的文件会加载到缓存，所以多次`require`同一文件（模块）不会重复加载
- 判断是否是程序的入口文件有两种方式：
    - `require.main === module`（推荐）
    - `module.parent === null`


#### 循环引用
- 循环引用会导致`require`到的结果为`{}`
- 可能会引起`undefined is not a function`报错