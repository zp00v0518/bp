<template>
  <el-header class="app-header" height="">
    <div class="app-header__left">
      <Icon
        v-if="menuContent.length > 0"
        name="gamburger"
        class="app-header__icon"
        @click="handlerClickOnGamberger"
      ></Icon>
      <router-link to="/">Home</router-link>
    </div>
    <!-- <Donate/> -->
    <div class="app-header__right">
      <CheckFork></CheckFork>
    </div>
  </el-header>
</template>

<script>
import CheckFork from './moleculs/CheckFork';
import Donate from './moleculs/Donate'

export default {
  name: 'Vheader',
  components: { CheckFork, Donate },
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
    line-height: unset;
  }
  &__icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
    display: none;
  }
}
</style>
