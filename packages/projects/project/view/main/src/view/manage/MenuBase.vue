<template>
  <section :class="['menu-base', {'fold' : fold}]">
    <ul class="menu-list">
      <template v-for="(menu,index) in menuList">
        <li
          v-if="showMenu(menu)"
          :key="index"
        >
          <div
            class="menu-submenu-title"
            :class="{
              'active': isActiveMenu(menu.path),
              'rotate': curIndex === index,
            }"
            @click="selectSubmenu(menu, index)"
          >
            <span>
              {{ menu.meta.title | getTitle }}
            </span>
            <i
              v-if="menu.children && !menu.noDropdown"
              class="arrow"
            />
          </div>
          <transition name="menu-slide">
            <ul
              v-show="curIndex === index && !menu.noDropdown"
              class="menu"
            >
              <template v-for="item in menu.children">
                <li
                  v-if="showSubMenu(item)"
                  :key="item.path"
                >
                  <router-link
                    :to="`/manage/${menu.parentPath}/${menu.path}/${item.path}`"
                    :class="{
                      'subActive': isActiveMenu(`/${menu.path}/${item.path}`)
                    }"
                  >
                    <span>{{ item.meta.title | getTitle }}</span>
                  </router-link>
                </li>
              </template>
            </ul>
          </transition>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
export default {
  filters: {
    getTitle(title) {
      return title.replace('（客服）', '').replace('（财务）', '');
    },
  },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      /**
       * 菜单列表，支持主菜单和次级菜单
       * 当主菜单无次级菜单，传入三个参数
       * @param name {string} 主菜单标题
       * @param icon {string} 主菜单图标路径
       * @param path {string} 主菜单路由路径
       * 当主菜单含次级列表，则主菜单path参数无需传，需传入submenu数组
       * @param name {string} 次级菜单名称
       * @param path {string} 次级菜单路由路径
       */
      fold: false, // 是否折叠菜单
      curIndex: null, // 当前展开子菜单索引
    };
  },
  mounted() {
    this.curIndex = this.getCurIndex();
  },
  methods: {
    getCurIndex() { // 初始化时获取高亮索引
      const index = this.menuList.findIndex((menu) => {
        const rxp = new RegExp(`^/${menu.path}(/{1}.*)?$`);
        return rxp.test(this.$route.path);
      });
      return index;
    },
    selectSubmenu(menu, index) {
      // 当数据含路径参数，则跳转相应路由
      if (!menu.children || menu.noDropdown) {
        this.$router.push(`/manage/${menu.parentPath}/${menu.path}`);
      }
      this.curIndex = index === this.curIndex ? null : index;
    },
    isActiveMenu(path) { // 子菜单是否激活
      // return new RegExp(`^${path}(/{1}.*)?$`).test(this.$route.path);
      return this.$route.path.includes(path);
    },
    isActiveMainMenu(menu) { // 主菜单是否激活
      const isEntry = !menu.children || !menu.children.length || menu.noDropdown;
      return isEntry && this.isActiveMenu(`/${menu.path}`);
    },
    showMenu(menu, parentMenu) { // 是否显示菜单
      const isRight = (route) => { // 是否有权限访问
        const path = parentMenu ? `${parentMenu.path}/${route.path}` : `${route.path}`;
        return this.$p(`/manage/${menu.parentPath}/${path}`);
        // return path;
      };
      return menu && menu.meta.title && !menu.meta.hidden && isRight(menu);
    },
    showSubMenu(menu) { // 是否显示菜单
      const isRight = (route) => { // 是否有权限访问
        const path = `/manage/${menu.parentPath}/${route.path}`;
        return this.$p(path);
        // return path;
      };
      return menu && menu.meta.title && !menu.meta.hidden && isRight(menu);
    },
  },
};
</script>

<style lang="scss" scoped>

.menu-base {
  z-index: 100;
  position: fixed;
  top: 60px;
  left: 0;
  width: 160px;
  height: calc(100vh - 60px);
  padding-top: 14px;
  border-right: 1px solid #d2d2d2;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  color: #000;
  // transition: all 0.3s; // TODO: 后期增加折叠功能后开放
  flex: none;

  &.fold {
    width: 50px;
    .icon {
      margin-right: 20px !important;
    }
    .menu {
      a {
        padding-left: 58px;
      }
    }
  }
}

// 切换按钮
.switch {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  background: #4a5064;
  cursor: pointer;
  span {
    position: absolute;
    top: 15px;
    height: 2px;
    width: 12px;
    background: #fff;
    transition: all 0.2s;
    transform: rotateZ(90deg);
    &:before {
      content: '';
      position: absolute;
      top: -8px;
      height: 2px;
      width: 12px;
      background: #fff;
      transition: all 0.4s;
    }
    &:after {
      content: '';
      position: absolute;
      top: 8px;
      height: 2px;
      width: 12px;
      background: #fff;
      transition: all 0.4s;
    }
  }
  &.fold {
    span {
      height: 1px;
      transform: rotateZ(0);
      &:before {
        height: 1px;
        top: -5px;
      }
      &:after {
        height: 1px;
        top: 5px;
      }
    }
  }
}

// 菜单列表
.menu-list {
  width: 100%;
  font-size: 12px;
  background: #fff;
}

.menu-submenu-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 38px;
  cursor: pointer;
  transition: all 0.3s;
  margin: 0 15px;
  border-bottom: 1px solid #f0f3f6;
  > span {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    color: #76879d;
    font-size: 16px;
    &:hover {
      color: #356fb8;
    }
  }

  .arrow {
    display: inline-block;
    width: 6px;
    height: 4px;
    background-image: url('../../assets/icon/arrow_down.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right;
    transition: all 0.3s;
    margin-right: 8px;
  }
  &.active {
    span {
    color: #356fb8 !important;

    }
  }
  &.rotate {
    .arrow {
      transform: rotateZ(180deg);
    }
  }
  // &:not(.active):hover {
  //   background-color: rgb(153, 147, 147);
  // }
}

.menu {
  overflow: hidden;
  max-height: 400px;
  cursor: pointer;
  background: #fff;
  li {
    a {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 40px;
      color: #555454;
      cursor: pointer;
      padding-left: 50px;
      transition: background 0.3s;
      &:hover {
        background: #fff;
      }
      &.subActive {
        padding-left: 46px !important;
        background-color: #fff;
        border-left: 4px solid #2d8cf0;
        color: #2d8cf0;
        &:hover {
          background-color: #fff;
        }
      }
    }
  }
}
</style>
