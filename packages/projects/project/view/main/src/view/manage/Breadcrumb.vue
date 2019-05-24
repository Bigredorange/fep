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
        :to="gotoPage(item, index)"
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
  mounted() {
    this.generateBreadcrumpList();
  },
  methods: {
    generateBreadcrumpList() {
      const { path } = this.$route;
      this.breadcrumbList = [];
      let pathArr = path.split('/');
      pathArr = pathArr.slice(2);
      pathArr.forEach((pathEle) => {
        this.getTitle(this.menuList, pathEle);
      });
    },
    getTitle(arr, path) {
      const obj = {};
      if (arr) {
        arr.forEach((element) => {
          if (element.path === path && this.$route.path.includes(element.parentPath)) {
            obj.path = path;
            obj.title = element.meta.title;
            if (element.parentPath) {
              obj.parentPath = element.parentPath;
            }
            this.breadcrumbList.push(obj);
          } else {
            this.getTitle(element.children, path);
          }
        });
      }
      return this.breadcrumbList;
    },
    gotoPage(item, index) {
      if (this.breadcrumbList.length - 1 === index) {
        return '';
      }
      let path = '';
      this.breadcrumbList.forEach((ele, i) => {
        if (i <= index) {
          path += `/${ele.parentPath}`;
        }
        if (i === index) {
          path += `/${ele.path}`;
        }
      });
      return path;
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
