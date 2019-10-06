<template>
    <div class="discuss">
      <!--default-expand-all 是默认全部展开-->
      <div class="block inner cover">
        <el-tree
          :data="data"
          node-key="id"
          icon-class="el-icon-user-solid"
          >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                type="text"
                size="mini"
                @click="() => append(data)">
                回复
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

      <br/>

      <el-tag type="info pull-left" v-if="ishf">现在，您可在此处回复 {{fname}} </el-tag>
      <!--<el-tag type="info pull-right" v-if="ishf" @click="tome">或者，点击此处 ->给我留言</el-tag>-->
      <br/>

      <el-form ref="form" :model="form" :inline="true">
          <el-form-item>
              <el-input type="textarea" v-model="form.content" placeholder="留言内容"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="check">立即留言</el-button>
          </el-form-item>
          <el-form-item v-if="showName">
              <el-input v-model="form.Name" placeholder="您的姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="showName">
              <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
      </el-form>

    </div>
</template>

<script>
  export default {
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
        fname: "", //要回复的人的姓名
        showName : false,
        ishf :false,
        
        submited : "enabled",  //一个人只能提交三次
        
        form: {
            Name: '',
            content: '',
            parentId: 0
        },

        pageSize: 5,  //每页的数据量
        currentPage: 1, //初始页
        totalCount : 0,  //显示的总数目
        pagerCount : 5,  //几页以后开始显示...必须是大于5且小于21的奇数

        data: JSON.parse(JSON.stringify(data))
      };
    },
    methods: {
      tome(){
        this.ishf = false;
        this.form.parentId = 0;
      },
      check() {
        if (this.form.content.length > 20){
          this.$message({
            message: '您的评论不可以超过20个字',
            type: 'warning'
          });
        }else if (this.form.content.length == 0){
          this.$message({
            message: '您的评论不可以为空',
            type: 'warning'
          });
        }else{
          this.showName = true
        }
      },
      onSubmit() {
        //先看输入是否合规
        if (this.form.Name.length > 6){
          this.$message({
            message: '您的姓名不可以超过6个字',
            type: 'warning'
          });
        }else if (this.form.Name.length == 0){
          this.$message({
            message: '您的姓名不可以为空',
            type: 'warning'
          });
        }else{
          console.log('submit!'); 
          
          if (this.form.content.length > 20 || this.form.content.length == 0
            || this.form.Name.length > 6 || this.form.Name.length ==0){
            this.$message({
              message: '您提交的内容长度不合规',
              type: 'warning'
            });
          }else{            
            //判断是否重复提交  或者  多次提交
            this.submitedCount++;
            if (this.submitedCount > 3){
              alert("一个人最多只能提交三次");
            }else{
              this.$http.post('/discussz',this.form).then(res => {
                console.log(res);
                //更新一下视图
                this.getDiscussCount()
                this.handleCurrentChange()
              })
            }

          }

        }
      },
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
              
              console.log(newData.children)

              this.data.push(newData)
          }
          console.log(this.data)

        })
      },
      append(data){
        this.ishf = true;
        //点击回复进入的函数
        //console.log(data.id)
        //现在再回复的，   就是回复此id的刃
        this.form.parentId = data._id
        this.fname = data.Name
      },
      handleNodeClick(data) {
        console.log(data);
      },
      getDiscussCount(){
        this.$http.post('/discussCount').then(res => {
          this.totalCount = res.data.totalCount;
        })
      },
    },
    created() {
      this.getDiscussCount()
      this.handleCurrentChange()
    }
  }
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>