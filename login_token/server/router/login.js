// 创建router实例
const login = require('koa-router')()

// 其他插件及工具
const jwt = require('jsonwebtoken')
const dbo = require('../db.js')
const { jwtKey, tokenTime } = require('../config.js')

// 设置路由前缀?
// router.use('/login', login.routes())        ->这里写'/'
// router.use(login.routes())                 ->这里写 '/login'
// /login
login.post('/', async (ctx) => {
    const { username, password } = ctx.request.body
    const user = await dbo.find({username: username})
    // 失败
    if (!user.length) {
        ctx.status = 
        ctx.body = {
            code: 400,
            message: '用户名不存在'
        }
        return
    }
    if (password != user[0].password) {
        ctx.body = {
            code: 400,
            message: '用户名或密码错误'
        }
        return
    }

    // 成功
    const token = jwt.sign({_id: user[0]._id, scope: user[0].scope}, jwtKey, { expiresIn: tokenTime })
    ctx.body = {
        code: 200,
        token,
        message: '登录成功'
    }
})

module.exports = login