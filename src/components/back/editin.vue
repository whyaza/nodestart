<template>
  <div class="shouyeguanli">
      <h1>首页管理</h1>
      <el-form label-width="80px">
        <el-form-item label="标题">
        <el-input v-model="title"></el-input>
        </el-form-item>
        <el-form-item label="主体1">
            <el-input v-model="body1"></el-input>
        </el-form-item>
        <el-form-item label="主体2">
            <el-input type="textarea" v-model="body2"></el-input>
        </el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
    </el-form>
  </div>
</template>

<script>
import { Message } from 'element-ui';
export default {
  name: 'shouyeguanli',
  data() {
      return {
        title: '',
        body1: '',
        body2: ''
      };
  },
  methods:{
      getVan(){
          this.$http.get('/Van').then(res => {
            this.title = res.data.title
            this.body1 = res.data.body1
            this.body2 = res.data.body2
          })
      },
      save(){
          //第二个参数为请求体
          this.$http.put(`/Van/put`,
            {
              "title" : this.title,
              "body1": this.body1,
              "body2": this.body2,
            }
          ).then(res =>{
            this.$message({
              showClose: true,
              message: '保存成功！'
            });
          })
      }
  },
  created(){
    this.getVan();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
