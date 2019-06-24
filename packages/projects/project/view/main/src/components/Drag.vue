<template>
  <div>
    <slot>
      defalut
    </slot>
  </div>
</template>
<script>
export default {
  name: 'Drag',
  props: {
    absolute: {
      type: Boolean,
      efault: false,
    },
  },
  data() {
    return {
    };
  },
  // computed: {
  //   homeClass() {
  //     const rs = {
  //       [this.s.home]: true,
  //       [this.s.absolute]: this.absolute,
  //     };
  //     return rs;
  //   },
  // },
  watch: {
  },
  methods: {
    getSize() {
      console.log(this.$el);
      const pWidth = this.$el.parentNode.clientWidth;
      const pHeight = this.$el.parentNode.clientHeight;
      return {
        pWidth,
        pHeight,
      };
    },
  },
};
</script>
<style module="s" lang="scss">
.home {
  user-select: none;
}

.absolute {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
