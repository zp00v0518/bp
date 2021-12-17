<script>
export default {
  data() {
    return {
      activeSportTab: '0',
      activeTournamentTab: '0',
      search: ''
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
        i.name.toLowerCase().includes(v)
      );
    }
  }
};
</script>
