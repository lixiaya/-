## 初始化项目

    npm init

## 安装express 到项目

    npm i express

### 使用express快速创建服务器

```
// 0. 导入 Express
const express = require('express')
​
// 1. 调用 express() 得到一个 app
//    类似于 http.createServer()
const app = express()
​
// 2. 设置请求对应的处理函数
//    当客户端以 GET 方法请求 / 的时候就会调用第二个参数：请求处理函数
app.get('/', (req, res) => {
  res.send('hello world')
})
​
// 3. 监听端口号，启动 Web 服务
app.listen(3000, () => console.log('app listening on port 3000!'))
```

。

## 配置cors跨域

1.安装cors 中间件

```
npm i cors
```

2.导入

```
    const cors=require('cors')
    app.use(cors())
```

# 路由

## 初始化路由文件夹

router 存放路由模块

### 初始化router路由模块

```
const express=require('express')
const router=express.Router()

//获取留言板数据
router.get('/',(req,res)=>{
    res.send('data ok')
})

// 添加数据
router.post('/add',(req,res)=>{
    res.send('add Ok')
})

//登录后台r
router.post('/login',(req,res)=>{
    res.send('login Ok')
})

//后台delete删除
router.post('/delete',(req,res)=>{
    res.send('delete Ok')
})

module.exports=router
```

#### 在app.js中导入路由模块并使用

```
//导入路由模块并使用
const gustbookRouter=require('./router/router.js')
app.use('/api',gustbookRouter)
```

## 创建数据库gustbook，创建表bookmain

bookmain表为留言墙主体内容数据

![![数据库]{./数据库.PNG}](E:\code——stu\node\api\数据库.PNG)

ps:上图body字段类型已经更改为text

### 插入数据

省略

### 安装配置mysql模块

```
  npm i mysql
```

#### 新建db文件夹，新建db.js,内容为数据库连接模块

```javascript
 const mysql = require('mysql')

const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'qwerty',
    port:3306,
    database:'gustbook'
})
//连接状态
db.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
  });
// 向外导出
  module.exports=db
```

#### 将db.js导入到router.js

```javascript
const db=require('../db/db.js')
```

#### 编辑获取留言板数据的函数

```javascript
router.get('/',(req,res)=>{
    // res.send('data ok')
    const sqldata='select * from bookmain '
    db.query(sqldata,(err,result)=>{
        if(err) {
            res.send(err.message)
        }else{
            res.send(result)
        }

    })
})
```

###### postman测试

<img src="file:///C:/Users/zero/AppData/Roaming/marktext/images/2022-10-15-16-17-41-image.png" title="" alt="" width="472">

返回json数据中时间比数据库少几个小时（未解决）

### 解决json数据比数据库少几个八个小时的问题

数据库服务器的时区与本地不同，因此需要手动设定时区：  
在后端进行数据库连接的配置中，设定时区`timezone`的值即可

连接数据库时，手动设置时区，添加timezone：“ 08.00 ”

```javascript
const db= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'qwerty',
    port:3306,
    database:'gustbook',
    timezone: "08:00"
})
```

#### 添加新留言函数

```javascript
router.post('/add',(req,res)=>{
    //接收表单数据  利用req.body
    const addData = req.body
    // res.send('add Ok')
    const sqlAdd='insert into bookmain(name,type,time,body,color) values(?,?,?,?,?)'

    db.query(sqlAdd,[addData.name,addData.type,addData.time,addData.body,addData.color],(err,result)=>{
        if(err) {
            res.send(err.message)
        }else{
            res.send('添加成功')
        } 
    })
})
```

##### 首先得下载body-parser这个中间件

#### Express的中间件 BodyParser

    在http请求种，POST、PUT、PATCH三种请求方法中包含着请求体，也就是所谓的request，在Nodejs原生的http模块中，请求体是要基于流的方式来接受和解析。  
body-parser是一个HTTP请求体解析的中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体

。。。。。。。省略

**在app.js中引入**

```javascript
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
```

**POSTMAIN测试**

![ceshi](E:\code——stu\node\api\postmain测试添加留言.PNG)

**数据库查看结果（数据已插入）**

![数据库结果](E:\code——stu\node\api\数据库插入结果.PNG)
