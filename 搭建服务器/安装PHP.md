> 环境：
> 1. 操作系统：CentOS 7
> 2. 安装版本：PHP 5.6.30
> 3. 下载地址:[http://cn2.php.net/distributions/php-5.6.30.tar.gz](http://cn2.php.net/distributions/php-5.6.30.tar.gz)

##### 注意事项
---
- `php`要在`Apache`和`MySQL`之后进行安装。
- 最好选择编译安装，通过`yum`安装容易出现各种*bug*。

##### 环境准备
---
```
 yum install gcc bison bison-devel zlib-devel libmcrypt-devel mcrypt mhash-devel openssl-devel libxml2-devel libcurl-devel bzip2-devel readline-devel libedit-devel sqlite-devel jemalloc jemalloc-devel
```
注意：会有一些包在当前的`yum`源中无法找到，应该手动添加`yum`源。

##### 新建安装目录下载安装
---
```
# cd /usr/local/src
# wget http://cn2.php.net/distributions/php-5.6.30.tar.gz
# tar zvxf php-5.6.30.tar.gz
# cd php-5.6.30
# groupadd www
# useradd -g www -s /sbin/nologin www
```

##### 编译安装
---
```
./configure --prefix=/usr/local/php --with-apxs2=/usr/bin/apxs --with-config-file-path=/usr/local/php/etc --enable-inline-optimization --disable-debug --disable-rpath --enable-shared --enable-opcache --enable-fpm --with-fpm-user=www --with-fpm-group=www --with-mysql=/root/mysql --with-mysqli=/root/mysql/bin/mysql_config --with-pdo-mysql --with-gettext --enable-mbstring --with-iconv --with-mcrypt --with-mhash --with-openssl --enable-bcmath --enable-soap --with-libxml-dir=/usr/ --enable-pcntl --enable-shmop --enable-sysvmsg --enable-sysvsem --enable-sysvshm --enable-sockets --with-curl --with-zlib --enable-zip --with-bz2 --with-readline
```

##### 参数解析
---
```
##参数解释
""" 安装路径 """
--prefix=/usr/local/php56 \
""" 编译共享的 Apache 2.0 模块 配置apxs的路径 """
--with-apxs2=/usr/bin/apxs \
""" php.ini 配置文件路径 """
--with-config-file-path=/usr/local/php56/etc \
""" 优化选项 """
--enable-inline-optimization \
--disable-debug \
--disable-rpath \
--enable-shared \
""" 启用 opcache，默认为 ZendOptimizer+(ZendOpcache) """
--enable-opcache \
""" FPM """
--enable-fpm \
--with-fpm-user=www \
--with-fpm-group=www \
""" MySQL 配置路径 """
--with-mysql=/root/mysql \
--with-mysqli=/root/mysql/bin/mysql_config \
--with-pdo-mysql \
""" 国际化与字符编码支持 """
--with-gettext \
--enable-mbstring \
--with-iconv \
""" 加密扩展 """
--with-mcrypt \
--with-mhash \
--with-openssl \
""" 数学扩展 """
--enable-bcmath \
""" Web 服务，soap 依赖 libxml """
--enable-soap \
--with-libxml-dir \
""" 进程，信号及内存 """
--enable-pcntl \
--enable-shmop \
--enable-sysvmsg \
--enable-sysvsem \
--enable-sysvshm \
""" socket & curl """
--enable-sockets \
--with-curl \
""" 压缩与归档 """
--with-zlib \
--enable-zip \
--with-bz2 \
""" GNU Readline 命令行快捷键绑定 """
--with-readline
```

> 编译过程中会各种报错，自行百度解决。<br>
> 
>FAQ<br>
> 1. 
> - `configure: error: Don't know how to define struct flock on this system, set --enable-opcache=no`<br>
> - [解决方法](http://blog.51cto.com/159323/1360456)

```
// 编译安装
make
make install
```

> 过程中可能报错
>
> 1. 
> - `*** [sapi/cli/php] Error 1`
> - [解决方法](http://blog.51cto.com/taokey/1581956)：*libxml* 默认安装的路径是`/usr/local`，把`--with-libxml-dir=/usr/local/libxml2`修改成`--with-libxml-dir=/usr/`

##### 重新安装
---
```
make clean
make clean all
./configure
make && make install
```

##### 配置服务
---
```
cp php.ini-development /usr/local/php/etc/php.ini
 
//php-fpm 服务
cp /usr/local/php/etc/php-fpm.conf.default /usr/local/php/etc/php-fpm.conf
cp sapi/fpm/init.d.php-fpm /etc/init.d/php-fpm
chmod +x /etc/init.d/php-fpm
 
chkconfig --add php-fpm
chkconfig php-fpm on
service php-fpm start
```

##### 环境变量
---
```
# vim /etc/profile
PATH=$PATH:/usr/local/php/bin
export PATH
# source /etc/profile
```
注意：多个PATH用冒号连接。更改后记得调用`source`命令。

##### 使用过程中可能出现的问题
---
1. 
- 服务器无法解析php文件，在浏览器中直接以原文呈现。
- 解决方法：在 *httpd.conf* 中找到： `AddType application/x-gzip .gz .tgz`在该行下面添加
`AddType application/x-httpd-php .php`<br>
2.
- `Can't connect to local MySQL server through socket '/tmp/mysql.sock' (2)`
- 解决方法：`ln -s /var/lib/mysql /mysql.sock /tmp/mysql.sock`<br>
3. 
- `Deprecated: mysql_connect(): The mysql extension is deprecated`
- [解决方法](http://www.jb51.net/article/54465.htm)<br>
4.
- `Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock' (2)`
- [解决方法](https://stackoverflow.com/questions/4448467/cant-connect-to-local-mysql-server-through-socket-var-lib-mysql-mysql-sock)：将连接 *mysql* 的主机名从`localhost`换成`127.0.0.1`

> 参考链接：<br>
> [centOS7 编译安装php](https://www.cnblogs.com/37yan/p/6879404.html)<br>
> [安装php](https://www.cnblogs.com/52php/p/5668848.html)
>
