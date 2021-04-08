<template>
  <ElTabs tab-position="top" @tab-click="handleTabClick">
    <ElTabPane
      :label="tab.name"
      v-for="(tab, tabIndex) in tabs"
      :key="tabIndex"
    >
      <ElTable :data="tableData" v-if="tableData.length > 0">
        <ElTableColumn label="Контора" prop="name"></ElTableColumn>
        <ElTableColumn label="Выбор">
          <template #default="scope">
            <ElSelect v-model="scope.row.value" clearable @change="handlerChange($event, scope)">
              <ElOption
                v-for="item in scope.row.choices"
                :label="item.name"
                :value="item.name"
                :key="item.name"
              ></ElOption>
            </ElSelect>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Url" prop="url"></ElTableColumn>
      </ElTable>
    </ElTabPane>
  </ElTabs>
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
    // TODO: остановился здесь
    handlerChange(){
      console.log(...arguments);
    },
    handleTabClick({ index }) {
      this.activeTab = index;
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
      this.tableData = this.adaptDataByBkName(response.data);
      console.log(this.tableData);
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

<style lang="scss"></style>
