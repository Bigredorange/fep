<template>
  <div>
    <head-top :menu-list="$store.state.permission.routes" />
    <menu-base
      :menu-list="submenuList"
    />
    <breadcrumb
      class="breadcrump"
      :menu-list="$store.state.permission.routes"
    />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
// import routes from '@fep-project-lib/routes';
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
      // menuList: [],
      submenuList: [],
    };
  },
  watch: {
    $route() {
      this.getSubmenuList();
    },
    // menuList(val) {
    //   this.setParentPath(val);
    // },
  },
  created() {
    // this.menuList = routes.main[0].children;
    // this.setParentPath(this.menuList);
    this.getSubmenuList();
  },
  methods: {
    getSubmenuList() {
      const { path } = this.$route;
      const pathArr = path.split('/');
      pathArr.shift();
      const [first, second] = pathArr;
      this.submenuList = [];
      const temp = this.$store.state.permission.routes.find(menu => menu.path === `/${first}/${second}`);
      this.submenuList = temp.children;
      // this.submenuList = temp.children.map((ele) => {
      //   ele.parentPath = second;
      //   return ele;
      // });
    },
    // setParentPath(arr) {
    //   arr.forEach((element) => {
    //     element.parentPath = 'manage';
    //     if (element.children) {
    //       element.children.map((ele) => {
    //         ele.parentPath = element.path;
    //         // todo  改成递归方式
    //         if (ele.children) {
    //           ele.children.forEach((e) => {
    //             e.parentPath = `${ele.parentPath}/${ele.path}`;
    //           });
    //         }
    //         return ele;
    //       });
    //     }
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>
.breadcrump {
  z-index: 100;
  position: fixed;
  top: 60px;
  left: 14rem;
}
.container {
  padding: 100px 0 0 14rem;
  background: #f3f6fb;
  height: 100vh;
}
</style>
