##### 一些重要的SQL命令
---
- SELECT - 从数据库中提取数据
- UPDATE - 更新数据库中的数据
- DELETE - 从数据库中删除数据
- INSERT INTO - 向数据库中插入新数据
- CREATE DATABASE - 创建新数据库
- ALTER DATABASE - 修改数据库
- CREATE TABLE - 创建新表
- ALTER TABLE - 变更数据库表
- DROP TABLE - 删除表
- CREATE INDEX - 创建索引
- DROP INDEX - 删除索引

##### 通用数据类型
---
- 数据库表中的每一列都要求有名称和数据类型。
- 必须在创建 *SQL* 表时决定每个列将要储存的数据类型。

##### 语句
---
*SELECT*<br>

**功能**<br>

用于从数据库中选取数据，结果被存储在一个结果表中，称为结果集。

**语法**
```
SELECT column_name,column_name FROM table_name;
```
与
```
SELECT * FROM table_name;
```
*SELECT DISTINCT*<br>

**功能**<br>

筛去结果中的重复值。

**语法**
```
SELECT DISTINCT column_name,column_name FROM table_name;
```

*WHERE*

**功能**<br>

用于提取那些满足指定标准的记录。

**语法**
```
SELECT column_name,column_name
FROM table_name
WHERE column_name operator value
```
> `operator` - 算数运算符<br>
> 包括以下几种

运算符 | 描述
---|---
= | 等于
<> | 不等于
> | 大于
< | 小于
>= | 大于等于
<= | 小于等于
BETWEEN | 在某个范围内
LIKE | 搜索某种模式
IN | 指定针对某个列的多个可能值

*AND & OR*

**语法**

```
SELECT column_name,column_name
FROM table_name
WHERE column_name operator value
AND/OR column_name operator value
```

还可以将`AND`和`OR`结合起来使用

```
SELECT column_name,column_name
FROM table_name
WHERE column_name operator value
AND (column_name operator value OR column_name operator value)
```

*ORDER BY*

**功能**<br>

用于对结果集按照一个列或者多个列进行排序<br>默认按照升序排列，如要降序，可使用DESC关键字。

**语法**

```
SELECT column_name,column_name
FROM table_name
ORDER BY column_name,column_name ASD|DESC;
```

*INSERT INTO*

**功能**<br>

向表中插入新记录。

**语法**

`INSERT INTO`语句可以有两种编写形式。
<br>

第一种形式无需指定要插入数据的列名，只需提供被插入的值即可(新增一行数据)：
```
INSERT INTO table_name
VALUES (value1,value2,value3,...);
```

第二种形式需要指定列名及被插入的值(新增一行数据，未指定的为NULL)：
```
INSERT INTO table_name (column1,column2,column3,...)
VALUES (value1,value2,value3,...);
```

*NULL*

**功能**<br>

代表一个空值。

**语法**

使用比较运算符 (`> < <> =`)，是无法验证`NULL`的，必须使用`IS NULL` 或`IS NOT NULL`。

```
SELECT column_names
FROM table_name
WHERE column_name IS NULL;
```

*UPDATE*

**功能**<br>

更新表中已存在的记录。

**语法**
```
UPDATE table_name
SET column1=value1,column2=value2,...
WHERE some_column=some_value;
```

注意：如果不使用`WHERE`的话，那么所有行都将会被改变。

*DELETE*

**功能**

删除表中的记录。

**语法**
```
DELETE FROM table_name
WHERE some_column=some_value;
```

在不删除表的情况下删除表中所有的行，这意味着表结构、属性、索引将保持不变：

```
DELETE FROM table_name;

or

DELETE * FROM table_name;
```

*SELECT TOP,LIMIT,ROWNUM*

**功能**

*SELECT TOP* 用于规定要返回的记录的数目。
不是所有的数据库都支持TOP子句。例如，*MySQL* 支持 *LIMIT* 子句，*Oracle* 使用*ROWNUM*。

**语法**
```
SELECT TOP number|percent column_name(s)
FROM table_name;

//MySQL
SELECT column_name(s)
FROM table_name
LIMIT number;

//Oracle
SELECT column_name(s)
FROM table_name
WHERE ROWNUM <= number;
```

*LIKE*

**功能**<br>

用于在*WHERE* 子句中搜索列中的指定模式。

**语法**

```
SELECT column_name(s)
FROM table_name
WHERE column_name LIKE pattern;
```

**实例**
```
// 选取以字母“s”开始的所有用户
SELECT * FROM Customers
WHERE City LIKE 's%';

// 选取以字母“s”结尾的所有用户
SELECT * FROM Customers
WHERE City LIKE '%s';

// 选取包含“land”的所有客户
SELECT * FROM Customers
WHERE Country LIKE '%land%';
```

*SQL 通配符*

**功能**<br>

通配符可用于替代字符串中的任何其他字符。通常与*LIKE* 操作符一起使用。用于搜索表中的数据。


