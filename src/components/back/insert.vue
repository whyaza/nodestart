<template>
  <div class="insert">
    <h1>编辑页面</h1>
    <el-form label-width="80px">
        <el-form-item label="主题">
            <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input type="textarea" v-model="article.body"></el-input>
        </el-form-item>
        <el-button type="primary" @click="onSubmit">立即新增</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'insert',
  data() {
      return {
        article: {}
      };
  },
  methods:{
      onSubmit(){
          //第二个参数为请求体
          this.$http.post("/articles", this.article).then(res =>{
            this.$message({
              showClose: true,
              message: '新增成功！'
            });

            this.$router.push('/look');
          })
      }
  },
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
