<template>
    <el-form style="width: 400px;">
        <el-form-item  style="height: 40px;margin-bottom: 20px;">
            <el-input class="input" maxlength="8" placeholder="请输入验证码"></el-input>
                <div class="divIdentifyingCode" @click="getIdentifyingCode(true)">
                    <img id="imgIdentifyingCode" style="height:40px; width: 100px; cursor: pointer;" alt="点击更换"
                        title="点击更换" />
                </div>
        </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'veritify',
   methods: {
    /**
     * 窗口代码
     * @param {Boolean} bRefresh 是否刷新
     */
    getIdentifyingCode(bRefresh) {
      let identifyCodeSrc =  "http://localhost:3000/api/imgCode";
      if (bRefresh) {
        identifyCodeSrc = "http://localhost:3000/api/imgCode/" + Math.random();
      }
      let objs = document.getElementById("imgIdentifyingCode");
      objs.src = identifyCodeSrc;
    },
  },
  created(){
      this.getIdentifyingCode(true);
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
