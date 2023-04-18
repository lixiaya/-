const express =require('express')
const app =express()
//跨域
const cors=require('cors')
app.use(cors())

// body-parser
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// app.use(bodyParser.urlencoded())

//导入路由模块并使用
const gustbookRouter=require('./router/router.js')
app.use('/api',gustbookRouter)
//token
const expressJwt = require('express-jwt')
const config = require('./jwt.js')

app.listen(3000,()=>{
    console.log("app listen on port 3000")
})
