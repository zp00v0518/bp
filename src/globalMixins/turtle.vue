<script>
export default {
  data() {
    return {
      turtleTimeout: null
    };
  },
  methods: {
    turtle(callback, time = 50) {
      if (this.turtleTimeout) {
        this.turtleTimeout = clearTimeout(this.turtleTimeout);
      }
      this.turtleTimeout = setTimeout(() => {
        callback();
      }, time);
    }
  }
};
</script>
