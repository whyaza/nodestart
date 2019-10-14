<template>
  <div class="site-wrapper">

      <div class="site-wrapper-inner">

        <div class="cover-container">

          <div class="masthead clearfix">
            <div class="inner">
              <h3 class="masthead-brand">
                WHY-Home
                <router-link to="/memory" style="color:#409EFF;">回忆</router-link> 
              </h3>
              <nav>
                <ul class="nav masthead-nav">
                  <li>    <router-link to="/">主页</router-link>    </li>
                  <li>    <router-link to="/first">随想</router-link>    </li>
                  <li>    <router-link to="/aboutme">关于我</router-link>    </li>
                  <li>    <router-link to="/discuss">给我留言</router-link>    </li>
                </ul>  
              </nav>
            </div>
          </div>

          <div class="inner cover">
              <router-view></router-view>
          </div>

          <div class="mastfoot">
            <div class="inner">
              <p>The domain name is<a href="http://106.13.73.45/16451">being applied</a>, by <a href="https://twitter.com/mdo">@wuhongyu</a>.</p>
              <div @click="tologin">md.Inc</div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
      return {}
    },
  methods:{
    tologin(){
      //console.log("dao1");
      this.$router.push({path:"/login"})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
