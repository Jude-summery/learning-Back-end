#### npm init
使用`npm init`初始化项目

#### npm install
通过`npm install`可以安装`npm`上发布的某个版本、某个`tag`、某个版本区间的模块，甚至可以安装本地目录、压缩包和 git/github 的库作为依赖。

直接使用`npm i`安装的模块不会写入`package.json`的`dependencies`或`devDependencies`，需要额外的参数：
1. `npm i express --save / npm i express -S`（安装`express`，同时将`"express": "^4.14.0"`写入`dependencies`，注意此处有个`^`）
2. `npm i express --save-dev / npm i express -D`（安装`express`，同时将`"express": "^4.14.0"`写入`dependencies`和`devDependencies`）
3. `npm i express --save-exact`（安装`express`，同时将`"express": "4.14.0"`写入`dependencies`，注意此处锁定了版本，建议上线的`Node.js`应用都锁定版本）

运行以下命令：

`npm config set save-exact true` 

这样每次 `npm i xxx --save`的时候都会锁定版本了

> 小提示：npm config set 命令将配置写到了 ~/.npmrc 文件，运行 npm config list 查看。

#### npm shrinkwrap
运行`npm shrinkwrap`，会在当前目录下产生一个`npm-shrinkwrap.json`，里面包含了通过`node_modules`计算出的模块的依赖树及版本。

只要目录下有`npm-shrinkwrap.json`则运行`npm install`的时候会优先使用`npm-shrinkwrap.json`进行安装。

通过这种方式可以彻底锁定依赖版本，不管嵌套多少层。