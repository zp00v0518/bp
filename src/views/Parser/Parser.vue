<template>
  <div class="parser">
    <ElButton type="primary" @click="startParse" :disabled="isDisabled">{{
      `Go parse ${type}`
    }}</ElButton>
  </div>
</template>

<script>
export default {
  name: 'Parser',
  props: ['type'], // type это часть роута
  data() {
    return {
      isDisabled: false
    };
  },
  methods: {
    async startParse() {
      const { $api } = this.$data;
      this.isDisabled = true;
      const message = {
        type: '/goParse',
        target: this.type
      };
      await $api.get(message);
      this.isDisabled = false;
    }
  }
};
</script>

<style lang="scss"></style>
