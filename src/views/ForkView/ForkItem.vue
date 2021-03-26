<template>
  <div class="fork-item">
    <div class="fork-item__info">
      <div class="fork-item__info__title">
        <!-- <span>Доходность:</span> -->
        <span title="Доходность">{{ data.marga.toFixed(4) }}</span>
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
        :betSum="firstBk"
      ></BkBlock>
      <div class="fork-item__main__icon"><img :src="Pic" /></div>
      <BkBlock
        :data="data.secondBk"
        right
        @change-sum="handlerChange"
        :betSum="secondBk"
      ></BkBlock>
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
      firstBk: 10,
      secondBk: 20
    };
  },
  methods: {
    getFindDate(value) {
      const z = new Date(value);
      var options = { hour: 'numeric', minute: 'numeric' };
      const date = z.toLocaleDateString(undefined, options);
      return date;
    },
    handlerChange(ev) {
      const { value, right } = ev;
      if (!right) {
        this.secondBk = 3333;
        return;
      }
      this.firstBk = 1111;
    },
    checkSizeBet() {}
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
    // width: 100%;
    padding: var(--half-base-padding);
    display: flex;
    justify-content: space-between;
    &__icon {
      width: 20px;
      height: auto;
      background-color: white;
      display: flex;
      align-items: center;
      margin: 0 var(--base-padding);
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
}
@media (max-width: $phone) {
// @media (max-width: $tablet-medium) {
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
