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
        >
          <ElTabPane
            v-for="(tour, tourIndex) in filterTournament"
            :key="tourIndex"
            :label="tour.type_name"
          ></ElTabPane
        ></ElTabs> </ElTabPane
    ></ElTabs>
  </div>
</template>

<script>
import matchMixin from '../matchMixin';

export default {
  name: 'CommandsMatching',
  mixins: [matchMixin],
  data() {
    return {
    };
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
