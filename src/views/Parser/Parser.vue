<template>
  <div class="parser">
    <ElButton type="primary" @click="startParse">{{
      `Go parse ${type}`
    }}</ElButton>
  </div>
</template>

<script>
export default {
  name: 'Parser',
  props: ['type'], // type это часть роута
  methods: {
    async startParse() {
      const { $api } = this.$data;
      const message = {
        type: '/goParse',
        commands: this.type
      };
      const response = await $api.get(message);
      console.log(response);
    }
  }
};
</script>

<style lang="scss"></style>
