<template>
  <el-container style="height:100%; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)" v-show="menushow">
            <el-menu :default-openeds="['1']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-menu"></i>前台管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"><router-link to="/back">首页管理</router-link></el-menu-item>
                        <el-menu-item index="1-2"><router-link to="/look">随笔管理</router-link></el-menu-item>
                        <el-menu-item index="1-3"><router-link to="/discussManage">留言管理</router-link></el-menu-item>
                        <el-menu-item index="1-4"><router-link to="/others">其他管理</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
    
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
              <span @click="findElmenu()" class="pull-left" style="cursor: col-resize;">菜单启用/禁用</span>
            <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><span @click="logout()">用户退出</span></el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <span>WHY-Home</span>
            </el-header>
            
            <el-main style="padding: 0px">
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>  
</template>>

<script>
  export default {
    data() {
      return {
        menushow : false
      }
    },
    methods:{
      logout(){
        //console.log("用户要退出");
        this.$store.dispatch("del_token");
        this.$http.defaults.headers.common['token'] = '';
        this.$router.push({path:'/'});
      },
      findElmenu(){
        this.menushow = !this.menushow;
      }
    },
    created(){
      //判断是手机还是pc，手机menushow - >false， pc menushow->true
        if( screen.width < 640){
            this.menushow = false;
        }else{
            this.menushow = true;
        }
    }
  };
</script>

<style scoped>
    .el-main{
        display: block;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
        overflow: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>