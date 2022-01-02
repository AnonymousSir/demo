const user = require('koa-router')()
const dbo = require('../db.js')

user.post('/createuser', async ctx => {
    const { username, password } = ctx.request.body
    const user = await dbo.find({username: username}).count()
    if (user) {
        ctx.body = {
            code: 400,
            message: '用户名已存在'
        }
        return
    }
    const res = await new dbo({
        username: username,
        password: password,
        scope: 2
    })
    res.save(err => console.log(err))
    ctx.body = {
        code: 200,
        message: '创建成功'
    }
})

module.exports = user