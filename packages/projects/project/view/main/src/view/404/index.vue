<template>
  <div class="app">
    <figure>
      <img src="./assets/no-found.jpg">
    </figure>
    <p class="notice">
      抱歉您访问的页面不存在或者正在开发中。。。
    </p>
    <p
      class="back"
      @click="back"
    >
      点击返回上一个页面
    </p>
  </div>
</template>

<script>
export default {
  async beforeRouteEnter(to, from, next) {
    /**
     * 移除全局加载动画
     */
    document.querySelector('#global-loading').style.display = 'none';

    next();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}

figure {
  margin-bottom: 20px;
}

.notice {
  font-size: 24px;
  margin-bottom: 10px;
  color: #aaa;
}

.back {
  font-size: 16px;
  &:hover {
    cursor: pointer;
    color: #2D8CF0;
  }
}
</style>
