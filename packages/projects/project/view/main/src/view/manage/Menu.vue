<template>
  <div>
    <ul class="menu">
      <template v-for="menu in menuList">
        <li
          v-if="showMenu(menu)"
          :key="menu.path"
          class="menu-item"
          :class="{'active': isActiveMenu(menu.path)}"
          @click="$router.push(menu.path)"
        >
          {{ menu.meta.title }}
        </li>
      </template>
    </ul>
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
  methods: {
    isActiveMenu(pathMenu) {
      const { path } = this.$route;
      const pathArr = path.split('/');
      const pathMenuArr = pathMenu.split('/');
      const flag = pathMenuArr.every((item, i) => {
        const tempFlag = item === pathArr[i];
        return tempFlag;
      });
      return flag;
    },
    showMenu(menu) { // 是否显示菜单
      const isRight = (route) => { // 是否有权限访问
        const { path } = route;
        return this.$p(path);
      };
      return menu && menu.meta.title && !menu.meta.hidden && isRight(menu);
    },
  },
};
</script>
<style lang="scss" scoped>
.menu {
  display: flex;
  .menu-item {
    padding: 20px 30px;
    cursor: pointer;
    &:hover {
      background: #356FB8;
    }
    &.active {
      background: #356FB8;
    }
  }
}
</style>
