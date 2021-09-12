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
            :label="tour.name"
          >
            <!-- ********************************* -->
            <ElTabs
              tab-position="left"
              editable
              @tab-add="addTabHandler"
              v-if="
                isReady &&
                  +activeTournamentTab === tourIndex &&
                  +activeSportTab === tabIndex
              "
            >
              <ElTabPane
                v-for="(baseCommand, baseCommandIndex) in baseCommands"
                :key="baseCommandIndex"
                :label="baseCommand.name"
              >
                <!-- <template #label v-if="baseCommand.isNew">
                  <ElInput type="text" v-model="baseCommand.name"></ElInput>
                </template> -->
                <template #label>
                  <template v-if="baseCommand.isNew">
                    <ElInput type="text" v-model="baseCommand.name"></ElInput
                  ></template>
                  <div class="match-tournament__item" v-else>
                    {{ baseCommand.name }}
                    <span
                      class="match-tournament__item--count"
                      :class="{ 'is-full': isFullCommands(baseCommand) }"
                      >{{ getCountCommands(baseCommand) }}</span
                    >
                  </div>
                </template>

                <div class="match-tournament__table--wrap">
                  <table>
                    <thead>
                      <tr>
                        <th class="match-tournament__table--bk">Название БК</th>
                        <th>Имя команды</th>
                        <th>ID команды</th>
                        <th>ID базовое</th>
                        <th>ID турнира (app)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="matching_row"
                        v-for="(bkItem, bkIndex) in bkList"
                        :key="bkIndex + tour._id"
                      >
                        <td>
                          <div class="matching_row__name">
                            {{ bkItem.name }}
                          </div>
                        </td>
                        <td>
                          <div class="matching_row__command">
                            <template
                              v-if="
                                baseCommand.isNew ||
                                  baseCommand.commands[bkItem.id].isNew
                              "
                            >
                              <ElSelect
                                v-model="baseCommand.commands[bkItem.id].value"
                                filterable
                              >
                                <template
                                  v-for="(BKCommand,
                                  BKCommandIndex) in BKCommands[bkItem.id]"
                                >
                                  <ElOption
                                    :key="BKCommandIndex"
                                    :label="BKCommand.name"
                                    :value="BKCommand._id"
                                    v-if="!BKCommand.ref_command_bk"
                                  ></ElOption>
                                </template>
                              </ElSelect>
                            </template>
                            <template v-else>
                              <div class="matching_row__command--name">
                                {{
                                  getRealCommandByBK(bkItem.id, baseCommand._id)
                                    .name
                                }}
                              </div>
                            </template>
                          </div>
                        </td>
                        <td class="matching_row__command--id">
                          {{
                            getRealCommandByBK(bkItem.id, baseCommand._id)._id
                          }}
                        </td>
                        <td class="matching_row__command--id">
                          {{ baseCommand._id }}
                        </td>
                        <td class="matching_row__command--id">
                          {{ tour._id }}
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
      baseCommands: [],
      isReady: false
    };
  },
  methods: {
    isFullCommands(baseCommand) {
      const { bkList } = this;
      const count = this.getCountCommands(baseCommand);
      return count === Object.keys(bkList).length;
    },
    getCountCommands(baseCommand) {
      let z = Object.values(baseCommand.commands).map((i) => i.value);
      z = z.filter((i) => !!i);
      return z.length;
    },
    async saveDataOnServer() {
      const { baseCommands, $data } = this;
      const { $api, $message } = $data;
      if (Object.keys(baseCommands).length === 0) {
        $message.warning('Ничего не выбрано');
        return;
      }
      if (!this.checkNames()) {
        $message.error('Какая-то из команд без имени');
        return;
      }
      const copyCommand = JSON.parse(JSON.stringify(baseCommands));
      copyCommand.forEach((item) => {
        if (item.isNew) item.name = item.name.trim();
      });
      const message = {
        type: '/saveMatchedCommand',
        commands: copyCommand
      };
      const response = await $api.get(message);
      if (response.status) {
        await this.getListCommands();
      } else {
        $message.error('Данные не сохранились. На сервере что-то пошло не так');
      }
    },
    checkExistsName() {
      const { baseCommands } = this;
      const flag = Object.values(baseCommands).every((i) => i.name);
      return flag;
    },
    checkNames() {
      const { baseCommands } = this;
      const flag = Object.values(baseCommands).every((i) => i.name);
      return flag;
    },
    addTabHandler() {
      const { activeTournament } = this;
      const template = {
        name: '',
        isNew: true,
        tournament_type: activeTournament._id,
        commands: this.commandsField()
      };
      this.baseCommands.unshift(template);
    },
    commandsField(commandId) {
      const { bkList, getRealCommandByBK } = this;
      const result = {};
      Object.values(bkList).forEach((item) => {
        const { id } = item;
        result[id] = {
          value:
            commandId !== undefined ? getRealCommandByBK(id, commandId)._id : ''
        };
        if (!result[id].value) result[id].isNew = true;
      });
      return result;
    },
    getRealCommandByBK(bkId, commandId) {
      const { BKCommands } = this;
      const item = BKCommands[bkId];
      let el = {};
      if (!item) return el;
      el = item.find((i) => i.ref_command_bk === commandId);
      return el || {};
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
      await this.getListCommands();
    },
    async getListCommands() {
      this.isReady = false;
      const { activeTournament, $data } = this;
      const { $api } = $data;
      const message = {
        type: '/getBaseCommand',
        tournamet_id: activeTournament._id
      };
      const response = await $api.get(message);
      const { baseCommands, BKCommands } = response;
      this.BKCommands = this.adapterBKCommands(BKCommands);
      this.baseCommands = this.adabterBaseCommand(baseCommands);
      this.isReady = true;
    },
    adapterBKCommands(arr) {
      const obj = {};
      arr.forEach((item) => {
        const { bkId } = item;
        if (!obj[bkId]) obj[bkId] = [];
        obj[bkId].push(item);
      });
      return obj;
    },
    adabterBaseCommand(arr) {
      const { commandsField } = this;
      arr.forEach((item) => {
        item.commands = commandsField(item._id);
      });
      return arr;
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
        min-width: 200px;
        text-align: left;
        padding-left: 28px !important;
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
    &--name {
      font-size: 18px;
      min-width: 150px;
    }
    &--id {
      font-size: 12px;
    }
  }
}
</style>
