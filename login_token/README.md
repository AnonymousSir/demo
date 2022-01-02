# login_token
实现功能
用户登录，检验密码是否正确
正确返回token
通过路由守卫判断页面是否需要登录
登录前检验是否有token，以及token是否正确
对不同级别的用户进行判断，若权限不足不能进行对对应操作

## 运行环境
koa + jsonwebtoken + mongodb + vue + element-ui

## 安装项目所有依赖
```
npm install
```

### 前端代码运行
```
npm run serve
```

### 后端服务运行
```
cd server
nodemon app.js
```

### 前端代码编译
```
npm run build
```

## 配置

### 前端配置后端接口地址
web.config.json -> host:

### 后端配置数据库地址
/server/config.js
