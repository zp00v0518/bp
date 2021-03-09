<template>
  <div class="mathcing">
    <div class="mathcing__tabs">
      <div
        class="mathcing__tabs__item"
        :class="{ 'mathcing__tabs__item--active': activeTab === tabIndex }"
        v-for="(tab, tabIndex) in tabs"
        :key="tabIndex"
        @click="activeTab = tabIndex"
      >
        {{ tab.sport }}
      </div>
    </div>
    <div class="mathcing__body">
      <div
        class="mathcing__body__row"
        v-for="(item, itemIndex) in values[activeKey]"
        :key="itemIndex"
      >
        <select
          v-model="item.base"
          class="mathcing__body__row__select"
          @focus="activeItem = itemIndex"
        >
          <option value=""></option>
          <option
            v-for="(option, optionIndex) in getBaseOptions(itemIndex)"
            :value="option"
            :key="optionIndex"
          >
            {{ option }}
          </option>
        </select>

        <select
          v-model="item.alias"
          multiple
          :size="activeItem === itemIndex ? '10' : '1'"
          @focus="activeItem = itemIndex"
        >
          <option value=""></option>
          <option
            v-for="(option, optionIndex) in getBaseOptions(itemIndex, true)"
            :value="option"
            :key="optionIndex"
          >
            {{ option }}
          </option>
        </select>
        <!-- <ElSelect
          v-model="item.base"
          class="mathcing__body__row__select"
          filterable
          @change="handlerChangeSelect(item)"
          :value-key="itemIndex"
        >
          <ElOption
            v-for="(option, optionIndex) in tabs[activeTab].commands"
            :value="option"
            :label="option"
            :key="optionIndex"
            :value-key="itemIndex+'m'"
          ></ElOption>
        </ElSelect> -->

        <!-- <ElSelect
          v-model="item.alias"
          filterable
          multiple
          @change="handlerChangeMultiselect(item)"
        >
          <ElOption
            v-for="(option, optionIndex) in tabs[activeTab].commands"
            :value="option"
            :key="optionIndex"
            :label="option"
          ></ElOption>
        </ElSelect> -->
      </div>
    </div>
    <div class="mathcing__footer">
      <button @click="addNewLine">Next</button>
      <button @click="sendData">Send Data</button>
    </div>
  </div>
</template>

<script>
import { ElSelect, ElOption } from 'element-plus';

export default {
  name: 'Matching',
  components: { ElSelect, ElOption },
  data() {
    return {
      tabs: [],
      activeTab: 0,
      values: {},
      activeItem: -1
    };
  },
  watch: {
    '$store.state.global.server.connect': {
      immediate: true,
      handler(e) {
        if (e) {
          this.getDataForMAtching();
        }
      }
    }
  },
  computed: {
    activeKey() {
      const { activeTab, tabs } = this;
      const obj = tabs[activeTab];
      return obj ? tabs[activeTab].sport : '';
    }
  },
  methods: {
    // handlerChangeMultiselect(item) {
    //   const { tabs, activeTab } = this;
    //   const { commands } = tabs[activeTab];
    //   const { alias, lastAlias } = item;
    //   const isAdd = alias.length > lastAlias.length;
    //   let value = alias[alias.length - 1];
    //   if (!isAdd) {
    //     const result = {};
    //     alias.forEach((i) => (result[i] = ''));
    //     lastAlias.forEach((i) => {
    //       if (result[i] === undefined) result[i] = i;
    //     });
    //     value = Object.values(result).filter((i) => !!i)[0];
    //     commands.push(value);
    //   } else {
    //     const index = commands.indexOf(value);
    //     commands.splice(index, 1);
    //   }
    //   item.lastAlias = item.alias;
    //   commands.sort();
    // },

    // handlerChangeSelect(event) {
    // const target = event.target;
    // console.dir(target);
    // const { tabs, activeTab } = this;
    // const { commands } = tabs[activeTab];
    // const index = commands.indexOf(item.base);
    // commands.splice(index, 1);
    // if (item.lastBase) {
    //   commands.push(item.lastBase);
    // }
    // commands.sort();
    // item.lastBase = item.base;
    // },
    async getDataForMAtching() {
      const api = this.$data.$api;
      const message = {
        type: 'get_matching'
      };
      const data = await api.get(message);
      const { payload } = data;
      // payload[0].commands.length = 50;
      // payload[0].commands.reverse();
      this.createTabs(payload);
    },
    createTabs(arr) {
      arr.forEach((item) => {
        this.values[item.sport] = [];
      });
      this.tabs = arr;
    },
    addNewLine() {
      const { activeKey } = this;
      const template = {
        base: '',
        lastBase: '',
        alias: '',
        lastAlias: ''
      };
      this.values[activeKey].push(template);
      // console.log(this.values);
    },
    getBaseOptions(index, isMulti = false) {
      const { activeTab, tabs, values, activeKey } = this;
      const curValue = values[activeKey];
      const usedValues = [];
      curValue.forEach((item, itemIndex) => {
        if (itemIndex === index) {
          isMulti ? usedValues.push(item.base) : usedValues.push(...item.alias);
          return;
        }
        usedValues.push(item.base);
        usedValues.push(...item.alias);
      });
      const { commands } = tabs[activeTab];
      return commands.filter((i) => !usedValues.includes(i));
    },
    sendData() {
      const { values } = this;
      // Object.keys(values).forEach((key) => {
      //   values[key] = values[key].filter(
      //     (item) => item.alias.length > 0 && !!item.base
      //   );
      // });
      const message = {
        type: 'set_matching',
        data: values
      };
      const api = this.$data.$api;
      api.get(message);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  }
};
</script>

<style lang="scss">
.mathcing {
  display: flex;
  flex-direction: column;
  &__tabs {
    display: flex;
    &__item {
      padding: 10px;
      font-size: 16px;
      cursor: pointer;
      text-transform: capitalize;
      border: 1px solid;
      &--active {
        background-color: #d6d6d6;
      }
    }
  }
  &__body {
    &__row {
      margin-bottom: 24px;
      &__select {
        margin-right: 24px;
      }
    }
  }
  &__footer {
    display: flex;
    button {
      padding: 10px;
      cursor: pointer;
      margin: 0 10px;
    }
  }
}
</style>
