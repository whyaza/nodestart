<template>
 
  <div class="inner cover">
    <el-collapse @change="handleChange" >
      <div v-for="article in articles" :key="article.time">
        <el-collapse-item :title="article.time +'        ' + article.title">
          <div>{{  article.body }}</div>
        </el-collapse-item>
      </div>
    </el-collapse>

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
    
    <button class="btn btn-default" @click="tologin()">后台管理</button>
  </div>

</template>

<script>
export default {
  name: 'first',
   data() {
      return {
        articles : [],
        pageSize: 5,  //每页的数据量
        currentPage: 1, //初始页
        totalCount : 0,  //显示的总数目
        pagerCount : 5,  //几页以后开始显示...必须是大于5且小于21的奇数
      };
    },
    methods: {
      getShowCount(){
        this.$http.get('/fr/articlesTotalCount').then(res => {
          this.totalCount = res.data.totalCount;
        })
      },
      //按页获得
      handleCurrentChange(currentPage){
        //currentPage 一开始默认是1
        //this.currentPage = currentPage;
        //console.log(this.currentPage)  //点击第几页

        this.currentPage = currentPage;
        this.$http.get(`/fr/articlesf/${this.currentPage}/${this.pageSize}`).then(res => {
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
      handleChange(val) {
        console.log(val);
      },
      tologin(){
        this.$router.push({path:"/login"});
      }
    },
    created(){
      this.getShowCount();
      this.handleCurrentChange();
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
