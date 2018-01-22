> 环境：
> 1. 操作系统：CentOS 7
> 2. 安装版本：mysql-5.6.36-linux-glibc2.5-x86_64.tar.gz
> 3. 下载地址:[http://dev.mysql.com/downloads/mysql/](http://dev.mysql.com/downloads/mysql/)

#### 安装步骤
##### 卸载老版本
---
查找并删除mysql有关的文件
```
find / -name mysql|xargs rm -rf
```
> `find 路径 -命令参数 [输出形式]`<br>
> `-name` 按照文件名查找文件<br>
> `xargs` 管道符`|`的增强版

##### 在安装包存放目录下执行命令解压文件
---
```
tar -zxvf mysql-5.6.36-linux-glibc2.5-x86_64.tar.gz
```

##### 删除安装包，重命名解压后的文件
---
```
rm -f mysql-5.6.36-linux-glibc2.5-x86_64.tar.gz
mv mysql-5.6.36-linux-glibc2.5-x86_64/ mysql
```

##### 添加 *mysql* 用户组和 *mysql* 用户
---
先检查是否有 *mysql* 用户组和 *mysql* 用户
```
groups mysql
```
若无，则添加
```
groupadd mysql
useradd -r -g mysql mysql
```

##### 进入 *mysql* 目录更改权限
```
cd mysql/
chown -R mysql:mysql ./
```
> `chown [选项]... [所有者][:[组]] 文件...`<br>
> 更改每个文件的所有者和/或所属组<br>
> `-R` 递归处理所有的文件及子目录

##### 执行安装脚本
---
```
./scripts/mysql_install_db --user=mysql
```
安装完之后修改当前目录拥有者为root用户，修改data目录拥有者为mysql
```
chown -R root:root ./
chown -R mysql:mysql data
```

##### 启动 *mysql*
---
```
./support-files/mysql.server start
```
> **注意**：此时将会报错<br>
> `./support-files/mysql.server`第264行：`cd: /usr/local/mysql:没有那个文件或目录`<br>
> 解决方法：`vim ./support-files/mysql.server`在`basedir=`添加 *mysql* 的安装目录。

##### 更改密码
---
```
./bin/mysqladmin -u root -h localhost.localdomain password 'root'
```
或在登录后更改密码
```
update mysql.user set password=password('root') where user='root';
flush privileges;
```

##### 登录
---
```
./bin/mysql -h127.0.0.1 -uroot -proot
```

##### 增加远程登录权限
---
本地登录 *MySQL* 之后执行如下的命令
```
grant all privileges on *.* to root@'%' identified by 'root';
flush privileges;
```

##### 将 *MySQL* 加入 *Service* 系统服务
---
```
cp support-files/mysql.server /etc/init.d/mysqld
chkconfig --add mysqld
chkconfig mysqld on
service mysqld restart
```
> `chkconfig` 系统程序管理工具<br>
>
> *参数*<br> `--add` 开启指定的服务程序<br>
> `--del` 关闭指定的服务程序<br>
> `--list` 列出`chkconfig`所知道的所有服务<br>
> `chkconfig mysql on` 设定`mysql`在各等级为`on`，“各等级”包括2、3、4、5等级

> `service` 系统程序管理工具
> 
> `service`是一个脚本，它把命令传给一个系统服务，该系统服务必须在`/etc/init.d/`目录中存在。
> 
> *参数*
> `start`、`stop`、`restart`、`reload`、`status`
>
> 假设服务名为`xyz`，需要：
> 1. `/etc/rc.d/init.d/xyz`可执行
> 2. 支持`start/stop/status`三个参数 

##### 配置 *my.cnf*
```
vim my.cnf
#添加以下两条语句并保存退出
default-character-set=utf8
lower_case_table_names=1
max_allowed_packet=100M
```
配置好之后，重启mysqld服务。

参考资料：[Linux下安装MySQL](https://www.jianshu.com/p/f4a98a905011)