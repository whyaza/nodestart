<template>
  <div class="edit">
    <el-form label-width="80px">
        <el-form-item label="时间">
        <el-input v-model="article.time"></el-input>
        </el-form-item>
        <el-form-item label="题目">
            <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
            <el-input type="textarea" v-model="article.body"></el-input>
        </el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'edit',
  data() {
      return {
        article: {}
      };
  },
  methods:{
      fetch(){
          this.$http.get(`/articles/${this.$route.params.id}`).then(res => {
              this.article = res.data;
          });
      },
      save(){
          //第二个参数为请求体
          this.$http.put(`/articles/${this.$route.params.id}`, this.article).then(res =>{
            this.$message({
              showClose: true,
              message: '保存成功！'
            });

            this.$router.push('/look');
          })
      }
  },
  created(){
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
