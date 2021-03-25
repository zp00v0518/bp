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
      <BkBlock :data="data.firstBk"></BkBlock>
      <div  class="fork-item__main__icon"><img :src="Pic" /></div>
      <BkBlock :data="data.secondBk"></BkBlock>
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
  created() {
    console.log(this.data);
  },
  data() {
    return {
      Pic
    };
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
.fork-item {
  border: 1px solid;
  display: flex;
  &__info {
    border-right: 1px solid;
    padding: var(--base-padding) var(--half-base-padding);
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
</style>
