<template>
  <div class="fork-view">
    <ActualFork :forkList="currentFork" class="fork-view__actual"></ActualFork>
    <PreviousFork></PreviousFork>
  </div>
</template>

<script>
import ActualFork from './ActualFork';
import PreviousFork from './PreviousFork';

export default {
  name: 'ForkView',
  components: { ActualFork, PreviousFork },
  computed: {
    currentFork() {
      return this.$store.state.fork.current;
    }
  }
};
</script>

<style lang="scss">
.fork-view {
  &__actual {
    margin-bottom: calc(var(--base-padding) * 2);
  }
}
</style>
