const verifytoken = require('koa-router')()

const jwt = require('jsonwebtoken')
const { jwtKey } = require('../config.js')

verifytoken.post('/', async ctx => {
    // 获取前端在header里传来的token，Authorization转换成了小写authorization
    const token = ctx.request.header.authorization
    try {
        jwt.verify(token, jwtKey)
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            ctx.body = {
                code: 401,
                message: 'token已过期!'
            }
            return
        }
        ctx.body = {
            code: 401,
            message: 'token验证错误!'
        }
        return
    }
    ctx.body = {
        code: 200,
        message: 'token正确'
    }
})

module.exports = verifytoken