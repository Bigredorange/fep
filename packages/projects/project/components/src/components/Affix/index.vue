<template>
  <div>
    <div
      ref="point"
      :class="{ affix: styles }"
      :style="styles"
    >
      <slot />
    </div>
    <!-- 元素占位符 -->
    <div
      v-show="styles"
      :style="slotStyle"
    />
  </div>
</template>

<script>
export default {
  props: {
    direction: { // 固定方向
      type: String,
      default: null,
    },
    offset: { // 偏移量
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      styles: null,
      slotStyle: null,
    };
  },
  mounted() {
    /**
     * 初始化回调函数并主动触发一次
     */
    this.handleScroll = this.$utils.throttle(this.handleScroll(this.$el, {
      direction: this.direction,
      offset: this.offset,
    }));
    this.handleScroll();
    document.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  },
  /**
   * 在缓存组件时放弃监听
   */
  activated() {
    document.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
  },
  deactivated() {
    document.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
  },
  methods: {
    getScroll(direction = 'top') {
      /**
       * 获取指定方向上已滚动尺寸
       * @param {String} direction 滚动方向 top left
       * @return {Number} 滚动尺寸
       */
      const prop = direction === 'top' ? 'pageYOffset' : 'pageXOffset';
      return window[prop];
    },
    getOffset(element) {
      /**
       * 获取指定方向上偏移大小
       * @param {Element} element
       * @return {Object} top和left方向偏移大小
       */
      const rect = element.getBoundingClientRect();
      const scrollTop = this.getScroll('top');
      const scrollLeft = this.getScroll('left');
      const bodyElement = window.document.body;
      const clientTop = bodyElement.clientTop || 0;
      const clientLeft = bodyElement.clientLeft || 0;

      return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft,
      };
    },
    handleScroll(el, { offset, direction }) {
      let isFixed = false;
      return () => {
        const scrollTop = this.getScroll('top');
        const elOffset = this.getOffset(el);
        const windowHeight = window.innerHeight;
        const elHeight = el.offsetHeight;

        if (direction === 'top') {
          if (!isFixed && (elOffset.top - offset) < scrollTop) {
            isFixed = true;
            this.styles = {
              top: `${offset}px`,
              left: `${elOffset.left}px`,
            };
            this.slotStyle = {
              width: `${this.$refs.point.clientWidth}px`,
              height: `${this.$refs.point.clientHeight}px`,
            };
          } else if (isFixed && (elOffset.top - offset) > scrollTop) {
            isFixed = false;
            this.styles = null;
          }
        } else if (direction === 'bottom') {
          if (!isFixed && (elOffset.top + offset + elHeight) > (scrollTop + windowHeight)) {
            isFixed = true;
            this.styles = {
              bottom: `${offset}px`,
              left: `${elOffset.left}px`,
            };
            this.slotStyle = {
              width: `${this.$refs.point.clientWidth}px`,
              height: `${this.$refs.point.clientHeight}px`,
            };
          } else if (isFixed && (elOffset.top + offset + elHeight) < (scrollTop + windowHeight)) {
            isFixed = false;
            this.styles = null;
          }
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.affix {
  z-index: 10;
  position: fixed;
  width: 100%;
}
</style>
