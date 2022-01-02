<template>
    <div class="list">
        <h1>list</h1>
        <el-button type="primary" @click="handelGet">获取列表</el-button>
        <el-button type="primary" @click="handelPost">添加列表</el-button>
        <el-button type="primary" @click="handleDelete">删除列表</el-button>
        <div>
            <h1>{{message}}</h1>
        </div>
    </div>
</template>

<script>
export default{
    name: 'list',
    data() {
        return {
            message: ''
        }
    },
    methods: {
        async handelGet(){
            // 因为在创建axios拦截器时设置了axios的默认baseURL，所以可以不用写host，直接写路由地址
            // 要传token就用_request(封装了axios拦截器的方法)，普通的就可以用axios
            const res = await this.axios.get('/list/getlist')
            this.message = res.data.message
        },
        async handelPost(){
            const res = await this._request.post('/list/postlist')
            this.message = res.data.message
        },
        async handleDelete() {
            const res = await this._request.post('/list/deletelist')
            this.message = res.data.message
        }
    }
}
</script>
