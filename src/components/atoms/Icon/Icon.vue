<script>
import choices from './choices';

function chooseIcon(name) {
  return choices[name] || null;
}

export default {
  props: {
    name: { type: String },
    fill: { type: String },
    stroke: { type: String }
  },
  computed: {
    selectedIcon() {
      return chooseIcon(this.name);
    }
  }
};
</script>

<template>
  <component
    :is="selectedIcon"
    :fill="fill"
    :stroke="stroke"
  />
</template>
