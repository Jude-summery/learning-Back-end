##### 使用`yum`安装 *Apache*
---
```
yum install httpd -y
```
默认安装位置`cd /etc/httpd`

##### 确定 *Apache* 是否安装
---
```
rpm -qa|grep hettpd*
```
`rpm`是一个软件包管理系统，可对 *Linux* 系统下的软件包进行一系列的操作。<br />
`rpm -qa`：查询所有的安装的软件包

##### 启动 *Apache* 服务
---
```
httpd -k start //start
httpd -k stop //stop
httpd -k restart //restart
```

##### 检查是否已经启动
---
```
ps -ef|grep httpd*
```
或
```
ps aux|grep httpd*
```

##### 配置 *Apache* 服务
---
找到`/etc/httpd/conf`中的配置文件，参照XAMPP的文件配置，将入口文件放在`/var/www/html`目录下。

##### 检查端口是否正常开放
---
`netstat -an|grep 端口号`