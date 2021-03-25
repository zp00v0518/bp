<template>
  <div class="fork">
    <div class="fork__curr">
      <template v-if="currentFork.length > 0">
        <div class="fork__find-date">
          {{ getFindDate(currentFork[0].created_at) }}
        </div>
        <div class="fork__curr__main">
          <ForkItem
            v-for="(curFork, curForkIndex) in currentFork"
            :key="curForkIndex"
            :data="curFork"
            class="fork__curr__item"
          ></ForkItem>
        </div>
      </template>
      <tamplate v-else>
        <div>Ничего не найдено</div>
      </tamplate>
    </div>
  </div>
</template>

<script>
import ForkItem from './ForkItem';

export default {
  name: 'ForkView',
  components: { ForkItem },
  created() {
    console.log(this.currentFork);
  },
  computed: {
    currentFork() {
      return this.$store.state.fork.current;
    },
    bkList() {
      return this.$store.state.global.bkList;
    }
  },
  methods: {
    getFindDate(value) {
      const z = new Date(value);
      var options = { hour: 'numeric', minute: 'numeric' };
      const date = z.toLocaleDateString(undefined, options);
      return date;
    }
  }
};
</script>

<style lang="scss">
.fork {
  text-align: left;
  &__curr {
    &__item {
      margin: var(--base-padding);
      width: fit-content;
    }
    &__main {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>
