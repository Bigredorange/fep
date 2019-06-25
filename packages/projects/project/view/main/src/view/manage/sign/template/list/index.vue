<template>
  <div class="con">
    <div
      v-for="item in list"
      :key="item.id"
      class="item"
    >
      <img
        class="img"
        src="../../../../../assets/icon/contractT.png"
      >
      <!-- <img
        src="item.sealUrl"
      > -->
      <p>{{ item.templateName }}</p>
      <div class="btn">
        <el-button
          class="primary edit"
          type="text"
          @click="$router.push({ path: 'edit', query: {id : item.id } })"
        >
          编辑
        </el-button>
        <div class="con-icon">
          <i class="el-icon-delete icon" />
        </div>
      </div>
    </div>
    <div
      class="item"
    >
      <!-- <img> -->
      <i
        class="el-icon-plus add"
        @click="$router.push('edit')"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const { companyId } = this.$store.state.fepUserInfo;
      this.$api.getContractList({
        companyId,
      }).then((res) => {
        this.list = res;
      }).finally(() => {
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  background: #fff;
  margin: 10px;
  border-radius: 8px;
  height: calc(100vh - 102px);
  padding: 15px 10px;
  display: flex;
  .item {
    width: 10%;
    height: 220px;
    text-align: center;
    border: 1px solid #F3F3F3;
    margin: 10px;
    padding: 10px;
    position: relative;
    .img {
      margin-top: 10px;
    }
    .btn {
      display: flex;
      border-top: 1px solid #f0f0f0;
      position: absolute;
      left: 0;
      bottom: 0;
      justify-content: space-between;
      width: 100%;
      .edit {
        flex: 4;
      }
      .con-icon {
        float: right;
        flex: 2;
        border-left: 1px solid #f0f0f0;
      }
      .icon {
        line-height: 36px;
        cursor: pointer;
      }
    }
    .add {
      margin-top: 45%;
      cursor: pointer;
      font-size: 50px;
      color: #6D7074;
    }
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
