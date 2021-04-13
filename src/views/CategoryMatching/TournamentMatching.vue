<template>
  <div class="match-tournament">
    <ElButton class="match-tournament__save" type="primary"
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
        <ElTabs
          tab-position="left"
          v-model="activeTournamentTab"
          class="match-tournament__tabs-left"
        >
          <ElTabPane
            :label="tournamentTab.type_name"
            v-for="(tournamentTab, tournamentTabIndex) in activeBaseTournament"
            :key="tournamentTabIndex"
          >
          </ElTabPane
        ></ElTabs>
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
      activeSportTab: '0',
      activeTournamentTab: '0',
      timeout: null
    };
  },
  computed: {
    bkList() {
      return this.$store.state.global.bkList;
    },
    sportTypes() {
      return this.$store.state.sportTypes.sportTypes;
    },
    baseTournaments() {
      return this.$store.state.tournaments.baseTournaments;
    },
    activeBaseTournament() {
      const { activeSportTab, sportTypes, baseTournaments } = this;
      const name = sportTypes[activeSportTab].key;
      return baseTournaments[name];
    }
  },
  created() {
    this.getBkTournaments();
  },
  methods: {
    async getBkTournaments() {
      const api = this.$data.$api;
      if (api.wsInstance.readyState !== 1) {
        setTimeout(() => {
          this.getBkTournaments();
        }, 20);
      } else {
        const response = await api.get({ type: '/getBkTournaments' });
        console.log(response);
      }
    }
  }
};
</script>

<style lang="scss">
.match-tournament {
  &__save {
    &.el-button {
      margin-bottom: var(--base-padding);
    }
  }
  .el-tabs__item {
    text-transform: capitalize;
  }
  .el-tabs__nav.is-left {
    max-width: 200px;
    .el-tabs__item {
      white-space: normal;
      height: unset;
      line-height: unset;
      padding-bottom: 24px;
    }
  }
}
</style>
