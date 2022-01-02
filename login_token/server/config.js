module.exports = {
    // jwt 加密密钥
    jwtKey: 'hfs78dfyds78f7dstyf78dstf78dstf',
    // token过期时间(秒)
    tokenTime: 60 * 60 * 24,
    // 数据库(mongodb)
    db: {
        // 数据库连接地址
        url: 'mongodb://localhost:27017/users',
        // 数据库
        database: 'users',
        // 集合
        collection: 'token'
    }

}