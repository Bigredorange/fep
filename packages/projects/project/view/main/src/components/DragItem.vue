<template>
  <div
    :class="s.home"
    ondragstart="return false"
  >
    <slot>default</slot>
  </div>
</template>
<script>
import $ from 'jquery';
// import _ from 'lodash';

export default {
  name: 'DragItem',
  props: {
    value: {
      type: Object,
      default() {
        return {
          origin: 'left-bottom',
          ptX: 0,
          ptY: 0,
        };
      },
    },
    borderWidth: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  watch: {

  },
  async mounted() {
    await this.$nextTick();
    const $el = $(this.$el);

    $el.css('position', 'absolute');
    // $el.find('img').attr('draggable', false)
    $(document).on('mousedown', this.OnStartHandler);
    $(document).on('mouseup', this.OnEndHandler);
    $(document).on('mousemove', this.onMouseMoveHandler);

    if ((this.value && this.value.origin === 'left-bottom') || !this.value.origin) {
      const { pHeight, elWidth, elHeight } = this.getSize($el);
      console.log(pHeight, elWidth, elHeight);
      let newX = this.value.ptX / 0.75;
      let newY = this.value.ptY / 0.75;
      newX -= elWidth / 2;
      newY -= elHeight / 2;
      newY = pHeight - elHeight - newY;
      this.setPosition($el, newX, newY);
    }
  },
  beforeDestroy() {
    $(document).off('mousedown', this.OnStartHandler);
    $(document).off('mouseup', this.OnEndHandler);
    $(document).off('mousemove', this.onMouseMoveHandler);
  },
  methods: {
    onMouseMoveHandler(e) {
      const $el = $(this.$el);

      if (!$el.data('panning')) {
        return;
      }

      const startX = $el.data('startX');
      const startY = $el.data('startY');

      let newX = 0;
      let newY = 0;
      if (!e.targetTouches) { // pand on desktop
        newX = e.pageX - startX;
        newY = e.pageY - startY;
      } else if (e.targetTouches.length === 1) { // pan on mobile device
        newX = e.targetTouches[0].pageX - startX;
        newY = e.targetTouches[0].pageY - startY;
      } else if (e.targetTouches.length > 1) {
        return;
      }

      const {
        pWidth,
        pHeight,
        elWidth,
        elHeight,
      } = this.getSize($el);
      console.log(pHeight);
      if (this.$parent.absolute) {
        $(this.$el.parentNode).height(pHeight);
      }

      if (newX >= pWidth - elWidth) {
        newX = pWidth - elWidth;
      } else if (newX <= 0) {
        newX = 0;
      }
      if (newY > pHeight - elHeight) {
        newY = pHeight - elHeight;
      } else if (newY <= 0) {
        newY = 0;
      }

      this.setPosition($el, newX, newY);

      const position = {
        origin: this.value ? this.value.origin : 'left-bottom',
      };
      if ((this.value && this.value.origin === 'left-bottom') || !this.value.origin) {
        const x = newX;
        const y = pHeight - elHeight - newY;
        position.x = x;
        position.y = y;
        // const originX = elWidth / 2;
        // const originY = elHeight / 2;
        position.ptX = position.x;
        position.ptY = position.y;
        // position.ptX = _.round((position.x + originX) * 0.75, 3);
        // position.ptY = _.round((position.y + originY) * 0.75, 3);
      }

      this.$emit('input', position);
    },
    OnStartHandler(e) {
      const $el = $(this.$el);
      if (!($.contains(this.$el, e.target) || $(e.target).is($el))) {
        return;
      }
      $el.data('panning', true).css('z-index', 1);
      let lastX = 0;
      let lastY = 0;
      const lastTf = $el.css('transform');
      if (lastTf !== 'none') {
        const temp = lastTf.split(',');
        if (lastTf.indexOf('3d') === -1) {
          lastX = parseInt(temp[4], 10);
          lastY = parseInt(temp[5], 10);
        } else {
          lastX = parseInt(temp[12], 10);
          lastY = parseInt(temp[13], 10);
        }
      }
      let startX = 0;
      let startY = 0;
      if (!e.targetTouches) { // pand on desktop
        startX = e.pageX - lastX;
        startY = e.pageY - lastY;
      } else if (e.targetTouches.length === 1) { // pan on mobile device
        startX = e.targetTouches[0].pageX - lastX;
        startY = e.targetTouches[0].pageY - lastY;
      } else if (e.targetTouches.length > 1) {
        return;
      }
      $el.data('startX', startX);
      $el.data('startY', startY);
    },
    OnEndHandler() {
      const $el = $(this.$el);
      if ($el.data('panning')) {
        $el.data('panning', false).css('z-index', '');
      }
    },
    setPosition($el, newX, newY) {
      const lastTf = $el.css('transform');
      if (lastTf === 'none') {
        if (lastTf.indexOf('3d') === -1) {
          $el.css('transform', `matrix(1, 0, 0, 1, ${newX}, ${newY})`);
        } else {
          $el.css('transform', `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, ${newX}, ${newY}, 0, 1)`);
        }
      } else {
        const matrix = lastTf.split(',');
        if (lastTf.indexOf('3d') === -1) {
          matrix[4] = ` ${newX}`;
          matrix[5] = ` ${newY})`;
        } else {
          matrix[12] = ` ${newX}`;
          matrix[13] = ` ${newY}`;
        }
        $el.css('transform', matrix.join(','));
      }
    },
    getSize($el) {
      const { pWidth, pHeight } = this.$parent.getSize();
      const borderWidth = this.borderWidth * 2;
      const elWidth = $el.outerWidth() - borderWidth; // 减去边框
      const elHeight = $el.outerHeight() - borderWidth; // 减去边框
      return {
        pWidth,
        pHeight,
        elWidth,
        elHeight,
      };
    },
  },
};
</script>
<style module="s" lang="scss">
.home {
    display: inline-block;
    cursor: move;
    border: 1px dashed rgba(0, 0, 0, 0.8);

    &,
    * {
        user-select: none;
    }

    img {
        display: block;
    }
}
</style>
