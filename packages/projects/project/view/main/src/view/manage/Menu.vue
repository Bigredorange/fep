<template>
  <div>
    <ul class="menu">
      <li
        v-for="menu in menuList"
        :key="menu.path"
        class="menu-item"
        :class="{'active': isActiveMenu(menu.path)}"
        @click="$router.push(`/manage/${menu.path}`)"
      >
        {{ menu.meta.title }}
      </li>
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
    isActiveMenu(path) {
      return this.$route.path.includes(path);
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
