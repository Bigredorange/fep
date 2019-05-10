<template>
  <div
    class="preview"
    @click="close"
  >
    <img :src="src">
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: null,
    },
  },
  mounted() {
    document.body.appendChild(this.$el);
  },
  methods: {
    close() {
      this.$destroy();
      document.body.removeChild(this.$el);
    },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  padding: 30px;
  background-color: rgba(#000, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  user-select: none;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
