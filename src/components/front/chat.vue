<template>
<!--<el-form ref="form" :model="form" :inline="true">
        <el-form-item>
            <el-input v-model="form.matter"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">确认</el-button>

        </el-form-item>
    </el-form>-->
    <div>
       <ul>
            <li v-for="item in form.message_array" :key="item.woca" >
              <span class="glyphicon glyphicon-user" aria-hidden="true" style="text-align: left">{{item[0]}} </span> 
              <br/>
               <span class="glyphicon glyphicon-home" aria-hidden="true">{{item[1]}}  </span> 
            </li>
        </ul>

        <el-form ref="form" :model="form" :inline="true" @submit.native.prevent>
            <el-form-item>
                <el-input v-model="form.matter"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认</el-button>

            </el-form-item>
        </el-form>

    </div>



</template>
<script>
  export default {
    data() {
      return {
        form: {
          matter: '',
          message_array:[]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        var d1 = [this.form.matter]
        this.form.message_array.push(d1)
        this.$http.post(`/tuling`,this.form.matter).then(res => {
          console.log(res.data.msg.text)
          d1.push(res.data.msg.text)
        })
        this.form.matter = ''
      }
    }
  }
</script>

<style scoped>
ul > li  > span:first-child {
  text-align: left;
}
ul > li  > span:second-child {
  text-align: right;
}
ul {
  list-style: circle;
}
li{
  margin-bottom: 20px;
}
</style>