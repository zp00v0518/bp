<template>
  <div class="match-sport">
    <ElButton class="match-sport__save" type="primary"
      >Сохранить выбор</ElButton
    >
    <ElTabs
      tab-position="top"
      @tab-click="handleTabClick"
      v-model="activeSportTab"
    >
      <ElTabPane
        :label="tab.name"
        v-for="(tab, tabIndex) in sportTypes"
        :key="tabIndex"
      >
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script>
export default {
  name: 'TournamentMatching',
  created() {},
  data() {
    return {
      activeSportTab: '0'
    };
  },
  computed: {
    bkList() {
      return this.$store.state.global.bkList;
    },
    sportTypes() {
      return this.$store.state.sportTypes.sportTypes;
    }
  },
  methods: {}
};
</script>

<style lang="scss">
.match-sport {
  &__save {
    &.el-button {
      margin-bottom: var(--base-padding);
    }
  }
  .el-tabs__item {
    text-transform: capitalize;
  }
}
</style>
