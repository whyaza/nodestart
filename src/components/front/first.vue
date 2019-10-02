<template>
 
  <div class="inner cover">
    <el-collapse @change="handleChange" >
      <div v-for="article in articles" :key="article.time">
        <el-collapse-item :title="article.time +'        ' + article.title">
          <div>{{  article.body }}</div>
        </el-collapse-item>
      </div>
    </el-collapse>

    <button class="btn btn-default" @click="tologin()">后台管理</button>
  </div>

</template>

<script>
export default {
  name: 'first',
   data() {
      return {
        articles: {}
      };
    },
    methods: {
          fetch(){
          //一般fetch方法就是获取数据的
          this.$http.get('/fr/articles').then(res => {
            this.articles = res.data
          })
        },
      handleChange(val) {
        console.log(val);
      },
      tologin(){
        this.$router.push({path:"/login"});
      }
    },
    created(){
      console.log(this.$http.token);
      this.fetch();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--
添加scoped的话，你只能控制.page{width:100px;}及其内部的样式，像这种body，html需要在全局进行设置；
并且你若是在全局样式中写了另一个.page{width:50px;}，也会影响到当前页面的.page

//要更改上层组件，
1.加上 /deep/
2.去掉 scoped  尽量不要这样，
-->
<style scoped>
</style>
