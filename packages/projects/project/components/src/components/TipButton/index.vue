<template>
  <el-tooltip
    v-if="disabled && reason"
    effect="dark"
    :content="reason"
    placement="top"
  >
    <el-button
      :class="{ 'is-disabled': disabled }"
      :size="size"
      :type="type"
      :loading="loading"
      @click="clickEvent"
    >
      <slot />
    </el-button>
  </el-tooltip>
  <el-button
    v-else
    :size="size"
    :type="type"
    :loading="loading"
    :disabled="disabled"
    @click="clickEvent"
  >
    <slot />
  </el-button>
</template>

<script>
/**
 * 用于disabled为true的按钮的浮动提示
 */
export default {
  props: {
    reason: { // disabled为true时的浮动提示
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'small',
    },
    type: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickEvent() {
      if (this.disabled) return;
      this.$emit('click');
    },
  },
};
</script>
