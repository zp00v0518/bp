<template>
  <div class="previos-fork">
    <div class="previos-fork__title">Недавние вилки</div>
    <template v-if="previousList.length > 0 && Object.keys(bkList).length > 0">
      <ActualFork
        v-for="(arr, index) in previousList"
        :forkList="arr"
        :key="index"
        >{{ test(arr) }}</ActualFork
      >
    </template>
  </div>
</template>

<script>
import ActualFork from './ActualFork';

export default {
  name: 'PreviousFork',
  components: { ActualFork },
  created() {
    this.getPreviosFork();
  },
  computed: {
    previousList() {
      const z = this.resultAdapter(this.$store.state.fork.previous);
      return z;
    },
    bkList() {
      return this.$store.state.global.bkList;
    }
  },
  methods: {
    test(e) {
      console.log(e);
    },
    async getPreviosFork() {
      if (this.$data.$api.wsInstance.readyState !== 1) {
        setTimeout(() => {
          this.getPreviosFork();
        }, 100);
      } else {
        this.$store.dispatch('GET_PREVIOUS_FORK', this.$data.$api);
      }
    },
    resultAdapter(arr) {
      const obj = {};
      arr.forEach((item) => {
        const { created_at } = item;
        if (obj[created_at] === undefined) obj[created_at] = [];
        obj[created_at].push(item);
      });

      return Object.values(obj).reverse();
    }
  }
};
</script>

<style lang="scss">
.previos-fork {
  border-top: 1px solid #999999;
  padding-top: var(--base-padding);
  &__title {
    font-weight: bold;
    font-size: calc(var(--base-font-size) * 1.6);
  }
}
</style>
