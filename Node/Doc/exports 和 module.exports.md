#### 基础概览
- `require` 用来加载代码，而`exports`和`module.exports`则用来导出代码

#### 区别
1. `module.exports` 初始值为一个空对象`{}`
2. `exports` 是指向 `module.exports`的引用
3. `require()`返回的是`module.exports`而不是`exports`