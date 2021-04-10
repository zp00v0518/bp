<template>
  <div class="match-category">
    <ElButton class="match-category__save" type="primary" @click="saveWork"
      >Сохранить выбор</ElButton
    >
    <ElTabs tab-position="left" @tab-click="handleTabClick" v-model="activeTab">
      <ElTabPane
        :label="tab.name"
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
      >
        <ElTable
          :data="tabs[activeTab].data"
          v-if="tabs[activeTab].data && tabs[activeTab].data.length > 0"
        >
          <ElTableColumn label="Контора" prop="name"></ElTableColumn>
          <ElTableColumn label="Выбор">
            <template #default="scope">
              <ElSelect v-model="scope.row.choiced" clearable filterable>
                <ElOption
                  v-for="item in scope.row.choices"
                  :label="item.name"
                  :value="item._id"
                  :key="item._id"
                ></ElOption>
              </ElSelect>
            </template>
          </ElTableColumn>
          <ElTableColumn label="Url" prop="url">
            <template #default="scope">{{
              getUrlSportCategory(scope)
            }}</template>
          </ElTableColumn>
        </ElTable>
      </ElTabPane>
    </ElTabs>
  </div>
</template>

<script>
import { sortArrByField } from '../../utils';

export default {
  name: 'CategoryMatching',
  created() {
    this.getListCategory();
  },
  data() {
    return {
      tabs: [],
      activeTab: '0',
      tableData: []
    };
  },
  computed: {
    bkList() {
      return this.$store.state.global.bkList;
    }
  },
  methods: {
    getUrlSportCategory({ row }) {
      if (!row.choiced) return '';
      const value = row.choiced;
      const item = row.choices.find((i) => i._id === value);
      return item.url;
    },
    saveWork() {
      const data = this.formatDataForBackEnd();
      const { $api } = this.$data;
      if ($api.wsInstance.readyState !== 1) {
        console.error('Связь утеряна');
        return;
      }
      const message = {
        type: '/saveMatchedSports',
        data
      };
      $api.sendMessage(message);
    },
    formatDataForBackEnd() {
      const { tabs } = this;
      const result = {};
      Object.keys(tabs).forEach((key) => {
        const item = tabs[key];
        const sportName = item.name;
        result[sportName] = {
          ids: []
        };
        item.data.forEach((el) => {
          if (!el.choiced) return;
          result[sportName].ids.push(el.choiced);
        });
      });
      Object.keys(result).forEach((key) => {
        if (result[key].ids.length === 0) delete result[key];
      });
      return result;
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
        await this.getUnsetCategory();
      }
    },
    async getUnsetCategory() {
      const response = await this.$data.$api.get({
        type: '/getUnsetCategory'
      });
      const { bkList } = this;
      if (Object.keys(bkList).length === 0) {
        await this.$store.dispatch('GET_BK_LIST', this.$data.$api);
      }
      const data = this.adaptDataByBkName(response.data);
      this.tabs.forEach((item) => {
        item.data = JSON.parse(JSON.stringify(data));
      });
    },
    adaptDataByBkName(data, field = 'bkId') {
      const result = {};
      const { bkList } = this;
      console.log(bkList);
      data.forEach((item) => {
        const value = item[field];
        if (!result[value]) {
          result[value] = {
            name: bkList[value].name,
            choices: [],
            url: ''
          };
        }
        result[value].choices.push(item);
      });
      Object.values(result).forEach((item) => {
        sortArrByField(item.choices, 'name');
      });
      return Object.values(result);
    }
  }
};
</script>

<style lang="scss">
.match-category {
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
