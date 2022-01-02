const jwt = require('jsonwebtoken')
const { jwtKey } = require('../config.js')

class Auth {
    constructor(level) {
        Auth.USER = 2
        Auth.ADMIN = 5
        Auth.ROOT = 9
        this.level = level
    }
    
    get middleware() {
        return async (ctx, next) => {
            const token = ctx.request.header.authorization
            if (!token) {
                ctx.body = {
                    code: 401,
                    message: 'token验证错误，请重新登录!'
                }
                return
            }
            let decode
            try {
                decode = jwt.verify(token, jwtKey)
            } catch (err) {
                if (err.name === 'TokenExpiredError') {
                    ctx.body = {
                        code: 401,
                        message: 'token已过期，请重新登录!'
                    }
                    return
                }
                ctx.body = {
                    code: 401,
                    message: 'token验证错误，请重新登录!'
                }
                return
            }
            if (decode.scope < this.level) {
                ctx.body = {
                    code: 403,
                    message: '权限不足'
                }
                return
            }

            await next()
        }
    }

    static verifyToken(token) {
        try {
            jwt.verify(token, jwtKey)
            return true
        } catch (err) {
            return false
        }
    }
}

module.exports = Auth