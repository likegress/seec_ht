<template>
    <div class="bg">
        <div class="wrap">
            <h3>登录</h3>
            <ul>
                <li>
                    <span>用户名</span>
                    <el-input v-model="username"></el-input>
                </li>
                <li>
                    <span>密码</span>
                    <el-input v-model="pwd" show-password></el-input>
                </li>
            </ul>
            <div>
                <el-button type="primary" class="login-btn" @click="login">登录</el-button>
            
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        data() {
            return {
                username:'',
                pwd:''
            }
        },
        methods: {
            login(){
                if(this.username === "admin" && this.pwd == 123 ){
                    // 如果验证通过,在本地存储中存储一个token,跳转页面到主页
                    localStorage.setItem("token",true)
                    this.$router.push("/admin/index")
                
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

    .bg {
        height: 100vh;
        background: deepskyblue;
        position: relative;
        .wrap{
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 10px;
            padding: 15px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            h3 {
                text-align: center;
                font-size: 25px;
            }
            ul li {
                list-style: none;
                display: flex;
                align-items: center;
                margin: 10px 0;
                span {
                    width: 80px;
                }
            }
            .login-btn{
                width: 100%;
            }
        }
    }
</style>