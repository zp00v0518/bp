<template>
  <el-header class="app-header" height="">
    <div class="app-header__left">
      <Icon
        v-if="menuContent.length > 0"
        name="gamburger"
        class="app-header__icon"
        @click="handlerClickOnGamberger"
      ></Icon>
    </div>
    <div class="app-header__right">
      <CheckFork></CheckFork>
    </div>
  </el-header>
</template>

<script>
import CheckFork from './moleculs/CheckFork';

export default {
  name: 'Vheader',
  components: { CheckFork },
  computed: {
    menuContent() {
      return this.$store.state.menu.content;
    }
  },
  methods: {
    handlerClickOnGamberger() {
      this.$store.commit('SHOW_DRAWER');
    }
  }
};
</script>

<style lang="scss">
.app-header {
  justify-content: space-between;
  display: flex;
  &.el-header {
    padding: var(--base-padding);
    // height: 73px;
    line-height: unset;
    // background-color: var(--color-theme-4);
  }
  &__icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: none;
  }
  &__right {
  }
}
@media (max-width: 768px) {
  .app-header__icon {
    display: block;
  }
}
</style>
