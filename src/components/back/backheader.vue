<template>
  <div class="backheader">
    <el-container style="border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/look">查看</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/insert">新增</router-link></el-dropdown-item>
              <el-dropdown-item><el-button @click="logout()">用户退出</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>WHY-Home</span>
        </el-header>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'backheader',
  data() {
      return {
        
      };
  },
  methods:{
    logout(){
      this.$store.dispatch("del_token");
      this.$http.defaults.headers.common['token'] = '';
      this.$router.push({path:'/'});
    }
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
