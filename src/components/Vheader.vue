<template>
  <el-header class="app-header" height="">
    <Icon name="gamburger" class="app-header__icon"></Icon>
  </el-header>
</template>

<script>
export default {
  name: 'Vheader'
};
</script>

<style lang="scss">
.app-header {
  justify-content: space-between;
  display: flex;
  &.el-header {
    padding: var(--base-padding);
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
