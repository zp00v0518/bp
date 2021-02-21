<template>
  <ElDrawer v-model="isShow" @close="handleClose" :direction="'ltr'"></ElDrawer>
</template>

<script>
export default {
  name: 'Drawer',
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
