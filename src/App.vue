<template>
  <el-container id="wrapper" direction="vertical">
    <Vheader>Header</Vheader>
    <el-container>
      <el-aside id="aside" v-show="menuContent.length > 0" width="200px"
        ><Menu></Menu
      ></el-aside>
      <el-main>{{ msg }}</el-main>
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
      msg: 'value'
    };
  },
  computed: {
    menuContent() {
      return this.$store.state.menu.content;
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
@media (max-width: $screen-tablet) {
  #aside {
    display: none;
  }
}
</style>
