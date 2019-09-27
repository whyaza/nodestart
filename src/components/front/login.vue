<template>
  <div class="login"> 
      
        <el-input placeholder="请输入口令" v-model="input.pass" show-password></el-input>
        
        <el-input  class="log-input" v-model="input.seccode" placeholder="验证码" prefix-icon="icon-login_auth"
        @keydown.enter.native="login('form')"></el-input>

        <span class="checkCode" @click="createCode">{{ checkCode}}</span>

        <el-button type="primary" plain @click="lone()">登录</el-button>
      
  </div>
</template>

<script>
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
        lone(){
          //登录还有个session问题。
            console.log(this.input);
            this.$http.post("/lone", this.input).then(res =>{
                if(res.data){
                    if (this.checkCode === this.input.seccode){
                      this.$router.push({path: '/look'});
                    }else{
                      this.$message({
                        showClose: true,
                        message: '验证码错误！'
                      });
                    }
                }else{
                    this.$message({
                      showClose: true,
                      message: '密码错误！'
                    });
                }
            });
        }
    },
    created(){
      this.createCode();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
