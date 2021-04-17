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
    <ElTabs tab-position="top" v-model="activeSportTab" ref="container">
      <ElTabPane
        :label="tab.name"
        v-for="(tab, tabIndex) in sportTypes"
        :key="tabIndex"
      >
        <ElTabs
          tab-position="left"
          v-model="activeTournamentTab"
          @tab-click="handlerClickOnTabTournament"
        >
          <ElTabPane
            v-for="(tour, tourIndex) in filterTournament"
            :key="tourIndex"
          >
            <template #label>
              <span class="match-tournament__item"
                ><span>{{ tour.type_name }}</span>
                <span
                  v-if="dataforSave[tour._id]"
                  class="match-tournament__item--count"
                  >{{ dataforSave[tour._id].length }}</span
                >
              </span>
            </template>

            <div class="match-tournament__table--wrap">
              <table
                v-if="
                  isReadyComponent &&
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
      dataforSave: {},
      isReadyComponent: false,
      firstData: []
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
    handlerClickOnTabTournament() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.scrollContent();
        }, 0);
      });
    },
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
      if (!elem) {
        this.$data.$message.error('Нет наборов для данного спорта');
        return;
      }
      this.popupData = elem.choices;
      this.editBk = bkItem;
      this.tournametTarget = activeTournament.type_name;
      this.isShowDialog = true;
    },
    handlerChoice(ev) {
      this.closeDialog();
      const { activeTournament } = this;
      const idTournament = activeTournament._id;
      const { value } = ev;
      this.setValueInStore(idTournament, value);
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
        this.firstData = response.data;
        this.adaptDataForTable(response.data);
      }
    },
    adaptDataForTable(data) {
      const { bkList } = this;
      const result = {};
      data.forEach((item) => {
        const { bkId, name_sport, tournament_type } = item;
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
        if (tournament_type) {
          this.setValueInStore(tournament_type, item._id);
        }
      });
      this.adaptData = result;
      this.isReadyComponent = true;
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
      await $api.get(message);
    },
    setValueInStore(tourId, setId) {
      const { dataforSave, firstData } = this;
      if (!dataforSave[tourId]) dataforSave[tourId] = [];
      const item = firstData.find((i) => i._id === setId);
      const index = dataforSave[tourId].findIndex((i) => i.bkId === item.bkId);
      if (index > -1) {
        dataforSave[tourId].splice(index, 1);
      }
      dataforSave[tourId].push(item);
    },
    scrollContent() {
      const ref = this.$refs.container.$el;
      const item = ref.querySelector('.match-tournament__table--wrap table');
      const elemStyle = item.getBoundingClientRect();
      if (elemStyle.top <= 0) {
        // item.scrollIntoView({
        //   behavior: 'smooth',
        //   block: 'start'
        // });
        item.scrollIntoView(true);
        document.scrollingElement.scrollTop -= 200;
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
    max-width: 230px;
    .el-tabs__item {
      white-space: normal;
      height: unset;
      line-height: unset;
      padding-bottom: 24px;
      padding-left: 24px;
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
  &__item {
    position: relative;
    &--count {
      position: absolute;
      transform: translate(-34px, 1px);
      left: 0;
      top: 0;
      color: white;
      margin-left: var(--double-step);
      background-color: var(--color-theme-4);
      border-radius: 50%;
      width: 12px;
      height: 12px;
      display: inline-block;
      text-align: center;
      padding: var(--base-step);
      font-weight: bold;
      font-size: 12px;
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