<template>
  <div
    class="con"
  >
    <el-button
      icon="el-icon-back"
      class="back"
      @click="$router.go(-1)"
    >
      返回
    </el-button>
    <span class="loc">您的位置：</span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="item.path"
      >
        {{ item.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      breadcrumbList: [],
    };
  },
  watch: {
    $route() {
      this.generateBreadcrumpList();
    },
    menuList() {
      this.generateBreadcrumpList();
    },
  },
  created() {
    this.generateBreadcrumpList();
  },
  methods: {
    generateBreadcrumpList() {
      const { path } = this.$route;
      this.breadcrumbList = [];
      let pathArr = path.split('/');
      pathArr = pathArr.slice(2);
      let subPath = '/manage';
      pathArr.forEach((pathEle) => {
        subPath += `/${pathEle}`;
        this.getTitle(this.menuList, subPath);
      });
    },
    getTitle(arr, subPath) {
      arr.forEach((element) => {
        if (subPath === element.path) {
          const obj = {};
          obj.path = element.path;
          obj.title = element.meta.title;
          this.breadcrumbList.push(JSON.parse(JSON.stringify(obj)));
        }
        this.getTitle(element.children, subPath);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  .back {
    width: 60px;
    height: 22px;
    background-color: #ffffff;
    border-radius: 11px;
    padding: 0;
    color: #70829a;
    font-size: 12px;
    margin-right: 20px;
    &:hover {
      background-color: #ecf5ff;
    }
  }
  display: flex;
  width: 100%;
  padding: 10px;
  background: #fff;
  font-size: 12px;
  .loc {
   color: #76879d;
   line-height: 22px;
  }
}
.el-breadcrumb {
  line-height: 22px;
}
</style>
