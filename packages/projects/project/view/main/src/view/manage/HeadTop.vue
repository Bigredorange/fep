<template>
  <div>
    <div class="header">
      <div class="topbar-left">
        <img
          src="../../assets/icon/fep.png"
          @click="$router.push('/')"
        >
      </div>
      <menus
        class="menu"
        :menu-list="menuList"
      />
      <div class="topbar-right">
        <div
          v-clickoutside="() => showDropdown = false"
          class="selector"
          @click="showDropdown = !showDropdown;"
        >
          <img
            src="../../assets/icon/user_h.png"
            alt=""
            height="14"
            width="14"
          >
          <span>{{ $store.state.fepUserInfo.username }}</span>
          <img
            src="../../assets/icon/drop-down2.png"
            alt=""
          >
          <transition name="select-slide">
            <ul
              v-show="showDropdown"
              class="dropdown-menu"
            >
              <li @click="$refs.selfInfo.open()">
                个人信息
              </li>
              <li
                @click="handleAuthentic"
              >
                实名认证
              </li>
              <li @click="$refs.modifyPassword.open()">
                修改密码
              </li>
              <li @click="quit">
                退出登录
              </li>
            </ul>
          </transition>
        </div>
      </div>
    </div>
    <!-- 组织架构 -->
    <organization ref="organization" />
    <!-- 个人信息 -->
    <self-info ref="selfInfo" />
    <!-- 修改密码 -->
    <modify-password
      ref="modifyPassword"
      @reset="resetPassword"
    />
    <authentic-person
      ref="authenticPerson"
    />
  </div>
</template>

<script>
// import Menu from './Menu.vue';
import Menus from './Menu.vue';
import AuthenticPerson from './hroCompany/authentic/AuthenticPerson.vue';

export default {
  components: {
    Menus,
    AuthenticPerson,
  },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showDropdown: false,
      // 是否全屏
      isFullScreen: false,
      showSystemDropdown: false,
    };
  },
  computed: {
    privilege() {
      const { privileges } = this.$store.state.fepUserInfo;
      return privileges ? privileges.split(',') : [];
    },
  },
  created() {
    // 全屏相关
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener('mozfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener('webkitfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen;
    });
    document.addEventListener('msfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen;
    });
  },
  methods: {
    resetPassword() {
      setTimeout(() => this.quit(), 400);
    },
    quit() {
      // 退出删除本地个人信息和token
      this.$store.dispatch('logout');
      this.$message('正在登出...');
    },
    // 刷新
    refresh() {
      this.$router.go(0);
    },
    // 全屏
    handleFullScreen() {
      const main = document.getElementById('app');
      if (this.isFullScreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
    },
    // 建议反馈
    advice() {
      this.$refs.leftBar.startMove();
    },
    tabSystem(link) {
      window.location.href = link;
    },
    handleAuthentic() {
      if (this.$store.state.fepUserInfo.authStatus === 1) {
        this.$message.info('您已经实名认证了，无需再实名');
        return;
      }
      this.$refs.authenticPerson.open();
    },
  },
};
</script>

<style lang="scss" scoped>

.header {
  z-index: 101;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background: #538CD3;
  color: #fff;
  font-size: 14px;
  box-shadow: 0 2px 1px 1px hsla(0, 0%, 39%, 0.1);
}

.topbar-left {
  width: 14rem;
  height: 4rem;
  text-align: center;
  line-height: 4rem;
  font-size: 0;
  img {
    cursor: pointer;
    vertical-align: middle;
    &:hover {
      opacity: 0.7;
    }
  }
}

.topbar-right {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-right: 14px;
  .buttons-list {
    display: flex;
    align-items: center;
    li {
      display: flex;
      align-items: center;
      padding: 2px 20px;
      border-left: 1px solid #2a82de;
      img {
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
}

.selector {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #629BE2;
  border-radius: 5px;
  // width: 140px;
  border-radius: 20px;
  cursor: pointer;
  span {
    // margin-left: 8px;
    // margin-right: 20px;
    margin: 0 15px;
  }
}
// 右侧个人下拉菜单
.dropdown-menu {
  position: absolute;
  top: 40px;
  width: 100px;
  color: #333;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transform-origin: top center;
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    &:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }
    &:hover {
      cursor: pointer;
      background-color: #f3f4f5;
    }
  }
}

// 消息
.message {
  position: relative;
  font-size: 0;
  cursor: pointer;
  img {
    width: 24px;
    height: 16px;
  }
  .red-point {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #fa5e5e;
  }
}
.menu {
  left: 14rem;
  position: fixed;
}
</style>
