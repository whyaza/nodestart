<template>
 
    <!--<h1>This is WHY home</h1>
    <el-collapse @change="handleChange" >
      <div v-for="article in articles" :key="article.time">
        <el-collapse-item :title="article.time +'        ' + article.title">
          <div>{{  article.body }}</div>
        </el-collapse-item>
      </div>
    </el-collapse>

    <el-button @click="tologin()">后台管理</el-button>-->

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
            <h1 class="cover-heading">
              <img src="../../../static/me5.jpeg" alt="gravatar.png" style="border-radius:50%;height: 100px;width:100px">
            </h1>
            <p class="lead">
              吴洪宇 一个普通人
            </p>
            <p class="lead">
              喜欢的事情有很多
            </p>
            <p class="lead">
              不喜欢的事情也很多
            </p>
            <p class="lead">
              不喜欢麻烦的事情呢
            </p>
            <p class="lead">
              做人嘛 开心最重要
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
      return {}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
