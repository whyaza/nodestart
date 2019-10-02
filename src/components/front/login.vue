<template>
  <div class="login"> 
      
        <el-input placeholder="请输入口令" v-model="input.pass" show-password></el-input>
        
        <el-input  class="log-input" v-model="input.seccode" placeholder="验证码" prefix-icon="icon-login_auth"
        @keydown.enter.native="login('form')"></el-input>

        <span class="checkCode" @click="createCode">{{ checkCode}}</span>

        <el-button type="primary" plain @click="login()">登录</el-button>
      
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'login',
   data() {
      return {
        input: {},
        checkCode:'',
      };
    },
    methods: {
        createCode(){
          this.$http.get('/imgCode').then(res =>{
            this.checkCode  = res.data;
          });
        },
        login(){
          //1.登录还有个session问题。--》使用token
          //2.在前台校对验证码，会不会有安全问题。  
          if (this.checkCode !== this.input.seccode){
            this.$message({
              showClose: true,
              message: '验证码错误！'
            });
          }else{
            this.$http.post("/lone", this.input).then(res =>{
                if (res.data.status == 200){
                  //使用vuex对全局token进行状态管理
                  this.$store.dispatch("set_token",res.data.token);
                  //设置：全局带token
                  this.$http.defaults.headers.common['token'] = this.$store.state.token;

                  this.$router.push({path:'/back'});
                }else{
                  this.$message({
                    showClose: true,
                    message: '口令错误！'
                  });
                }
            })
          }
        }
    },
    created(){
      this.createCode();
    },
    components:{
      Vue
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
