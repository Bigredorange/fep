<template>
  <span
    class="checkbox"
    :class="{ 'checked': value }"
    @click="check"
  >
    <i class="circle" />
  </span>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    check() {
      this.$emit('input', !this.value);
      this.$emit('change', !this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
$blue: #0083dc;
$gray: #c7d5df;

.checkbox {
  display: inline-block;
  box-sizing: border-box;
  width: 40px;
  height: 24px;
  padding: 2px;
  border-radius: 12px;
  background-color: $gray;
  text-align: left;
  line-height: 1;
  cursor: pointer;
  &.checked {
    background-color: $blue;
    .circle {
      left: 16px;
    }
  }
  .circle {
    position: relative;
    top: 0;
    left: 0;
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 11px;
    background-color: #fff;
    transition: left 0.3s;
  }
}
</style>
