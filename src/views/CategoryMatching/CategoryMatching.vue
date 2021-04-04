<template>
  <div>CategoryMatching</div>
</template>

<script>
export default {
  name: 'CategoryMatching',
  created() {
    this.getListCategory();
  },
  methods: {
    async getListCategory() {
      if (this.$data.$api.wsInstance.readyState !== 1) {
        setTimeout(() => {
          this.getListCategory();
        }, 100);
      } else {
        const response = await this.$data.$api.get({
          type: '/getListSportCategory'
        });
      }
    }
  }
};
</script>

<style lang="scss"></style>
