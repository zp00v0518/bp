<template>
  <div class="bk-block">
    <div class="bk-block__name">{{ curBk.name }}</div>
    <div class="bk-block__row">
      Тип ставки:
      <span class=" bk-block__row--value bk-block__bet">{{ data.bet }}</span>
    </div>
    <div class="bk-block__row">
      Коэффициент:
      <span class="bk-block__row--value bk-block__bet">{{ data.coeff }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BkBlock',
  props: {
    data: null
  },
  computed: {
    bkList() {
      return this.$store.state.global.bkList;
    },
    curBk() {
      const { bkList, data } = this;
      return bkList[data.bkId];
    }
  }
};
</script>

<style lang="scss">
.bk-block {
  &__name {
    font-weight: bold;
    text-align: center;
    padding: 0 var(--base-padding);
    margin-bottom: var(--double-step);
  }
  &__row {
    // display: flex;
    margin-bottom: var(--base-step);
		white-space: nowrap;
    &--value {
      margin-left: var(--base-step);
      font-weight: bold;
    }
  }
}
</style>
