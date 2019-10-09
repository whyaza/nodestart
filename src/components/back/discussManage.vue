<template>
  <div class="discussManage">
      <h1>留言管理</h1>

    <div class="block">
       <el-tree
        :data="data"
        node-key="id"
        icon-class="el-icon-user"
        :expand-on-click-node="false"
        default-expand-all
        >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-button
              type="text"
              size="mini"
              @click="() => remove(node, data)">
              删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>

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
  name: 'discussManage',
  data() {
      const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      
      return {
        pageSize: 5,  //每页的数据量
        currentPage: 1, //初始页
        totalCount : 0,  //显示的总数目
        pagerCount : 5,  //几页以后开始显示...必须是大于5且小于21的奇数

        form: {
            Name: '',
            content: '',
            parentId: 0
        },

        data: JSON.parse(JSON.stringify(data))
      }
    },
  methods:{
    //获得显示的总数目
    getShowCount(){
      this.$http.post('/discussCount').then(res => {
          this.totalCount = res.data.totalCount;
        })
    },
    //按页获得
    handleCurrentChange(currentPage){
        this.currentPage = currentPage

        this.$http.post(`/discussc/${this.currentPage}/${this.pageSize}`).then(res => {
          this.data = []
          let rdata = res.data.discuss;
          //整理返回的数据

          for (var i = 0; i < rdata.length; i++){
              var newData = {}
              newData.label = rdata[i].label
              newData._id = rdata[i]._id //后面可能会用到吧..
              newData.Name = rdata[i].Name
              //进行深度复制
              newData.children = JSON.parse(JSON.stringify( rdata[i].children ));
              
              //console.log(newData.children)

              this.data.push(newData)
          }
          //console.log(this.data)

        })
      },

    remove(node, data){
      this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          //删除评论
        //先把组件上的删除
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
        //在删除一下数据库的
        //console.log(data._id);

        
        this.$http.delete(`/discuss/${data._id}`).then(res =>{
          this.$message({
                showClose: true,
                message: '删除成功！'
          });
        });

        //按照_id去删除，这个id是建立数据的时候，mongo数据库给分配的id。

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
