<template>
  <div class="home">
    <img class="img-fluid" alt="Vue logo" src="../assets/1.jpeg">
    <HelloWorld msg="Welcome"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
};
</script> 
