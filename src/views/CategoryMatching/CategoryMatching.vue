<template>
  <ElTabs tab-position="top" @tab-click="handleTabClick">
    <ElTabPane
      :label="tab.name"
      v-for="(tab, tabIndex) in tabs"
      :key="tabIndex"
      >{{ tab.name }}</ElTabPane
    >
  </ElTabs>
</template>

<script>
export default {
  name: 'CategoryMatching',
  created() {
    this.getListCategory();
  },
  data() {
    return {
      tabs: [],
      activeTab: '0'
    };
  },
  computed: {
    bkList() {
      return this.$store.state.global.bkList;
    }
  },
  methods: {
    handleTabClick({ index }) {
      this.activeTab = index;
      console.log(this.bkList);
    },
    async getListCategory() {
      if (this.$data.$api.wsInstance.readyState !== 1) {
        setTimeout(() => {
          this.getListCategory();
        }, 100);
      } else {
        const response = await this.$data.$api.get({
          type: '/getListSportCategory'
        });
        this.tabs = response.data;
      }
    }
  }
};
</script>

<style lang="scss"></style>
