>`dependencies`为生产环境所需依赖，如`jQuery`
>
>`devDependencies`为开发环境所需依赖，如`webpack`

**其主要区别在于：如果你的项目是发布到`npm`的一个包**，那么这个包的`package.json`中的`dependencies`中的依赖是会被下载到这个包的`node_modules`文件夹中的（如果引用这个包的项目本身没有同版本的依赖），而`devDependencies`不会。

**至于一般项目**，不管是安装到`dev`还是`dependencies`中，安装的时候都会安装，打包的时候都会被打包，区分只是为了项目结构清晰。
