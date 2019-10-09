<template>

    <div class="articledetails">
        <h1>{{  $route.params.title  }}</h1>
        <br/>
        <h6>{{  $route.params.time  }}</h6>
        <br/>
        <div class="wrapper">{{  $route.params.article  }}</div>
    </div>

</template>

<script>

export default {
  name: 'articledetails',
   data() {
      return {}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper{
  white-space: pre-wrap;
  word-break: break-all;
} 
</style>

