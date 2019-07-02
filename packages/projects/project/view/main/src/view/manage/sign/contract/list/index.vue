<template>
  <div>
    <div class="con-top">
      <div>
        <label>请选择签约模板</label>
        <el-select
          v-model="form.contractTemplateId"
          placeholder="请选择签约模板："
          @change="handleContractChange"
        >
          <el-option
            v-for="item in templateList"
            :key="item.id"
            :label="item.templateName"
            :value="item.id"
          />
        </el-select>
      </div>
      <div>
        <el-button
          type="primary"
          :disabled="!form.contractTemplateId"
          @click="exportTemplate"
        >
          导出模板
        </el-button>
        <el-button
          type="primary"
          :disabled="!form.contractTemplateId"
          @click="importTemplate"
        >
          导入动态信息
        </el-button>
        <el-button
          type="primary"
          @click="generateContracts"
        >
          批量生成合同
        </el-button>
      </div>
    </div>
    <div class="con-table">
      <el-table
        :data="list"
        :loading="listLoading"
        @selection-change="$event => selection = $event.map(item => item.id)"
      >
        <el-table-column
          type="selection"
          align="center"
        />
        <el-table-column
          v-for="(item, index) in cols"
          :key="index"
          :prop="item.key"
          :label="item.key"
          align="center"
        />
        <el-table-column
          prop="createTime"
          align="center"
          label="创建时间"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template
            slot-scope="{ row }"
          >
            <el-button
              type="text"
              class="primary"
              @click="view(row.id)"
            >
              预览合同
            </el-button>
            <el-button
              type="text"
              class="red"
              @click="del(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <affix
        direction="bottom"
        :offset="0"
      >
        <el-pagination
          class="ui-pagination"
          :current-page.sync="form.pageCurrent"
          :page-size="form.pageSize"
          :page-sizes="[20, 40, 60, 80, 100]"
          layout="slot, sizes, prev, pager, next"
          :total="total"
          @current-change="getList"
          @size-change="sizeChange"
        >
          <span class="total">{{ total }} 条记录，共 {{ Math.ceil(total / form.pageSize) }} 页</span>
        </el-pagination>
      </affix>
      <upload-detail ref="uploadDetail" />
      <detail
        ref="contractDetail"
        @update="getList"
      />
    </div>
  </div>
</template>
<script>
import detail from './detail.vue';

export default {
  components: {
    detail,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        contractTemplateId: null,
        contractTemplateName: null,
        pageSize: 20,
        pageCurrent: 1,
      },
      total: 0,
      templateList: [],
      selection: [],
      uploading: false,
      cols: [],
    };
  },
  created() {
    this.getContractTemplateList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getContractDynamicList({
        ...this.form,
      }).then((res) => {
        res.dataList.forEach((item) => {
          const arrData = JSON.parse(item.data);
          arrData.forEach((ele) => {
            item[ele.key] = ele.val;
          });
        });
        this.list = res.dataList;
        if (res.dataList.length > 0) {
          const [first] = res.dataList;
          this.cols = JSON.parse(first.data);
        }
        this.total = res.allCount;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
    exportTemplate() {
      this.$api.exportContractTemplate({
        contractTemplateId: this.form.contractTemplateId,
      }).then((fileId) => {
        this.$api.downloadFileById({
          fileId,
        }).then(blob => this.$utils.autoLoad(new Blob([blob]), this.form.contractTemplateName));
      });
    },
    getContractTemplateList() {
      const { companyId } = this.$store.state.fepUserInfo;
      this.$api.getContractList({
        companyId,
      }).then((res) => {
        this.templateList = res;
      }).finally(() => {
      });
    },
    handleContractChange(id) {
      const temp = this.templateList.find(item => item.id === id);
      this.form.contractTemplateName = `${temp.templateName}.xlsx`;
      this.getList();
    },
    importTemplate() {
      this.$upload({
        multiple: false,
        fileType: 'excel',
      }).then(([item]) => {
        this.uploading = true;
        this.$message.info('导入中...');
        this.$api.importContractDynamic({
          contractTemplateId: this.form.contractTemplateId,
          file: item.file,
        }).then(() => {
          this.$dialogs.confirm({
            content: '合同动态信息导入完成',
            type: 'success',
            showClose: false,
          });
          this.getList();
        }).catch((res) => {
          if (res.status !== 1302) {
            this.$message.error('导入失败');
            return;
          }
          const cols = [];
          Object.keys(res.data.errorData[0]).forEach((key) => {
            const obj = {};
            obj.prop = key;
            obj.label = key;
            obj.align = 'center';
            cols.push(obj);
          });
          this.$refs.uploadDetail.open({
            detail: {
              ...res.data,
              flag: 201,
              msg: res.message,
              fileName: res.fileName,
            },
            cols,
          });
        }).finally(() => {
          this.uploading = false;
        });
      });
    },
    view(id) {
      this.$refs.contractDetail.open(id);
    },
    generateContracts() {
      this.$api.generateContracts(this.selection).then(() => {
        this.$message.success('合同生成成功');
        this.getList();
      });
    },
    del(id) {
      this.$dialogs.confirm({
        title: '提示',
        content: '确定要删除吗',
        onOk: () => {
          this.$api.deleteContractDynamic({
            id,
          }).then(() => {
            this.$message.success('删除成功');
            this.getList();
          });
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.con-top {
  display: flex;
  justify-content: space-between;
  margin: 10px;
  background: #fff;
  padding: 10px;
  border-radius: 10px;
}
.con-table {
  background: #fff;
  padding: 15px 20px;
  border-radius: 10px;
  margin: 0px 8px 8px;
  .buttons {
    display: flex;
    margin-bottom: 16px;
  }
  .grey {
    color: #999999;
  }
  .mouse {
    cursor: pointer;
  }
}
</style>
