<template>
  <div @mouseenter="handlerMouseEnter" @mouseleave="visible = false">
    <ElPopover
      popper-class="check-btn"
      :content="tooltip"
      width="90px"
      :disabled="!disabled"
      v-model:visible="visible"
    >
      <template #reference>
        <ElButton
          :type="disabled ? 'info' : 'default'"
          round
          :disabled="disabled"
          class="check-btn__item"
          @click="handlerClick"
          >{{ title }}</ElButton
        >
      </template>
      <span class="check-btn__tooltip">{{ tooltip }}</span>
    </ElPopover>
  </div>
</template>

<script>
import { goToUrl } from '../../../utils';

export default {
  name: 'CheckFork',
  data() {
    return {
      title: 'Найти вилку',
      disabled: false,
      tooltip: 'Новые данные отсутствуют',
      visible: false
    };
  },
  methods: {
    handlerMouseEnter() {
      const { disabled } = this;
      this.visible = !disabled ? false : true;
    },
    async handlerClick() {
      const response = await this.$data.$api.get({ type: '/getActualFork' });
      const { data } = response;
      this.$store.commit('SET_CURRENT_FORK', data.result);
      if (location.pathname !== '/') goToUrl('/');
    }
  }
};
</script>

<style lang="scss">
.el-popover {
  &.check-btn {
    display: flex;
    flex-direction: column;
    &.el-popper {
      min-width: unset;
    }
    .check-btn__tooltip {
      text-align: unset;
      word-break: normal;
    }
  }
}
</style>
