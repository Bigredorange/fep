<template>
  <div class="work-list">
    <el-button
      type="primary"
      class="add-btn"
      size="small"
      @click="addRow"
    >
      + 新增列
    </el-button>
    <el-table
      :data="list"
      :loading="listLoading"
    >
      <el-table-column
        prop="workType"
        align="center"
        label="工种"
      >
        <template slot-scope="{ $index, row }">
          <el-select
            v-if="row.isEdit"
            v-model="list[$index].workType"
            placeholder="请选择工种类型"
          >
            <el-option
              v-for="item in $opt('typeofwork')"
              :key="item.id"
              :label="item.dictValue"
              :value="item.dictKey"
            />
          </el-select>
          <span v-else>{{ $optDicLabel('typeofwork', row.workType) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="startDate"
        align="center"
        label="开始日期"
      >
        <template slot-scope="{ $index, row }">
          <el-date-picker
            v-if="row.isEdit"
            v-model="list[$index].startDate"
            type="date"
            placeholder="选择开始日期"
            value-format="yyyy-MM-dd"
          />
          <span v-else>{{ row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="endDate"
        align="center"
        label="结束日期"
      >
        <template slot-scope="{ $index, row }">
          <el-date-picker
            v-if="row.isEdit"
            v-model="list[$index].endDate"
            type="date"
            placeholder="选择结束日期"
            value-format="yyyy-MM-dd"
          />
          <span v-else>{{ row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="workArea"
        align="center"
        label="工作区域"
      >
        <template slot-scope="{ $index, row }">
          <el-input
            v-if="row.isEdit"
            v-model="list[$index].workArea"
            type="text"
          />
          <span v-else>{{ row.workArea }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column
            prop="area"
            align="center"
            label="创建人"
      />-->
      <el-table-column
        align="center"
        label="操作"
      >
        <template slot-scope="{ $index, row }">
          <el-button
            v-if="row.isEdit"
            type="text"
            class="success"
            @click="save(row)"
          >
            {{ row.id ? '保存' : '新增' }}
          </el-button>
          <el-button
            v-else
            type="text"
            class="primary"
            @click="edit($index)"
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    employeeId: {
      type: [Number, String],
      default: null,
    },
  },
  data() {
    return {
      list: [],
      listLoading: false,
      workTypeItems: [],
      initRow: {
        workType: null,
        startDate: null,
        endDate: null,
        workArea: null,
        isEdit: true,
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      this.$api
        .getEmployeeWorkList({
          id: this.employeeId,
        })
        .then((res) => {
          this.list = res;
        })
        .finally(() => {
          this.listLoading = false;
        });
    },
    save(row) {
      if (!row.workType) {
        this.$message.warning('工种不能为空');
        return;
      }
      if (!row.startDate) {
        this.$message.warning('开始日期不能为空');
        return;
      }
      if (!row.startDate) {
        this.$message.warning('结束日期不能为空');
        return;
      }

      let api;
      let params = {};
      if (row.id) {
        api = 'updateEmployeeWork';
        params = { ...row };
        delete params.isEdit;
      } else {
        api = 'addEmployeeWork';
        params = { ...row, id: this.employeeId };
        delete params.isEdit;
      }

      this.$api[api](params)
        .then(() => {
          this.$message.success(row.id ? '保存成功' : '新增成功');
          this.getList();
        })
        .finally(() => {});
    },
    edit(index) {
      this.list[index].isEdit = true;
      this.$set(this.list, index, this.list[index]);
    },
    addRow() {
      this.list.push({ ...this.initRow });
    },
  },
};
</script>
<style lang="scss" scoped>
.work-list {
  width: 100%;
  .el-table {
    margin-top: 10px;
  }
}
</style>
