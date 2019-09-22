<template>

    <el-container style="border: 1px solid #eee">
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><router-link to="/look">查看</router-link></el-dropdown-item>
              <el-dropdown-item><router-link to="/insert">新增</router-link></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>WHY-Home</span>
        </el-header>
        
        <router-view></router-view>

      </el-container>
    </el-container>

</template>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
      };
      return {
        tableData: Array(5).fill(item)
      }
    }
  };
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
