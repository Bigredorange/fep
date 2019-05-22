<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>姓名：</span>
          <el-input
            v-model="form.empName"
            placeholder="请输入工单编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>手机号码：</span>
          <el-input
            v-model="form.mobile"
            placeholder="请输入工单名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>证件号码：</span>
          <el-input
            v-model="form.certificateNum"
            placeholder="请输入工单名称"
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
            v-model="form.source"
            placeholder="请输入客户名称"
            style="width: 200px;"
          />
        </div>
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left:20px;"
          @click="getList"
        >
          查询
        </el-button>
        <el-button
          @click="reset"
        >
          重置
        </el-button>
      </section>
    </top-bar>
    <div class="con-table">
      <div class="buttons">
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="add"
        >
          新增
        </el-button>
        <el-button>导出</el-button>
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
        />
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
        />
        <el-table-column
          prop="contactName"
          align="center"
          label="状态"
          :formatter="({ status }) => getStatusName(status)"
        />
        <el-table-column
          prop="source"
          align="center"
          label="来源"
        />
        <el-table-column
          prop="workType"
          align="center"
          label="工种名称"
        />
        <el-table-column
          prop="unit"
          align="center"
          label="是否在线"
        />
        <el-table-column
          prop="workType"
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
              type="text"
              class="primary"
              @click="edit(row)"
            >
              编辑
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        empName: null,
        mobile: null,
        certificateNum: null,
        startTime: null,
        endTime: null,
        source: null,
        status: '',
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
          key: '',
          label: '全部',
        },
      ],
      createTime: [],
    };
  },
  mounted() {
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
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
    edit(row) {
      this.$router.push({ path: 'edit', query: { id: row.id, empId: row.empId } });
    },
    selectDate(val) {
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
          this.$api.disableCustomer({
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
}
</style>
