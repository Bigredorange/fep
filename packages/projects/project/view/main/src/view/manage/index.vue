<template>
  <div>
    <head-top :menu-list="menuList" />
    <menu-base
      :menu-list="submenuList"
    />
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
      submenuList: [],
    };
  },
  watch: {
    $route() {
      console.log(routes.main[0].children);
      this.getSubmenuList();
    },
  },
  mounted() {
    this.getSubmenuList();
  },
  methods: {
    getSubmenuList() {
      const { path } = this.$route;
      const pathArr = path.split('/');
      pathArr.shift();
      const [, second] = pathArr;
      this.submenuList = [];
      const temp = this.menuList.find(menu => menu.path === second);
      this.submenuList = temp.children.map((ele) => {
        ele.parentPath = second;
        return ele;
      });
    },
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
  background: #f3f6fb;
  height: 100vh;
}
</style>
