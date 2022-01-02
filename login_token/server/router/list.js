const list = require('koa-router')()

const Auth = require('../middlewares/auth.js')

// 权限控制
// 获取列表
list.get('/getlist', ctx => {
    ctx.body = {
        code: 201,
        message: 'get list 2333'
    }
})
// 添加列表
list.post('/postlist', new Auth(5).middleware, ctx => {
    ctx.body = {
        code: 201,
        message: 'post list 2333'
    }
})
// 删除列表
list.post('/deletelist',new Auth(9).middleware, ctx => {
    ctx.body = {
        code: 201,
        message: 'deleta list 2333'
    }
})

module.exports = list