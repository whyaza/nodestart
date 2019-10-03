<template>
  <div class="look">
      <h1 class="pull-left">随想管理   主页面</h1>
      <h1 class="pull-right"><router-link to="/insert" class="btn default-button">新增</router-link></h1>
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
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalCount">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'look',
  data() {
      return {
        articles : [],
        pageSize: 5,  //每页的数据量
        currentPage: 1, //初始页
        totalCount : 0  //显示的总数目
      }
    },
  methods:{
    //获得显示的总数目
    getShowCount(){
      this.$http.get('/articlesTotalCount').then(res => {
        this.totalCount = res.data.totalCount;
      })
    },
    //按页获得
    handleCurrentChange(currentPage){
      //currentPage 一开始默认是1
      //this.currentPage = currentPage;
      //console.log(this.currentPage)  //点击第几页

      this.currentPage = currentPage;
      this.$http.get(`/articlesf/${this.currentPage}/${this.pageSize}`).then(res => {
        if (res.status === 403){
          this.$message({
              showClose: true,
              message: res.msg
          });
          this.$router.push({path: '/login'});
        }

        this.articles = res.data.articlesf;
      })
    },

    handleEdit(index, row) {
      this.$router.push(`/edit/${row._id}`);
    },
    handleDelete(index, row){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //使用ES6 模板字符串 ` 这个符号
        this.$http.delete(`/articles/${row._id}`).then(res =>{
          this.$message({
                showClose: true,
                message: '删除成功！'
          });
          //更新一下数据
          this.getShowCount();
          this.handleCurrentChange();
        });  
        //按照id去删除，这个id是建立数据的时候，mongo数据库给分配的id。

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    
    },
  },
  created() {
    this.getShowCount();
    this.handleCurrentChange();
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.look{
    background-color: #FFFFFF;
}
</style>
