<template>
  <div
    class="con"
  >
    <span>您的位置：</span>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbList"
        :key="index"
        :to="gotoPage(item.path, index)"
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
      console.log(this.$route);
      this.breadcrumbList = [];
      this.generateBreadcrumpList();
    },
  },
  mounted() {
    this.generateBreadcrumpList();
  },
  methods: {
    generateBreadcrumpList() {
      const { path } = this.$route;
      console.log(path);
      if (path.includes('/manage')) {
        let pathArr = path.split('/');
        pathArr = pathArr.slice(2);
        pathArr.forEach((pathEle) => {
          this.getTitle(this.menuList, pathEle);
        });
      }
    },
    getTitle(arr, path) {
      const obj = {};
      if (arr) {
        arr.forEach((element) => {
          if (element.path === path) {
            obj.path = path;
            obj.title = element.meta.title;
            this.breadcrumbList.push(obj);
          } else {
            this.getTitle(element.children, path);
          }
        });
      }
      return this.breadcrumbList;
    },
    gotoPage(path, index) {
      const obj = {};
      if (index === 0) {
        obj.path = `/manage/${path}`;
      } else {
        obj.path = `/manage/${this.breadcrumbList[0].path}/${path}`;
      }
      return obj;
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  display: flex;
  width: 100%;
  padding: 10px;
  background: #f8f8f8;
  font-size: 14px;
}
.el-breadcrumb {
  line-height: 19px;
}
</style>
