<template>
  <div class="bk-block" :class="{ 'bk-block--right': right }">
    <a :href="data.url || '/'" class="bk-block__name a-link" target="_blank">
      {{ curBk.name }}
    </a>
    <div class="bk-block__row ">
      <span class="bk-block__row--label">Тип ставки</span>
      <span class="bk-block__row--value bk-block__bet type-bet">
        {{ $t(data.bet) }} <span v-if="allFork.total">{{ allFork.total }} </span>
      </span>
    </div>
    <div class="bk-block__row">
      <span class="bk-block__row--label">Коэффициент</span>
      <span class="bk-block__row--value bk-block__bet">{{ Number(data.coeff).toFixed(2) }}</span>
    </div>
    <div class="bk-block__row">
      <span class="bk-block__row--label">Размер ставки</span>
      <ElInputNumber
        class="bk-block__row--value bk-block__bet"
        size="mini"
        min="1"
        v-model="sum"
        :precision="2"
        :controls="false"
        @change="handlerChange"
      ></ElInputNumber>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BkBlock',
  emits: ['change'],
  props: {
    data: { type: Object, default: () => ({ coeff: 0 }) },
    allFork: { type: Object, default: () => ({}) },
    right: { type: Boolean, default: false },
    betSum: { type: Number, default: 1 }
  },

  data() {
    return {
      sum: this.betSum
    };
  },
  watch: {
    betSum: function(e) {
      this.sum = e;
    }
  },
  computed: {
    bkList() {
      return this.$store.state.global.bkList;
    },
    curBk() {
      const { bkList, data } = this;
      return bkList[data.bkId];
    }
  },
  methods: {
    handlerChange() {
      this.$emit('change-sum', { value: this.sum, right: this.right });
    }
  }
};
</script>

<style lang="scss">
.bk-block {
  &__name {
    font-weight: bold;
    font-size: calc(var(--base-font-size) * 1.4);
    text-align: center;
    padding: 0 var(--base-padding);
    margin-bottom: var(--double-step);
    display: block;
  }
  &__row {
    margin-bottom: var(--double-step);
    white-space: nowrap;
    display: flex;
    &--value {
      margin-left: var(--half-base-padding);
      font-weight: bold;

      &.type-bet {
        font-style: italic;
        text-decoration: underline;
      }
    }
    &--label {
      position: relative;
      display: flex;
      align-items: center;
      &:before {
        content: ':';
        position: absolute;
        right: calc(var(--base-step) - var(--base-step) * 2.5);
      }
    }
  }
  &--right {
    .bk-block__row {
      // display: flex;
      flex-direction: row-reverse;
    }
    .bk-block__row--value {
      margin-right: var(--half-base-padding);
      margin-left: 0px;
    }
    .bk-block__row--label {
      &:before {
        left: calc(var(--base-step) - var(--base-step) * 2.5);
        right: unset;
      }
    }
  }
}
</style>
