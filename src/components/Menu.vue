<template>
  <el-menu
    class="el-menu-vertical-demo bp-menu"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <el-menu-item
      v-for="(item, itemIndex) in menuContent"
      :key="itemIndex"
      :index="itemIndex"
    >
      <template #title>
        <router-link class="bp-menu__link" :to="item.url">{{
          item.title
        }}</router-link>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      timer: null,
      menu: []
    };
  },
  created() {
    this.getMenu();
  },
  computed: {
    menuContent() {
      return this.$store.state.menu.content;
    }
  },
  methods: {
    async getMenu() {
      if (this.$data.$api.wsInstance.readyState !== 1) {
        setTimeout(() => {
          this.getMenu();
        }, 100);
      } else {
        const response = await this.$data.$api.get({ type: '/getMenu' });
        this.$store.commit('SET_MENU_CONTENT', response.data);
      }
    }
  }
};
</script>

<style lang="scss">
.bp-menu {
  .el-menu-item {
    text-transform: capitalize;
  }
  &__link {
    font-size: 18px;
    width: 100%;
    height: 100%;
    display: block;
  }
}
</style>
