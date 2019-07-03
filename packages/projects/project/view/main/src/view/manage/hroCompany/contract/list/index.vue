<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>HRO名称：</span>
          <el-select
            v-model="form.companyId"
            style="width: 200px;"
            placeholder="请选择HRO"
            filterable
            @change="getList"
          >
            <el-option
              v-for="item in companyList"
              :key="item.id"
              :label="item.companyName"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="item">
          <span>合同编号：</span>
          <el-input
            v-model="form.contractNo"
            placeholder="请输入合同编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>合同名称：</span>
          <el-input
            v-model="form.contractName"
            placeholder="请输入合同名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>合同状态：</span>
          <el-select
            v-model="form.contractState"
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
        <div
          class="item"
        >
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
          v-if="$p('/hroCompany/contract/list/addContract')"
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
          prop="companyName"
          align="center"
          label="HRO名称"
        />
        <el-table-column
          prop="contractNo"
          align="center"
          label="合同编号"
        />
        <el-table-column
          prop="contractName"
          align="center"
          label="合同名称"
        />
        <el-table-column
          prop="status"
          align="center"
          label="状态"
        >
          <template
            slot-scope="{ row }"
          >
            <div
              class="mouse"
            >
              <span
                v-if="row.contractState === 0"
              >
                终止
              </span>
              <span
                v-else-if="row.contractState === 1"
              >
                正常
              </span>
              <span
                v-else-if="row.contractState === 2"
              >
                异常
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="signingDate"
          align="center"
          label="签约时间"
        />
        <el-table-column
          prop="contractStartDate"
          align="center"
          label="合作开始日期"
        />
        <el-table-column
          prop="contractEndDate"
          align="center"
          label="合作截止日期"
        />
        <el-table-column
          prop="creator"
          align="center"
          label="创建人"
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
              v-if="$p('/hroCompany/contract/list/editContract')"
              type="text"
              class="primary"
              @click="edit(row)"
            >
              编辑
            </el-button>
            <el-button
              v-if="$p('/hroCompany/contract/list/viewContract')"
              type="text"
              class="primary"
              @click="view(row)"
            >
              查看合同
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
        contractNo: null,
        companyId: null,
        contractName: null,
        contractState: 99,
        pageCurrent: 1,
        pageSize: 20,
      },
      total: 0,
      statusList: [
        {
          key: 0,
          label: '终止',
        },
        {
          key: 1,
          label: '正常',
        },
        {
          key: 2,
          label: '异常',
        },
        {
          key: 99,
          label: '全部',
        },
      ],
      createTime: [],
      companyList: [],
    };
  },
  created() {
    this.getList();
    this.getCompanyList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getCompanyContractList({
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
      this.$router.push({ path: 'edit', query: { id: row.id } });
    },
    view(row) {
      this.$router.push({ path: 'detail', query: { id: row.id } });
    },
    add() {
      this.$router.push('edit');
    },
    getCompanyList() {
      this.$api.getCompanyList({
        pageCurrent: 1,
        pageSize: 1000,
      }).then((res) => {
        this.companyList = res.dataList;
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
  .mouse {
    cursor: pointer;
  }
}
</style>
