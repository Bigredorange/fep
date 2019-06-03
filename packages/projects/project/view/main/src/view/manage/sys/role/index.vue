<template>
  <div class="page">
    <div class="container">
      <div class="left">
        <roles
          :refresh="refresh"
          @setRoleId="$event => roleId = $event"
        />
      </div>
      <div class="right">
        <configs
          :role-id="roleId"
          @update="refresh = true"
          @setRoleId="$event => roleId = $event"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Roles from './Roles.vue';
import Configs from './Configs.vue';

export default {
  components: {
    Roles,
    Configs,
  },
  data() {
    return {
      roleId: null,
      refresh: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  overflow: auto;
  > .topbar {
    margin-bottom: 15px;
    padding: 18px 30px 16px;
    background-color: #fff;
    span {
      font-size: 16px;
      line-height: 1;
      color: #666;
    }
    .second {
      color: #000;
    }
  }
}
.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 1890px;
  width: 100%;
  > .left {
    flex-shrink: 0;
    margin-right: 36px;
    width: 50%;
  }
  > .right {
    flex: 1 0 0;
  }
}
</style>