通配符 | 描述
---|---
% | 替代0个或多个字符
_ | 替代一个字符
[*charlist* ] | 字符列中的任何单一字符
[^*charlist* ]<br>or<br> [!*charlist* ] | 不在字符列中的任何单一字符

*IN*

**功能**

允许在*WHERE* 子句中规定多个值。

**语法**
```
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1,value2,...);

// IN SELECT 语法
SELECT column_name(s)
FROM table_name
WHERE column_name IN (select column from table_w3c where);
```

*BETWEEN / NOT BETWEEN*

**功能**

选取介于两个值之间的数据范围内的值。这些值可以是数值、文本或者日期。

**语法**
```
SELECT column_name(s)
FROM table_name
WHERE column_name BETWEEN value1 AND value2;
```

*JOIN*

**功能**

把来自两个或多个表的行结合起来，基于这些表之间的共同字段。（联表查询）

**实例**
```
SELECT Orders.OrderID, Customers.CustomerName, Orders.OrderDate
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID=Customers.CustomerID;
```
**不同的 SQL JOIN**

- *INNER JOIN* : 如果表中有至少一个匹配，则返回行
- *LEFT JOIN* : 即时右表中没有匹配，也从左表返回所有的行
- *RIGHT JOIN*：即时左表中没有匹配，也从右表返回所有的行
- *FULL JOIN*： 只要其中一个表中存在匹配，则返回行

*UNION*

**功能**

`UNION`运算符用于组合两个或更多`SELECT`语句的结果集。

- `UNION`中的每一个`SELECT`语句必须具有相同的列数。
- 这些列也必须具有相似的数据类型。
- 每个`SELECT`语句中的列也必须以相同的顺序排列。

> `UNION`结果集中的列名总是等于`UNION`中第一个`SELECT`语句中的列名。

> `UNION`只选择不同的值。`UNION ALL`会选择重复的值。

**实例**
```
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers
ORDER BY City;
```

*SELECT INTO*

**功能**

`SELECT INTO`语句从一个表复制数据，然后把数据插入到另一个**新表**中。还可以用来创建新表。

**语法**
```
SELECT column_name(s)
INTO newtable [IN externaldb]
FROM table1;
```
使用`IN`子句复制表到另一个数据库中：
```
SELECT *
INTO CustomersBackup2013 IN 'Backup.mdb'
FROM Customers;
```

*INSERT INTO SELECT*

**功能**

`INSERT INTO SELECT`从表中复制数据，并将数据插入**现有**的表中。

**语法**
```
INSERT INTO table2
(column_name(s))

SELECT column_name(s)

FROM table1;

// 实例
// 把“Suppliers”一栏复制到“Customers”一栏
INSERT INTO Customers (CustomerName, Country)
SELECT SupplierName, Country FROM Suppliers;
```

*DROP*

**功能**

使用`DROP`语句，可以轻松地删除索引、表和数据库。

 - `DROP INDEX` : 删除表中的索引。
```
// MySQL的DROP INDEX 语法
ALTER TABLE table_name DROP INDEX index_name
```

- `DROP DATABASE` : 删除数据库。
```
DROP DATABASE database_name
```

- `TRUNCATE TABLE` : 删除表中数据而不删除表本身。
```
TRUNCATE TABLE table_name
```

*CREATE DATABASE*

**功能**

用于创建数据库。

**语法**
```
CREATE DATABASE dbname;
```

*CREATE TABLE*

**功能**

用于创建数据库中的表。<br>
表由行和列组成，每个表都必须有个表名。

**语法**
```
CREATE TABLE table_name
(
column_name1 data_type(size),
column_name2 data_type(size),
column_name3 data_type(size),
...
);

// 实例
CREATE TABLE Persons
(
PersonID int,
LastName varchar(255),
FirstName varchar(255),
Address varchar(255),
City varchar(255)
);
```

> 使用`INSERT INTO`语句将数据写入空表。

*ALTER TABLE*

**功能**

用于在现有表中添加、删除或修改列。

**语法**

- 添加列
```
ALTER TABLE table_name
ADD column_name datatype;
```

- 删除列
```
ALTER TABLE table_name
DROP COLUMN column_name;
```

- 修改列的数据类型(mySQL)
```
ALTER TABLE table_name
MODIFY COLUMN column_name datatype;
```

*AUTO_INCREMENT*

**功能**

创建一个自动增量字段。

**语法**

```
// MySQL中
CREATE TABLE Persons
(
    ID int NOT NULL AUTO_INCREMENT,
    LastName varchar(255) NOT NULL,
    FirstName varchar(255)
);

// 以其他值开始AUTO_INCREMENT
ALTER TABLE Persons AUTO_INCREMENT=100;
```

*时间的数据类型*

**MySQL** 使用下列数据类型在数据库中存储日期或时间值：

- DATE 格式：YYYY-MM-DD
- DATETIME 格式：YYYY-MM-DD HH:MM:SS
- TIMESTAMP 格式：YYYY-MM-DD HH:MM:SS
- YEAR 格式：YYYY或YY