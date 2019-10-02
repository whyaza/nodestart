<template>
    <div class="inner cover">
      <h1 class="cover-heading">近来随想</h1>
      <p class="lead">
        本站前端采用vue,vue-router,vuex ，后端采用nodejs,express,mongodb
      </p>
      <p class="lead">
        说了这么多，其实我也不是很懂，就是调个接口的。希望大神们不要攻击我的网站，我只是想玩玩而已喽
      </p>
      <p class="lead">
        <router-link to="/first" class="btn btn-lg btn-default">Look more</router-link>
      </p>
    </div>
</template>

<script>
export default {
  name: 'first',
   data() {
      return {
        articles: {}
      };
    },
    methods: {
          fetch(){
          //一般fetch方法就是获取数据的
          this.$http.get('/fr/articles').then(res => {
            this.articles = res.data
          })
        },
      handleChange(val) {
        console.log(val);
      },
      tologin(){
        this.$router.push({path:"/login"});
      },
    },
    created(){
      console.log(this.$http.token);
      this.fetch();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
