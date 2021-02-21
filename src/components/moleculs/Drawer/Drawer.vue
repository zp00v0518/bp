<template>
  <ElDrawer v-model="isShow" @close="handleClose" :direction="'ltr'">
    <Menu></Menu>
  </ElDrawer>
</template>

<script>
import Menu from '../../Menu';

export default {
  name: 'Drawer',
  components: { Menu },
  data() {
    return {
      isShow: false
    };
  },
  watch: {
    '$store.state.drawer.show': function(e) {
      this.isShow = e;
    }
  },
  methods: {
    handleClose() {
      this.$store.commit('HIDE_DRAWER');
    }
  }
};
</script>

<style lang="scss"></style>
