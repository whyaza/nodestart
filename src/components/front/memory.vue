<template>

    <div class="memory">
        人生几年匆匆的回忆录
        <div class="block">
            <el-slider
            :step="10"
            :format-tooltip="timestepToolTip"
            show-stops
            :max="50"
            >
            </el-slider>
        </div>

        <router-view></router-view>
    </div>

</template>

<script>

export default {
  name: 'memory',
   data() {
      return {
           time: ['儿时时光','初中岁月', '高中三年','大学浪荡', '研究生活', '珍惜当下'],
           //time: ['/memory/ershishiguang','/memory/chuzhongsuiyue', '/memory/gaozhongsannian','/memory/daxuelangdang', '/memory/yanjiushenghuo', '/memory/zhenxidangxia'],
           ntime : ''
      }
  },
  methods: {
      timestepToolTip (index) {
          this.ntime = this.time[index / 10]
          this.$router.push({path: '/memory/memorys', query: {nt: this.ntime}  })
          return this.time[index / 10]
      },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

