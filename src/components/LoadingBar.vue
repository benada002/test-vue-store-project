<template>
  <div class="loading-bar" :style="{width: `${percent}%`,}"></div>
</template>

<script>
export default {
  name: 'LoadingBar',
  computed: {
    percent() {
      return this.$store.state.loadingProcess;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loading-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  z-index: 99999;
  background-color: cornflowerblue;
}
</style>
