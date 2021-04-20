<template>
  <component :is="currentComp"></component>
</template>

<script>
import SportMatching from './SportMatching';
import TournamentMatching from './TournamentMatching';
import CommandsMatching from './CommandsMatching';

export default {
  name: 'CategoryMatching',
  props: ['type'],
  data() {
    return {
      listComponents: {
        sport: SportMatching,
        tournament: TournamentMatching,
        commands: CommandsMatching
      }
    };
  },
  computed: {
    currentComp() {
      return this.listComponents[this.type] || 'div';
    }
  }
};
</script>

<style lang="scss"></style>
