<template>
    <div class="inner cover">
      <h1 class="cover-heading">{{ title }}</h1>
      <p class="lead">
        {{ body1 }}
      </p>
      <p class="lead">
        {{ body2 }}
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
        title: '',
        body1: '',
        body2: ''
      };
    },
    methods: {
        getVan(){
          this.$http.get('/Van').then(res => {
            this.title = res.data.title
            this.body1 = res.data.body1
            this.body2 = res.data.body2
          })
        }
    },
    created(){
      this.getVan();
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
