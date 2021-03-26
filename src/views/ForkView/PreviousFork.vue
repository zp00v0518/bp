<template>
  <div class="previos-fork">
    <div class="previos-fork__title">Недавние вилки</div>
  </div>
</template>

<script>
export default {
  name: 'PreviousFork',
  created() {
    this.getPreviosFork();
  },
  methods: {
    async getPreviosFork() {
      if (this.$data.$api.wsInstance.readyState !== 1) {
        setTimeout(() => {
          this.getPreviosFork();
        }, 100);
      } else {
        const response = await this.$data.$api.get({ type: '/getPreviousFork' });
				console.log(response);
      }
    }
  }
};
</script>

<style lang="scss">
.previos-fork {
  &__title {
    font-weight: bold;
    font-size: calc(var(--base-font-size) * 1.6);
  }
}
</style>
