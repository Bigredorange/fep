<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="isShow"
      title="结果"
      width="800px"
      class="ui-dialog"
      @close="reset"
    >
      <div class="control">
        <div class="msg">
          <span
            v-if="detail.flag === 200"
            class="success"
          >导入成功！</span>
          <span
            v-else-if="detail.flag === 201 && detail.tip"
            class="fail"
          >{{ detail.tip }}</span>
          <span
            v-else-if="detail.flag === 201"
            class="fail"
          >导入失败！</span>
          {{ detail.msg }}
        </div>
        <div
          v-if="detail.fileId"
          class="btn"
        >
          <el-button
            size="small"
            class="export"
            @click="download"
          >
            下载错误数据
          </el-button>
        </div>
      </div>
      <el-table
        v-if="!!detail.errorData"
        :data="detail.errorData"
        border
        style="width: 100%;margin-bottom:10px;"
        :max-height="$store.state.tableHeight"
      >
        <el-table-column
          v-for="(item, index) in cols"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width"
          :align="item.align || 'left'"
        />
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 用于带表格的错误信息显示
 * type detail = {
    msg: string, // 黑色的错误信息
    flag: number, // 错误码
    errorData: array, // 错误数据表格
    tip?: string, // 默认为导入失败，红色的错误信息
    fileId?: string, // 错误数据文件id
    fileName?: string, // 错误数据文件名
 * }
 */
export default {
  data() {
    return {
      isShow: false,
      detail: {},
      cols: [],
    };
  },
  methods: {
    reset() {
      this.$utils.initData.call(this);
    },
    open(res) {
      // flag 200 正常
      // flag 201 有部分失败
      this.isShow = true;
      this.detail = res.detail;
      this.cols = res.cols;
    },
    download() {
      const { fileId, fileName } = this.detail;
      this.$api.fileDownloadById({
        name: fileName,
        fileId,
      });
    },
    close() {
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.fail {
  color: #f56c6c;
}
.success {
  color: #67C23A;
}
.control {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
