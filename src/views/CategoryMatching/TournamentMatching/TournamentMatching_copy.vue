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
            <table>
              <thead>
                <tr>
                  <th v-for="(col, colIndex) in columns" :key="colIndex">
                    {{ col.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, itemIndex) in tableData" :key="itemIndex">
                  <td>
                    {{ item.bkName }}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </ElTabPane>
        </ElTabs>
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
      timeout: null,
      tableData: {},
      columns: [
        { field: 'bkName', title: 'Контора' },
        { title: 'Турнир' },
        { title: 'Ссылка' }
      ]
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
    },
    activeSport() {
      const { sportTypes, activeSportTab } = this;
      return sportTypes[activeSportTab];
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
        this.adaptDataForTable(response.data);
      }
    },
    adaptDataForTable(data) {
      const { bkList } = this;
      const result = {};
      data.forEach((item) => {
        const { bkId, name_sport } = item;
        if (!result[bkId]) {
          result[bkId] = {
            bkName: bkList[bkId].name
          };
        }
        if (!result[bkId][name_sport]) {
          result[bkId][name_sport] = {
            choices: [],
            choiced: '',
            url: ''
          };
        }
        // result[bkId][name_sport].choices.push(item);
      });
      console.log(result);
      this.tableData = result;
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
