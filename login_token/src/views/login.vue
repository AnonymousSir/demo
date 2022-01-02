<template>
    <div class="login">
        <h1>login</h1>
        <el-form ref="form" @keyup.enter.native="login" :rules="rules" :model="user" label-width="120px" class="login-from">
            <el-form-item>
                <h1 class="login-form-heading">登录</h1>
                <span>root权限可以删除列表</span> |
                <span>admin权限可以添加列表</span> |
                <span>user权限只能获取列表</span>
            </el-form-item>
            <!-- 为了方便测试，将权限不同的3个用户信息设置在button上 -->
            <el-form-item>
                <span>测试用，快速登录(权限|用户) </span>
                <el-button type="primary" @click="user.username = '1'; user.password = '1'; login()">root 1</el-button>
                <el-button type="primary" @click="user.username = '2'; user.password = '2'; login()">admin 2</el-button>
                <el-button type="primary" @click="user.username = '3'; user.password = '3'; login()">user 3</el-button>
            </el-form-item>
            <el-form-item label="用户名" prop="username" >
                <el-input v-model="user.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="user.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="login" :disabled="!canSubmit">登录</el-button>
                <el-button type="primary" @click="createUser" :disabled="!canSubmit">创建用户</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { Message } from 'element-ui'
export default{
    name: 'login',
    data(){
        return {
            user: {
                username: '3',
                password: '3'
            },
            rules: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
            }
        }
    },
    computed: {
        canSubmit(){
            const { username, password } = this.user
            return Boolean(username && password)
        }
    },
    methods: {
        async login() {
            const res = await this.axios.post('/login', {
                username: this.user.username,
                password: this.user.password
            })
            if (res.data.code === 400) {
                Message.error(res.data.message)
                return
            }
            localStorage.setItem('token', res.data.token)
            Message.success(res.data.message)
            this.$router.push('/list')
        },
        async createUser() {
            const res = await this.axios.post('/user/createuser', {
                username: this.user.username,
                password: this.user.password
            })
            if (res.data.code === 400) {
                Message.error(res.data.message)
                return
            }
            Message.success(res.data.message)
        }
    }
}
</script>