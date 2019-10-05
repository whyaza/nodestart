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
              <p>Cover template for <a href="http://getbootstrap.com">Bootstrap</a>, by <a href="https://twitter.com/mdo">@wuhongyu</a>.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
