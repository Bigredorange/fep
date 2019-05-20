<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>字典码：</span>
          <el-input
            v-model="form.code"
            placeholder="请输入字典码"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>字典键：</span>
          <el-input
            v-model="form.dictKey"
            placeholder="请输入姓名"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>字典值：</span>
          <el-input
            v-model="form.dictValue"
            placeholder="请输入键值"
            style="width: 200px;"
          />
        </div>
        <!-- <div class="item">
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
        </div> -->
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
      </div>
      <el-table
        :data="list"
        :loading="listLoading"
      >
        <el-table-column
          prop="code"
          align="center"
          label="字典码"
        />
        <el-table-column
          prop="dictKey"
          align="center"
          label="字典键"
        />
        <el-table-column
          prop="dictValue"
          align="center"
          label="字典值"
        />
        <el-table-column
          prop="sort"
          align="center"
          label="排序"
        />
        <el-table-column
          prop="remark"
          align="center"
          label="备注"
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
            <el-button
              type="text"
              class="danger"
              @click="deleteDict(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <affix
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
      </affix> -->
    </div>
    <AddDictionary
      ref="AddDictionary"
      @update="getList"
    />
  </div>
</template>
<script>
import AddDictionary from './AddDictionary.vue';

export default {
  components: {
    AddDictionary,
  },
  data() {
    return {
      list: [],
      listLoading: false,
      form: {
        code: null,
        dictKey: null,
        dictValue: null,
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
      this.$api.getDictList({
        ...this.form,
      }).then((res) => {
        this.list = res;
      }).finally(() => {
        this.listLoading = false;
      });
    },
    sizeChange(n) {
      this.form.pageSize = n;
      this.getList();
    },
    edit(row) {
      const formData = {
        id: row.id,
        sort: row.sort,
        dictKey: row.dictKey,
        dictValue: row.dictValue,
        code: row.code,
        remark: row.remark,
      };
      this.$refs.AddDictionary.open({ ...formData });
    },
    add() {
      this.$refs.AddDictionary.open();
    },
    deleteDict(row) {
      this.$dialogs.confirm({
        content: '确定删除该字典？',
        sync: true,
        onOk: () => this.$api.deleteDict({
          id: row.id,
        }),
        onResolve: () => {
          this.$message.success('删除成功');
          this.getList();
        },
      });
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
}
</style>
