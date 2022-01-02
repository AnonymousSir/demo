const Koa = require('koa')
const router = require('koa-router')()
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')

const routers = require('./router/index.js')

const app = new Koa()

// 将内容提取出来放到一个router文件夹里了
// login
router.use('/login', routers.login.routes())
// 验证token
router.use('/verifytoken', routers.verifytoken.routes())
// 权限控制
router.use('/list', routers.list.routes())
// 创建用户
router.use('/user', routers.user.routes())

// 跨域
app.use(cors())
// 获取post参数
app.use(bodyParser())
// 挂载router
app.use(router.routes())
app.listen(8088)

