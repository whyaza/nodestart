<template>
  <div class="site-wrapper">

      <div class="site-wrapper-inner">

        <div class="cover-container">

          <div class="masthead clearfix">
            <div class="inner">
              <h3 class="masthead-brand">WHY-Home</h3>
              <nav>
                <ul class="nav masthead-nav">
                  <li>    <router-link to="/">主页</router-link>    </li>
                  <li>    <router-link to="/first">随想</router-link>    </li>
                  <li>    <router-link to="/aboutme">关于我</router-link>    </li>
                </ul>  
              </nav>
            </div>
          </div>

          <div class="inner cover">
            <h1 class="cover-heading">Cover your page.</h1>
            <p class="lead">Cover is a one-page template for building simple and beautiful home pages. Download, edit the text, and add your own fullscreen background photo to make it your own.</p>
            <p class="lead">
              <router-link to="/first" class="btn btn-lg btn-default">Look more</router-link>
            </p>
          </div>

          <div class="mastfoot">
            <div class="inner">
              <p>Cover template for <a href="http://getbootstrap.com">Bootstrap</a>, by <a href="https://twitter.com/mdo">@wuhongyu</a>.</p>
            </div>
          </div>

        </div>

      </div>

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
      }
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
