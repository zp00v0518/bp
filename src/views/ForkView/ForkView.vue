<template>
  <div>
    <div v-for="(item, itemIndex) in currentFork" :key="itemIndex">
      {{itemIndex}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForkView',
  created() {
    console.log(this.currentFork);
  },
  computed: {
    currentFork() {
      return this.$store.state.fork.current;
    }
  }
};
</script>

<style lang="scss"></style>
