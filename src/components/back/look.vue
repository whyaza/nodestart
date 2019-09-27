<template>
  <div class="look">
      <hd></hd>
      <el-table :data="articles">
        <el-table-column prop="time" label="日期" width="140">
        </el-table-column>
        <el-table-column prop="title" label="主题" width="120">
        </el-table-column>
        <el-table-column prop="body" label="内容">
        </el-table-column>

          <el-table-column
            align="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
            </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script>
import hd from './backheader'
export default {
  name: 'look',
  data() {
      return {
        articles : []
      }
    },
  methods:{
    fetch(){
      //一般fetch方法就是获取数据的
      this.$http.get('/articles').then(res => {
        this.articles = res.data
      })
    },

    handleEdit(index, row) {
      console.log(index);
      console.log(row);
      this.$router.push(`/edit/${row._id}`);
    },
    handleDelete(index, row){
      console.log(index);
      console.log(row);
      
      //使用ES6 模板字符串 ` 这个符号
      this.$http.delete(`/articles/${row._id}`).then(res =>{
        this.$message({
              showClose: true,
              message: '删除成功！'
        });
        this.fetch();
      });  
      //按照id去删除，这个id是建立数据的时候，mongo数据库给分配的id。
    
    }
  },
  created() {
    this.fetch();
  },
  components:{
    hd
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
