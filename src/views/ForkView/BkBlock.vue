<template>
  <div class="bk-block" :class="{ 'bk-block--right': right }">
    <a :href="data.url || '/'" class="bk-block__name a-link" target="_blank">
      {{ curBk.name }}
    </a>
    <div class="bk-block__row">
      <span class="bk-block__row--label">Тип ставки</span>
      <span class="bk-block__row--value bk-block__bet">{{ data.bet }}</span>
    </div>
    <div class="bk-block__row">
      <span class="bk-block__row--label">Коэффициент</span>
      <span class="bk-block__row--value bk-block__bet">{{ data.coeff }}</span>
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
    data: null,
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
    }
    &--label {
      position: relative;
      display: flex;
      align-items: center;
      &:before {
        content: ':';
        // color: red;
        position: absolute;
        right: calc(var(--base-step) - var(--base-step) * 2.5);
        // font-size: 20px;
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
