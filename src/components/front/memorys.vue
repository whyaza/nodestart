<template>

    <div class="memorys">
      {{ this.$route.query.nt  }}       待增加
      <br/>
      <br/>
      <!--放灯片-->
      <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in data" :key="item">
            <h3>{{ item.title }}</h3>
            <h3>更多</h3>   <!--  直接转到文章详情  -->
            </el-carousel-item>
        </el-carousel>

</div>

</template>

<script>

export default {
  name: 'memorys',
   data() {
      return {
          data:[ {
              title:"123",
              content:"123",
              writeTime:"123",
          },{
             title:"123111",
              content:"12311",
              writeTime:"1231",
          },{
                title:"123asd",
              content:"123asd",
              writeTime:"123zxc",
          }   ]
      }
  },
  create(){
      //根据哪个this.$route.query.nt   时段来获取文章

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

</style>

