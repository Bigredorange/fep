<template>
  <div class="top-bar">
    <ul class="list">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{
          'active': tab.value === value,
          'disabled': tab.value !== value && !!tab.disabled,
        }"
        @click="select(tab)"
      >
        {{ tab.label }}
      </li>
    </ul>
  </div>
</template>

<script>
// tab的数据结构
// type tab {
//   label: string;
//   value: number;
//   disabled?: boolean;
//   message?: string;
// }

export default {
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [Number, String],
      default: null,
    },
  },
  methods: {
    select(tab) {
      if (tab.value === this.value) return;
      if (tab.disabled) {
        this.$message.warning(tab.message);
        return;
      }
      this.$emit('input', tab.value);
      this.$emit('select', tab);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  margin-bottom: 11px;
}
.list {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 26px;
  border-bottom: solid 1px #dce3eb;
  li {
    display: inline-block;
    position: relative;
    text-align: center;
    padding: 8px 14px 0;
    line-height: 32px;
    font-size: 12px;
    color: #333;
    cursor: pointer;
    transition: all 0.3s;
    &::after {
      content: '';
      display: inline-block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 30px;
      height: 2px;
      background-color: transparent;
      transition: all 0.3s;
    }
    &:hover, &.active {
      color: #2d8cf0;
      &::after {
        background-color: #2d8cf0;
      }
    }
    &.disabled {
      color: #999;
    }
  }
}
</style>
