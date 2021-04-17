<template>
  <div class="match-tournament">
    <ElButton
      class="match-tournament__save"
      type="primary"
      @click="saveDataOnServer"
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
            <div class="match-tournament__table--wrap">
              <table
                v-if="
                  Object.values(adaptData).length > 0 &&
                    +activeTournamentTab === tourIndex &&
                    +activeSportTab === tabIndex
                "
                class="match-tournament__table"
              >
                <thead>
                  <tr>
                    <th class="match-tournament__table--bk">БК имя</th>
                    <th>Турнир</th>
                    <th>URL</th>
                  </tr>
                </thead>
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
                    <td class="matching_row__tour">
                      {{ getTournamentName(bkItem) }}
                    </td>
                    <td>
                      <a
                        :href="getTournamentUrl(bkItem)"
                        target="_blank"
                        class="a-link matching_row__url"
                        >{{ getTournamentUrl(bkItem) }}</a
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ElTabPane>
        </ElTabs>
      </ElTabPane>
    </ElTabs>
  </div>
  <PopupMatchToirnament
    v-if="isShowDialog"
    @close="closeDialog"
    :editBk="editBk"
    :data="popupData"
    :tournametTarget="tournametTarget"
    @choice="handlerChoice"
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
      editBk: '',
      popupData: [],
      adaptData: {},
      tournametTarget: '',
      search: '',
      dataforSave: {}
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
    getTournamentForView(bkItem) {
      const { activeTournament, dataforSave } = this;
      const activeId = activeTournament._id;
      if (!dataforSave[activeId]) return '';
      const item = dataforSave[activeId].find((i) => i.bkId === bkItem.id);
      if (!item) return '';
      return item;
    },
    getTournamentName(bkItem) {
      const item = this.getTournamentForView(bkItem);
      if (!item) return '';
      return item.name;
    },
    getTournamentUrl(bkItem) {
      const item = this.getTournamentForView(bkItem);
      if (!item) return '';
      return item.url;
    },
    getCurrentDataBK(bkItem) {
      const { activeSport, adaptData } = this;
      const sportName = activeSport.name;
      const elem = adaptData[bkItem.id][sportName];
      return elem;
    },
    showDialog(bkItem) {
      const { activeTournament } = this;
      const elem = this.getCurrentDataBK(bkItem);
      this.popupData = elem.choices;
      this.editBk = bkItem;
      this.tournametTarget = activeTournament.type_name;
      this.isShowDialog = true;
    },
    handlerChoice(ev) {
      this.closeDialog();
      const { activeTournament } = this;
      const idTournament = activeTournament._id;
      if (!this.dataforSave[idTournament]) this.dataforSave[idTournament] = [];
      const { value, bk } = ev;
      const elem = this.getCurrentDataBK(bk);
      const item = elem.choices.find((i) => i._id === value);
      const index = this.dataforSave[idTournament].findIndex(
        (i) => i.bkId === item.bkId
      );
      if (index > -1) {
        this.dataforSave[idTournament].splice(index, 1);
      }
      this.dataforSave[idTournament].push(item);
    },
    closeDialog() {
      this.isShowDialog = false;
      document.body.classList.remove('el-popup-parent--hidden');
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
    },
    async saveDataOnServer() {
      const { dataforSave } = this;
      const copy = JSON.parse(JSON.stringify(dataforSave));
      Object.keys(copy).forEach((key) => {
        const item = copy[key];
        copy[key] = item.map((i) => i._id);
      });
      const { $api, $message } = this.$data;
      if (Object.keys(copy).length === 0) {
        $message.error('Ничего не выбрано');
        return;
      }
      if ($api.wsInstance.readyState !== 1) {
        $message.error('Связь утеряна');
        return;
      }
      const message = {
        type: '/saveMatchedTournaments',
        data: copy
      };
      const response = await $api.get(message);
      console.log(response);
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
  &__table {
    &--wrap {
      overflow-x: auto;
    }
    &--bk {
      width: 100px;
    }
  }
}
.matching_row {
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
  &__tour {
    min-width: 200px;
  }

  td {
    padding: var(--half-base-padding);
    text-align: left;
  }
}
</style>
