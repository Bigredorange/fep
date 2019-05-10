<template>
  <div class="top-bar">
    <slot />
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  > section {
    display: flex;
    align-items: center;
  }
}
</style>
