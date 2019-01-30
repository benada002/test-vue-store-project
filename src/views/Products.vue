<template>
  <div class="about">
    <div class="container">
      <div class="card-columns">
        <div class="card" v-for="(post, i) in posts">
          <router-link :to="`/details/${i}`">
            <img alt=" " class="card-img-top" :src="post.images[0]">
            <div class="card-body">
              <h5 class="card-title">{{post.title}}</h5>
              <p class="card-text">{{post.price}}€</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  text-align: left;
  -webkit-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 4px -1px rgba(0, 0, 0, 0.5);
  p {
    color: black;
    font-weight: 600;
  }
}
</style> 
