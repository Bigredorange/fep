<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>姓名：</span>
          <el-input
            v-model.trim="form.empName"
            placeholder="请输入姓名"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>手机号码：</span>
          <el-input
            v-model.trim="form.mobile"
            placeholder="请输入手机号码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>证件号码：</span>
          <el-input
            v-model.trim="form.certificateNum"
            placeholder="请输入证件号码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>状态：</span>
          <el-select
            v-model="form.status"
            style="width: 200px;"
            placeholder="请选择状态"
            @change="getList"
          >
            <el-option
              v-for="item in statusList"
              :key="item.key"
              :label="item.label"
              :value="item.key"
            />
          </el-select>
        </div>
        <div class="item">
          <span>客户名称：</span>
          <el-input
            v-model.trim="form.customerName"
            placeholder="请输入客户名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>创建日期：</span>
          <el-date-picker
            v-model="createTime"
            style="width: 260px;"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
            @change="selectDate"
          />
        </div>
        <div class="item">
          <span>灵工来源：</span>
          <el-input
            v-model.trim="form.source"
            placeholder="请输入灵工来源"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="getList"
          >
            查询
          </el-button>
          <el-button
            @click="reset"
          >
            重置
          </el-button>
        </div>
      </section>
    </top-bar>
    <div class="con-table">
      <div class="buttons">
        <el-button
          v-if="$p('/employee/emp/list/addEmp')"
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >
          新增
        </el-button>
        <el-button
          type="primary"
          @click="importEmployee"
        >
          导入灵工
        </el-button>
        <el-button
          type="primary"
          @click="downTemplate"
        >
          下载模板
        </el-button>
        <el-button @click="exportEmployee">
          导出
        </el-button>
      </div>
      <el-table
        :data="list"
        :loading="listLoading"
      >
        <el-table-column
          prop="archivesNo"
          align="center"
          label="档案编号"
        />
        <el-table-column
          prop="empName"
          align="center"
          label="姓名"
        >
          <template
            slot-scope="{ row }"
          >
            <span
              class="link"
              @click="edit(row)"
            >
              {{ row.empName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mobile"
          align="center"
          label="手机号码"
        />
        <el-table-column
          prop="certificateNum"
          align="center"
          label="证件号码"
        />
        <el-table-column
          prop="sex"
          align="center"
          label="性别"
          :formatter="({ sex }) => $optDicLabel('Sex', sex)"
        />
        <el-table-column
          align="center"
          label="认证状态"
          :formatter="({ authStatus }) => authStatus === 1 ? '已认证' : '未认证'"
        />
        <el-table-column
          prop="contactName"
          align="center"
          label="状态"
        >
          <template
            slot-scope="{ row }"
          >
            <div
              class="mouse"
              @click.stop="disable(row)"
            >
              <img :src="require(`../../../../assets/icon/${row.status === 1 ? 'K_abled.png' : 'K_disabled.png'}`)">
              <span
                :class="{'grey': row.status === 0}"
              >
                {{ row.status === 1 ? '启用' : '禁用' }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="companyName"
          align="center"
          label="来源"
        />
        <!-- <el-table-column
          prop="workType"
          align="center"
          label="工种名称"
          :formatter="({ workType }) => getWorkType(workType)"
        /> -->
        <el-table-column
          prop="state"
          align="center"
          label="是否在线"
        />
        <el-table-column
          prop="createTime"
          align="center"
          label="创建日期"
        />
        <el-table-column
          label="操作"
          align="center"
        >
          <template
            slot-scope="{ row }"
          >
            <el-button
              v-if="$p('/employee/emp/list/editEmp')"
              type="text"
              class="primary"
              @click="edit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="$p('/employee/emp/list/viewEmp')"
              type="text"
              class="primary"
              @click="view(row)"
            >
              查看灵工
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
    </div>
    <upload-detail ref="uploadDetail" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        customerName: null,
        empName: null,
        mobile: null,
        certificateNum: null,
        startTime: null,
        endTime: null,
        source: null,
        status: 99,
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
      statusList: [
        {
          key: 0,
          label: '禁用',
        },
        {
          key: 1,
          label: '启用',
        },
        {
          key: 99,
          label: '全部',
        },
      ],
      createTime: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getEmployeeList({
        ...this.form,
      }).then((res) => {
        this.list = res.dataList;
        this.total = res.allCount;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    getWorkType(workType) {
      const workTypeStr = workType || '';
      return workTypeStr.split(',').map(t => this.$optDicLabel('typeofwork', t)).join('，');
    },
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
    edit(row) {
      this.$router.push({ path: 'edit', query: { id: row.id, empId: row.empId } });
    },
    view(row) {
      this.$router.push({ path: 'detail', query: { id: row.id, empId: row.empId } });
    },
    selectDate(val) {
      if (!val) {
        this.form.startTime = '';
        this.form.endTime = '';
        return;
      }
      const [start, end] = val;
      this.form.startTime = start;
      this.form.endTime = end;
    },
    add() {
      this.$router.push('edit');
    },
    disable(item) {
      this.$dialogs.confirm({
        title: '提示',
        content: `确定要${item.status === 1 ? '禁用' : '启用'}吗？`,
        onOk: () => {
          this.$api.updateEmployeeStatus({
            id: item.id,
            status: Number(!item.status),
          }).then(() => {
            this.$message.success(`${item.status === 1 ? '禁用' : '启用'}成功`);
            this.getList();
          });
        },
      });
    },
    getStatusName(status) {
      let name = '';
      switch (status) {
        case 0:
          name = '禁用';
          break;
        case 1:
          name = '启用';
          break;
        case '':
          break;
      }
      return name;
    },
    importEmployee() {
      this.$upload({
        multiple: false,
        fileType: 'excel',
      }).then(([item]) => {
        this.uploading = true;
        this.$message.info('导入中...');
        this.$api.importEmployee({
          file: item.file,
        }).then(() => {
          this.$dialogs.confirm({
            content: '灵工导入完成',
            type: 'success',
            showClose: false,
          });
          this.getList();
        }).catch((res) => {
          if (res.status !== 1302) {
            this.$message.error('导入失败');
            return;
          }
          this.$refs.uploadDetail.open({
            detail: {
              ...res.data,
              fileName: '灵工错误导入信息',
              flag: 201,
            },
            cols: [
              {
                prop: 'empName',
                label: '姓名',
                align: 'center',
              },
              {
                prop: 'sex',
                label: '性别',
                align: 'center',
              },
              {
                prop: 'mobile',
                label: '手机号码',
                align: 'center',
              },
              {
                prop: 'certificateNum',
                label: '证件号码',
                align: 'center',
              },
              {
                prop: 'errorMsg',
                label: '错误描述',
              },
            ],
          });
        }).finally(() => {
          this.uploading = false;
        });
      });
    },
    exportEmployee() {
      this.$api.exportEmployee({
        ...this.form,
      }).then((res) => {
        this.$api.fileDownloadById({
          fileId: res,
          name: '灵工.xlsx',
        });
      });
    },
    downTemplate() {
      this.$api.downloadTemplate({
        file: 'emp_import.xlsx',
      }).then(blob => this.$utils.autoLoad(new Blob([blob]), '灵工导入模板.xlsx'));
    },
  },
};
</script>
<style lang="scss" scoped>
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
  .link {
    color: #1b559d;
    font-weight: 500;
    cursor: pointer;
  }
}
</style>
