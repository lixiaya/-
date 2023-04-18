const express = require('express')
const router = express.Router()

// 导入数据库模块
const db = require('../db/db.js')
//导入生成token的包
const jwt = require('jsonwebtoken')
// const configToken =require("../jwt.js")

//获取留言板数据
router.get('/list', (req, res) => {
    // res.send('data ok')
    const sqldata = 'select * from bookmain '

    db.query(sqldata, (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send(result)
        }

    })
})

// 添加数据
router.post('/add', (req, res) => {
    //接收表单数据  利用req.body
    const addData = req.body
    // res.send('add Ok')
    const sqlAdd = 'insert into bookmain(name,type,time,body,color) values(?,?,?,?,?)'

    db.query(sqlAdd, [addData.name, addData.type, addData.time, addData.body, addData.color], (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            console.log(addData);
            res.send('添加成功')
        }
    })
})

//登录后台r
router.post('/login', (req, res) => {
    const loginData = req.body
    console.log(loginData)
    if (loginData.username === 'root' && loginData.password === 'qwerty') {
        // const tokenStr =jwt.sign(loginData.username,configToken.jwtSecreKey,{expiresIn:configToken.expiresIn})
        const tokenStr = 'Bearer ' + jwt.sign(loginData, 'secret12345',
            {
                expiresIn: 3600 * 24 * 3
            })

        res.send({
            stats: 2,
            msg: '验证成功',
            token: tokenStr

        })

    } else {
        res.send('用户名或密码错误')
    }

})

//编辑修改
router.post('/edit', (req, res) => {
    const editData = req.body

    const sqlEdit = `UPDATE bookmain SET time=?, type=?, body=?, name=?, color=? WHERE id=?;`
    db.query(sqlEdit, [editData.time, editData.type, editData.body, editData.name, editData.color, editData.id], (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            console.log(editData);
            res.send('edit ok')
        }
    })
})


//后台delete删除
router.post('/delete', (req, res) => {
    const delDate = req.body
    // res.send('delete Ok')
    const sqlDel = 'DELETE FROM bookmain WHERE id= ? ;'

    db.query(sqlDel, delDate.id, (err, result) => {
        if (err) {
            res.send(err.message)
        } else {
            res.send('del ok')
        }
    })
})

//char数据
router.get('/char',(req,res)=>{
   
    
    const sqlChar='select type,  count(*) as num from bookmain group by type;'
    db.query(sqlChar,(err,result)=>{
        if(err){
            res.send(err.message)
        }else{
            //  let a=JSON.parse(JSON.stringify(result))
            res.send(result)
        }
    })
})

module.exports = router