<template>
  <div
    v-if="tabs.length"
    class="tabs"
  >
    <span
      v-for="(tab, index) in tabs"
      :key="index"
      class="tab"
      :class="{
        'active': value === (tab.value === undefined ? tab : tab.value),
        'disabled': !!tab.disabled,
      }"
      @click="handleClick(tab)"
    >{{ tab && tab.label || tab }}</span>
    <i class="gap" />
    <slot />
  </div>
</template>

<script>
/**
 * type tab {
 *  label: '深圳',
 *  value?: 'sz',
 * }
 * 例如：
 * tabs = [{
 *  label: '深圳',
 *  value: 'sz',
 * }];
 * tabs = ['深圳', '广州'];
 */

export default {
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
  },
  watch: {
    value(value) {
      this.$emit('input', value);
    },
  },
  methods: {
    handleClick(tab) {
      if (tab.disabled) return;
      const value = tab.value === undefined ? tab : tab.value;
      if (value === this.value) return;
      this.$emit('input', value);
      this.$emit('select', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dce3eb;
  padding-right: 22px;
}
.tab {
  flex-shrink: 0;
  text-align: center;
  padding: 0 14px;
  line-height: 34px;
  font-size: 12px;
  color: #333;
  border-top: 1px solid #dce3eb;
  border-right: 1px solid #dce3eb;
  border-bottom: 1px solid #dce3eb;
  margin-bottom: -1px;
  background-color: #f5f5f5;
  cursor: pointer;
  &:first-child {
    border-left: 1px solid #dce3eb;
  }
  &.active {
    border-top: 2px solid #00a2ca;
    border-bottom: 1px solid #fff;
    background-color: #fff;
    color: #33a2ef;
    &:hover {
      cursor: default;
    }
  }
  &.disabled {
    color: #999;
    cursor: not-allowed;
  }
  &:not(.disabled):hover {
    color: #33a2ef;
    background-color: #fff;
  }
}
.gap {
  margin-left: 20px;
}
</style>
