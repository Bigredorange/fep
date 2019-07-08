<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>HRO编号：</span>
          <el-input
            v-model="form.enterpriseNum"
            placeholder="请输入HRO编号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>HRO名称：</span>
          <el-input
            v-model="form.companyName"
            placeholder="请输入HRO名称"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>联系人：</span>
          <el-input
            v-model="form.legalRepresentative"
            placeholder="请输入联系人"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>联系方式：</span>
          <el-input
            v-model="form.contactPhone"
            placeholder="请输入联系方式"
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
          v-if="$p('/hroCompany/hro/list/addHRO')"
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
          prop="enterpriseNum"
          align="center"
          label="HRO编号"
        />
        <el-table-column
          prop="companyName"
          align="center"
          label="HRO名称"
        />
        <el-table-column
          prop="industry"
          align="center"
          label="所属行业"
          :formatter="({ industry }) => $optDicLabel('hroIndustry', industry)"
        />
        <el-table-column
          prop="legalRepresentative"
          align="center"
          label="联系人"
        />
        <el-table-column
          prop="contactPhone"
          align="center"
          label="联系方式"
        />
        <el-table-column
          prop="area"
          align="center"
          label="区域"
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
          align="center"
          label="认证状态"
          :formatter="({ authStatus }) => authStatus === 4 ? '已认证' : '未认证'"
        />
        <!-- <el-table-column
          prop="area"
          align="center"
          label="创建人"
        /> -->
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
              v-if="!row.hroId"
              type="text"
              class="primary"
              @click="$router.push({ path: '/manage/sys/user/edit', query:{ companyId: row.id, type: 'add' } })"
            >
              分配账号
            </el-button>
            <el-button
              v-if="$p('/hroCompany/hro/list/editHRO')"
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
        companyId: null,
        enterpriseNum: null,
        companyName: null,
        legalRepresentative: null,
        contactPhone: null,
        status: 99,
        pageCurrent: 1,
        pageSize: 20,
        startTime: null,
        endTime: null,
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
    const { level, companyId } = this.$store.state.fepUserInfo;
    if (level !== 1) {
      this.form.companyId = companyId;
    }
    this.getList();
  },
  methods: {
    reset() {
      this.$utils.initData.call(this, { include: ['form'] });
      this.getList();
    },
    getList() {
      this.listLoading = true;
      this.$api.getCompanyList({
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
          this.$api.disableCompany({
            id: item.id,
            status: Number(!item.status),
          }).then(() => {
            this.$message.success(`${item.status === 1 ? '禁用' : '启用'}成功`);
            this.getList();
          });
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
  .mouse {
    cursor: pointer;
  }
}
</style>
