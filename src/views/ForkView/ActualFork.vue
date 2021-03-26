<template>
  <div class="fork">
    <div class="fork__curr">
      <template v-if="Object.keys(forkList).length > 0">
        <div class="fork__find-date">
          Найдено: <span>{{ getFindDate(forkList[0].created_at) }}</span>
        </div>
        <div class="fork__curr__main">
          <div
            class="fork__curr__item--wrap"
            v-for="(curFork, curForkIndex) in forkList"
            :key="curForkIndex"
          >
            <ForkItem :data="curFork" class="fork__curr__item"></ForkItem>
          </div>
        </div>
      </template>
      <tamplate v-else>
        <div class="fork__empty">Актуальных вилок нет</div>
      </tamplate>
    </div>
  </div>
</template>

<script>
import ForkItem from './ForkItem';

export default {
  name: 'ActualFork',
  components: { ForkItem },
  props: {
    forkList: { type: Array, default: () => [] }
  },
  computed: {
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
      &--wrap {
        padding: 0 var(--double-step);
        margin: var(--half-base-padding) auto;
      }
    }
    &__main {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  &__empty {
    text-align: center;
    font-size: calc(var(--base-font-size) * 1.8);
    font-weight: bold;
  }
  &__find-date {
    span {
      font-weight: bold;
      font-size: calc(var(--base-font-size) * 1.2);
    }
  }
}
</style>
