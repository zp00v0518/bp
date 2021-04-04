<template>
  <el-menu
    class="bp-menu"
    :collapse="isCollapse"
    :default-active="defaultActive"
  >
    <template v-for="(item, itemIndex) in menuContent">
      <el-submenu v-if="item.children" :key="itemIndex">
        <template #title>
          <span class="bp-menu__title">{{ item.title }}</span>
        </template>
        <el-menu-item
          v-for="(child, childIndex) in item.children"
          :key="childIndex"
          :index="child.url"
        >
          <template #title>
            <router-link class="bp-menu__link" :to="child.url">{{
              child.title
            }}</router-link>
          </template>
        </el-menu-item>
      </el-submenu>

      <el-menu-item v-else :key="itemIndex + 1" :index="item.url">
        <template #title>
          <router-link class="bp-menu__link" :to="item.url">{{
            item.title
          }}</router-link>
        </template>
      </el-menu-item>
    </template>
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
    },
    defaultActive() {
      return location.pathname;
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
  // .el-menu-item {
  //   text-transform: capitalize;
  // }
  &__title {
    text-transform: capitalize;
    font-size: calc(var(--base-font-size) + 2px);
  }
  &__link {
    font-size: calc(var(--base-font-size) + 2px);
    width: 100%;
    height: 100%;
    display: block;
    text-transform: capitalize;
  }
}
</style>
