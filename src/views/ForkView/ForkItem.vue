<template>
  <div class="fork-item">
    <div class="fork-item__info">
      <div class="fork-item__info__title">
        <!-- <span>Доходность:</span> -->
        <span title="Коэффициент доходности">{{ data.marga.toFixed(4) }}</span>
      </div>
      <div class="fork-item__info__commands">
        <span>{{ data.command_1 }}</span>
        <span>{{ data.command_2 }}</span>
      </div>
      <div class="fork-item__info--date">{{ getFindDate(data.eventDate) }}</div>
    </div>
    <div class="fork-item__main">
      <BkBlock
        :data="data.firstBk"
        @change-sum="handlerChange"
        :betSum="firstBkBet"
      ></BkBlock>
      <div class="fork-item__main__icon"><img :src="Pic" /></div>
      <BkBlock
        :data="data.secondBk"
        right
        @change-sum="handlerChange"
        :betSum="secondBkBet"
      ></BkBlock>
    </div>
    <div class="fork-item__profit--wrap">
      <div class="fork-item__profit">
        Прибыль: <span class="fork-item__profit--sum">{{ profit_1 }}</span>
      </div>
      <div class="fork-item__profit">
        Прибыль: <span class="fork-item__profit--sum">{{ profit_2 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import BkBlock from './BkBlock';
import Pic from '../../assets/images/double arrow_4.png';

export default {
  name: 'ForkItem',
  components: { BkBlock },
  props: {
    data: null
  },
  data() {
    return {
      Pic,
      firstBkBet: 100,
      secondBkBet: 0
    };
  },
  computed: {
    profit_1() {
      return this.getProfit();
    },
    profit_2() {
      return this.getProfit(true);
    }
  },
  methods: {
    getProfit(second) {
      const { data, firstBkBet, secondBkBet } = this;
      const { firstBk, secondBk } = data;
      let value = 0;
      if (second) {
        value = +secondBk.coeff * secondBkBet - firstBkBet;
      } else {
        value = +firstBk.coeff * firstBkBet - secondBkBet;
      }
      return Math.abs(value).toFixed(2);
    },
    getFindDate(value) {
      const z = new Date(value);
      var options = { hour: 'numeric', minute: 'numeric' };
      const date = z.toLocaleDateString(undefined, options);
      return date;
    },
    handlerChange(ev) {
      const { data } = this;
      const { value, right } = ev;
      if (!right) {
        this.firstBkBet = value;
        this.secondBkBet = this.checkSizeBet(
          this.firstBkBet,
          data.firstBk.coeff,
          data.secondBk.coeff
        );
        return;
      }
      this.secondBkBet = value;

      this.firstBkBet = this.checkSizeBet(
        this.secondBkBet,
        data.secondBk.coeff,
        data.firstBk.coeff
      );
    },
    checkSizeBet(baseBet = 100, coeff1, coeff2) {
      return (coeff1 / coeff2) * baseBet;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.handlerChange({ value: this.firstBkBet });
    });
  }
};
</script>

<style lang="scss">
.fork-item {
  border: 1px solid;
  display: flex;
  flex-direction: column;
  &__info {
    border-bottom: 1px solid;
    padding: var(--half-base-padding);
    &__title {
      display: flex;
      flex-direction: column;
      color: tomato;
      span {
        text-align: center;
        font-size: calc(var(--base-font-size) + 4px);
        font-weight: bold;
        // &:first-child{
        // 	margin-bottom: var(--double-step);
        // }
      }
    }
    &__commands {
      margin-top: var(--half-base-padding);
      margin-bottom: var(--half-base-padding);
      white-space: nowrap;
      text-align: center;
      span {
        &:first-child {
          margin-right: calc(var(--base-padding) * 2);
        }
      }
    }
    &--date {
      text-align: center;
      font-weight: bold;
    }
  }
  &__main {
    padding: var(--half-base-padding);
    display: flex;
    justify-content: space-between;
    &__icon {
      width: 20px;
      height: auto;
      background-color: white;
      display: flex;
      align-items: center;
      margin: var(--half-base-padding) var(--base-padding);
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
  &__profit {
    &--sum {
      font-weight: bold;
    }
    &--wrap {
      padding: var(--half-base-padding);
      padding-top: 0;
      display: flex;
      justify-content: space-between;
    }
  }
}
@media (max-width: $phone) {
  .fork-item__main {
    flex-direction: column;
    align-items: center;
  }
  .bk-block--right {
    .bk-block__row {
      flex-direction: unset;
    }
    .bk-block__row--label {
      &:before {
        left: unset;
        right: calc(var(--base-step) - var(--base-step) * 2.5);
      }
    }
    .bk-block__row--value {
      margin-right: 0;
      margin-left: var(--half-base-padding);
    }
  }
}
</style>
