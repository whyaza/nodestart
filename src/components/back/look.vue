<template>
  <div class="look">
      <h1>随想管理</h1>
      <span>
          <router-link to="/insert" class="btn default-button">新增</router-link>
      </span>
      <span @click="findshow = !findshow" style="cursor: all-scroll;">查询启用/禁用</span>

      <el-form :inline="true" :model="form" class="demo-form-inline"  v-show="findshow">
        <el-form-item label="时间">
          <el-input v-model="form.time" placeholder="时间"></el-input>
        </el-form-item>
        
        <el-form-item label="主题">
          <el-input v-model="form.title" placeholder="主题"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input v-model="form.body" placeholder="内容"></el-input>
        </el-form-item>

        <br/>
        <el-form-item>
          <el-button type="primary" @click="handleCurrentChange(1)">查询</el-button>
        </el-form-item>
      </el-form>

      <el-table :data="articles">

        <el-table-column prop="time" label="日期" :xs="6">
        </el-table-column>
        <el-table-column prop="title" label="主题" :xs="6">
        </el-table-column>
        <el-table-column prop="body" label="内容" :xs="6">
        </el-table-column>

          <el-table-column
            align="right" :xs="6">
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
        :total="totalCount"
        :pager-count = "pagerCount"
        >
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
        totalCount : 0,  //显示的总数目
        pagerCount : 5,  //几页以后开始显示...必须是大于5且小于21的奇数

        form: {
          time: '',
          title: '',
          body: '',
        },
        
        findshow : false
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
      this.currentPage = currentPage
      
      this.$http.post(`/articlesf/${this.currentPage}/${this.pageSize}`,this.form).then(res => {
        if (res.status === 403){
          this.$message({
              showClose: true,
              message: res.msg
          });
          this.$router.push({path: '/login'});
        }

        console.log(res);
        this.articles = res.data.articlesf;
        this.totalCount = res.data.total;
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

    //判断是手机还是pc，手机menushow - >false， pc menushow->true
        if( screen.width < 640){
            this.findshow = false;
        }else{
            this.findshow = true;
        }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.look{
    background-color: #FFFFFF;
}
</style>
