<template>
  <section :class="['menu-base', {'fold' : fold}]">
    <ul class="menu-list">
      <template v-for="(menu,index) in menuList">
        <li

          :key="index"
        >
          <div
            class="menu-submenu-title"
            :class="{
              'active': isActiveMainMenu(menu.path),
            }"
            @click="selectSubmenu(menu, index)"
          >
            <span>
              {{ menu.meta.title | getTitle }}
            </span>
          </div>
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
  created() {
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
      this.$router.push(menu.path);
      // if (!menu.children || menu.noDropdown) {
      // }
      this.curIndex = index === this.curIndex ? null : index;
    },
    isActiveMainMenu(pathMenu) { // 主菜单是否激活
      const { path } = this.$route;
      const pathArr = path.split('/');
      const pathMenuArr = pathMenu.split('/');
      const flag = pathMenuArr.every((item, i) => {
        const tempFlag = item === pathArr[i];
        return tempFlag;
      });
      return flag;
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
  width: 14rem;
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
  margin: 0 1rem;
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
