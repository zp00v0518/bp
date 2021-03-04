<template>
  <el-header class="app-header" height="">
    <Icon
      v-if="menuContent.length > 0"
      name="gamburger"
      class="app-header__icon"
      @click="handlerClickOnGamberger"
    ></Icon>
  </el-header>
</template>

<script>
export default {
  name: 'Vheader',
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
    height: 73px;
  }
  &__icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: none;
  }
}
@media (max-width: 768px) {
  .app-header__icon {
    display: block;
  }
}
</style>
