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

    <ElTabs tab-position="top" v-model="activeSportTab" ref="container">
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
      loading: null
    };
  },
  created() {},
  methods: {
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
      console.log(response);
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
}
</style>
