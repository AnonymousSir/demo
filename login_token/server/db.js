const mongoose = require('mongoose')
const config = require('./config.js')

mongoose.connect(config.db.url, {useNewUrlParser: true, useUnifiedTopology: true})

const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    // 用户权限级别(2普通用户、5管理员、9root权限)
    scope: Number
},{versionKey: false})
const dbo = mongoose.model(config.db.database, loginSchema, config.db.collection)

module.exports = dbo