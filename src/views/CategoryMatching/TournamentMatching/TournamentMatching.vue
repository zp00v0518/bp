<template>
  <div class="match-tournament">
    <ElButton class="match-tournament__save" type="primary"
      >Сохранить выбор</ElButton
    >
    <ElInput
      type="text"
      v-model.lazy="search"
      class="match-tournament--search"
    ></ElInput>
    <ElTabs tab-position="top" v-model="activeSportTab">
      <ElTabPane
        :label="tab.name"
        v-for="(tab, tabIndex) in sportTypes"
        :key="tabIndex"
      >
        <ElTabs tab-position="left" v-model="activeTournamentTab">
          <ElTabPane
            :label="tour.type_name"
            v-for="(tour, tourIndex) in filterTournament"
            :key="tourIndex"
          >
            <table>
              <tbody>
                <tr
                  class="matching_row"
                  v-for="(bkItem, bkIndex) in bkList"
                  :key="bkIndex"
                >
                  <td>
                    <div class="matching_row__name">
                      {{ bkItem.name }}
                      <i class="el-icon-edit" @click="showDialog(bkItem)"></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </ElTabPane>
        </ElTabs>
      </ElTabPane>
    </ElTabs>
  </div>
  <PopupMatchToirnament
    v-if="isShowDialog"
    @close="closeDialog"
    :bkName="bkName"
    :data="popupData"
    :tournametTarget="tournametTarget"
  ></PopupMatchToirnament>
</template>

<script>
import PopupMatchToirnament from './PopupMatchToirnament';

export default {
  name: 'TournamentMatching',
  components: { PopupMatchToirnament },
  data() {
    return {
      tournamentTabs: [],
      activeSportTab: '0',
      activeTournamentTab: '0',
      isShowDialog: false,
      bkName: '',
      popupData: [],
      adaptData: {},
      tournametTarget: '',
      search: ''
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
    tournamentList() {
      const { activeSportTab, sportTypes, baseTournaments } = this;
      const name = sportTypes[activeSportTab].key;
      return baseTournaments[name];
    },
    activeSport() {
      const { sportTypes, activeSportTab } = this;
      return sportTypes[activeSportTab];
    },
    activeTournament() {
      const { filterTournament, activeTournamentTab } = this;
      return filterTournament[activeTournamentTab];
    },
    filterTournament() {
      const { search, tournamentList } = this;
      if (!search) return tournamentList;
      const v = search.toLowerCase();
      return tournamentList.filter((i) =>
        i.type_name.toLowerCase().includes(v)
      );
    }
  },
  created() {
    this.getBkTournaments();
  },
  methods: {
    showDialog(bkItem) {
      const { activeSport, adaptData, activeTournament } = this;
      const sportName = activeSport.name;
      const elem = adaptData[bkItem.id][sportName];
      this.popupData = elem.choices;
      this.bkName = bkItem.name;
      this.tournametTarget = activeTournament.type_name;
      this.isShowDialog = true;
      console.log(this.popupData);
    },
    closeDialog() {
      this.isShowDialog = false;
    },
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
        result[bkId][name_sport].choices.push(item);
      });
      this.adaptData = result;
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
  &--search {
    margin-bottom: var(--base-padding);
  }
  table {
    width: 100%;
  }
}
.matching_row {
  display: flex;
  padding: var(--half-base-padding);
  &__name {
    font-size: 18px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .el-icon-edit {
      cursor: pointer;
      margin-left: var(--base-padding);
    }
  }
}
</style>
