<template>
  <ElDialog
    v-model="dialogVisible"
    custom-class="match-tournament__popup"
    top="5vh"
    width="80%"
  >
    <template #title>
      <div class="match-tournament__popup--title">{{ bkName }}</div>
      <div class="match-tournament__popup--subtitle">
        <span class="match-tournament__popup--subtitle--txt"
          >{{ tournametTarget }}
        </span>
        <ElButton type="success">Выбрал</ElButton>
      </div>
      <!-- <div class="match-tournament__popup--btn">
        <ElButton type="success">Выбрал</ElButton>
      </div> -->
    </template>
    <div class="match-tournament__popup__table--wrap">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="3">
              <ElInput
                class="match-tournament__popup--search"
                type="text"
                v-model="search"
              ></ElInput>
            </td>
          </tr>
          <tr v-for="(item, index) in filterData" :key="index">
            <td class="match-tournament__popup--radio">
              <input
                type="radio"
                name="name"
                v-model="choice"
                :value="item._id"
              />
            </td>
            <td class="match-tournament__popup__table--name">
              {{ item.name }}
            </td>
            <td>
              <a :href="item.url" target="_blank" class="a-link">{{
                item.url
              }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </ElDialog>
</template>

<script>
export default {
  name: 'PopupMatchToirnament',
  props: {
    bkName: { type: String, default: '' },
    tournametTarget: { type: String, default: '' },
    data: { type: [Object, Array], default: () => [] }
  },
  computed: {
    filterData() {
      const { search, data } = this;
      const v = search.toLowerCase();
      if (!v) return data;
      return data.filter((i) => i.name.toLowerCase().includes(v));
    }
  },
  data() {
    return {
      dialogVisible: true,
      choice: '',
      search: ''
    };
  }
};
</script>

<style lang="scss">
.match-tournament__popup {
  &--title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: var(--half-base-padding);
  }
  &--subtitle {
    font-size: 18px;
    margin-bottom: var(--double-step);
    display: flex;
    align-items: center;
    &--txt {
      flex-grow: 2;
    }
  }
  &--btn {
    display: flex;
    justify-content: flex-end;
  }
  table {
    width: 100%;
    th,
    td {
      padding: var(--half-base-padding);
    }
    thead {
      tr {
        th {
          position: sticky;
          top: 0;
          background-color: white;
          z-index: 2;
        }
      }
    }
    tbody {
      tr {
        &:nth-child(even) {
          background-color: var(--main-backgroud);
        }
        &:first-child {
          td {
            position: sticky;
            top: 40px;
            background-color: white;
            z-index: 2;
          }
        }
      }
      .match-tournament__popup__table--name {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
  &--radio {
    width: 20px;
  }
  &__table--wrap {
    max-height: 70vh;
    border: 1px solid var(--placeholder);
    border-radius: 4px;
    overflow: hidden;
    overflow-y: auto;
  }
  .el-dialog__body {
    padding-top: 0px;
  }
}
</style>
