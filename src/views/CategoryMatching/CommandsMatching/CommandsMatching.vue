<template>
  <div class="match-tournament match-tournament-commands">
    <ElButton
      class="match-tournament__save"
      type="primary"
      @click="saveDataOnServer"
    >
      Сохранить выбор
    </ElButton>
    <ElInput
      type="text"
      v-model.lazy="search"
      class="match-tournament--search"
    ></ElInput>

    <ElTabs
      tab-position="top"
      v-model="activeSportTab"
      ref="container"
      type="card"
    >
      <ElTabPane
        :label="tab.name"
        v-for="(tab, tabIndex) in sportTypes"
        :key="tabIndex"
      >
        <ElTabs
          tab-position="top"
          v-model="activeTournamentTab"
          class="match-tournament__second"
          @tab-click="changeTournaments"
        >
          <ElTabPane
            v-for="(tour, tourIndex) in filterTournament"
            :key="tourIndex"
            :label="tour.type_name"
          >
            <!-- ********************************* -->
            <ElTabs
              tab-position="left"
              editable
              @tab-add="addTabHandler"
              v-if="
                +activeTournamentTab === tourIndex &&
                  +activeSportTab === tabIndex
              "
            >
              <ElTabPane
                v-for="(baseCommand, baseCommandIndex) in baseCommands"
                :key="baseCommandIndex"
                :label="baseCommand.name"
              >
                <template #label v-if="baseCommand.isNew">
                  <ElInput type="text" v-model="baseCommand.name"></ElInput>
                </template>

                <div class="match-tournament__table--wrap">
                  <table>
                    <thead>
                      <tr>
                        <th class="match-tournament__table--bk">Название БК</th>
                        <th>Имя команды</th>
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
                          </div>
                        </td>
                        <td>
                          <div class="matching_row__command">
                            <ElSelect
                              v-model="baseCommand.commands[bkItem.id].value"
                              filterable
                            >
                              <ElOption
                                v-for="(BKCommand,
                                BKCommandIndex) in BKCommands[bkItem.id]"
                                :key="BKCommandIndex"
                                :label="BKCommand.name"
                                :value="BKCommand._id"
                              ></ElOption>
                            </ElSelect>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </ElTabPane>
            </ElTabs>
            <!-- ******************************** -->
          </ElTabPane>
        </ElTabs>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script>
import matchMixin from '../matchMixin';

export default {
  name: 'CommandsMatching',
  mixins: [matchMixin],
  data() {
    return {
      loading: null,
      BKCommands: [],
      baseCommands: []
    };
  },
  created() {},
  methods: {
    saveDataOnServer(e) {
      console.log(this.BKCommands);
      console.log(this.baseCommands);
    },
    addTabHandler() {
      const { activeTournament } = this;
      const template = {
        name: '',
        isNew: true,
        tournamet_type: activeTournament._id,
        commands: this.commandsField()
      };
      this.baseCommands.unshift(template);
    },
    commandsField() {
      const { bkList } = this;
      const result = {};
      Object.values(bkList).forEach((item) => {
        const { id } = item;
        result[id] = {
          value: ''
        };
      });
      return result;
    },
    showLoading() {
      this.loading = this.$data.$loading.service({
        target: '.el-main',
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    },
    hideLoading() {
      if (!this.loading) return;
      this.loading.close();
    },
    async changeTournaments() {
      const data = await this.getListCommands();
    },
    async getListCommands() {
      const { activeTournament, $data } = this;
      const { $api } = $data;
      const message = {
        type: '/getBaseCommand',
        tournamet_id: activeTournament._id
      };
      const response = await $api.get(message);
      const { baseCommands, BKCommands } = response;
      this.baseCommands = baseCommands;
      this.BKCommands = this.adapterBKCommands(BKCommands);
    },
    adapterBKCommands(arr) {
      const obj = {};
      arr.forEach((item) => {
        const { bkId } = item;
        if (!obj[bkId]) obj[bkId] = [];
        obj[bkId].push(item);
      });
      return obj;
    }
  }
};
</script>

<style lang="scss">
.match-tournament {
  &__second {
    .el-tabs__item {
      white-space: normal;
      width: 130px;
      line-height: 1.5em;
      height: auto;
      vertical-align: top;
    }
  }
  &-commands {
    .el-tabs__nav.is-left {
      .el-tabs__item {
        position: relative;
        padding-right: calc(var(--base-padding) * 1.2) !important;
        align-items: center;
        min-width: 240px;
        .el-icon-close {
          position: absolute;
          right: 10px;
          display: inline-table;
          transition: all 0.1s;
        }
      }
    }
  }
}
.matching_row {
  &__command {
    text-align: center;
  }
}
</style>
