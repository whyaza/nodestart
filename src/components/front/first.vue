<template>
  <div class="hello">
    <h1>This is WHY home</h1>
    <el-collapse @change="handleChange" >
      <div v-for="article in articles" :key="article.time">
        <el-collapse-item :title="article.time +'        ' + article.title">
          <div>{{  article.body }}</div>
        </el-collapse-item>
      </div>
    </el-collapse>

    <el-button @click="tologin()">后台管理</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
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
