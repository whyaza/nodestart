<template>
    <div class="discuss">
      <el-tag type="info pull-left" v-if="ishf">您可在此处回复</el-tag>
      <el-form ref="form" :model="form" :inline="true">
          <el-form-item>
              <el-input type="textarea" v-model="form.discontent" placeholder="留言内容"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="check">立即留言</el-button>
          </el-form-item>
          <el-form-item v-if="showName">
              <el-input v-model="form.name" placeholder="您的姓名"></el-input>
          </el-form-item>
          <el-form-item v-if="showName">
              <el-button type="primary" @click="onSubmit">提交</el-button>
          </el-form-item>
      </el-form>
      <ul class="list-group">
        <li class="list-group-item">
          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
          用户名字
          <div class="well">
            评论内容
            <button class="btn btn-default pull-right" @click="hf">回复</button>
          </div>
        </li>

        <li class="list-group-item">
          <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
          用户名字
          <div class="well">
            评论内容
            <button class="btn btn-default pull-right">回复</button>
          </div>
        </li>
        
      </ul>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        showName : false,
        ishf :false,
        form: {
            name: '',
            discontent: ''
        }
      }
    },
    methods: {
      check() {
        if (this.form.discontent.length > 20){
          this.$message({
            message: '您的评论不可以超过20个字',
            type: 'warning'
          });
        }else if (this.form.discontent.length == 0){
          this.$message({
            message: '您的评论不可以为空',
            type: 'warning'
          });
        }else{
          this.showName = true
        }
      },
      onSubmit() {
        if (this.form.name.length > 6){
          this.$message({
            message: '您的姓名不可以超过6个字',
            type: 'warning'
          });
        }else if (this.form.name.length == 0){
          this.$message({
            message: '您的姓名不可以为空',
            type: 'warning'
          });
        }else{
          console.log('submit!'); 
          
          if (this.form.discontent.length > 20 || this.form.discontent.length == 0
            || this.form.name.length > 6 || this.form.name.length ==0){
            this.$message({
              message: '您提交的内容长度不合规',
              type: 'warning'
            });
          }else{
            this.$http.post('/discuss',form).then(res => {
              console.log("提交");

            })
          }

        }
      },
      hf(){
        this.ishf = true;
        console.log("提交的东西，变成回复了");
      }
    }
  }
</script>