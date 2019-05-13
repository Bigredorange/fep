<template>
  <div>
    <head-top />
    <menu-base :menu-list="menuList" />
    <breadcrumb
      class="breadcrump"
      :menu-list="menuList"
    />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import routes from '@fep-project-lib/routes';
import HeadTop from './HeadTop.vue';
import MenuBase from './MenuBase.vue';
import Breadcrumb from './Breadcrumb.vue';

export default {
  components: {
    HeadTop,
    MenuBase,
    Breadcrumb,
  },
  data() {
    return {
      menuList: routes.main[0].children,
    };
  },
};
</script>
<style lang="scss" scoped>
.breadcrump {
  z-index: 100;
  position: fixed;
  top: 60px;
  left: 160px;
}
.container {
  padding: 100px 0 0 160px;
}
</style>
