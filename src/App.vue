<template>
  <el-container id="wrapper" direction="vertical">
    <Vheader>Header</Vheader>
    <el-container>
      <el-aside id="aside" v-show="menuContent.length > 0" width="150px"
        ><Menu></Menu
      ></el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  <Drawer></Drawer>
</template>

<script>
import Menu from './components/Menu';
import Vheader from './components/Vheader';
import Drawer from './components/moleculs/Drawer';

export default {
  name: 'App',
  components: { Menu, Vheader, Drawer },
  data() {
    return {
      msg: ''
    };
  },
  created() {
    this.initApp();
  },
  computed: {
    menuContent() {
      return this.$store.state.menu.content;
    }
  },
  methods: {
    async initApp() {
      if (this.$data.$api.wsInstance.readyState !== 1) {
        setTimeout(() => {
          this.initApp();
        }, 20);
      } else {
        const api = this.$data.$api;
        this.$store.dispatch('GET_BK_LIST', api);
        this.$store.dispatch('GET_SPORT_TYPES', api);
        this.$store.dispatch('GET_APP_TOURNAMENT', api);
      }
    }
  }
};
</script>

<style lang="scss">
@import './assets/style/app.scss';
#wrapper {
  height: 100%;
}
#aside {
  background-color: white;
}

.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  // background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
@media (max-width: $tablet) {
  #aside {
    display: none;
  }
  .app-header__icon {
    display: block;
  }
}

</style>
