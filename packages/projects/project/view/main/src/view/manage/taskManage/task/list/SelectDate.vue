<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    append-to-body
    width="600px"
  >
    <div class="center">
      <el-date-picker
        v-model="date"
        align="right"
        type="datetime"
        placeholder="选择日期"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
      />
    </div>
    <div slot="footer">
      <el-button
        size="small"
        @click="isShow = false"
      >
        取消
      </el-button>
      <el-button
        type="primary"
        size="small"
        @click="confirm"
      >
        确定
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      title: null,
      date: new Date().getTime(),
      row: null,
    };
  },
  methods: {
    open(row, title) {
      this.isShow = true;
      this.date = null;
      this.row = JSON.parse(JSON.stringify(row));
      this.title = title;
    },
    confirm() {
      this.$emit('confirm', { date: this.date, row: this.row });
    },
    close() {
      this.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
}
</style>
