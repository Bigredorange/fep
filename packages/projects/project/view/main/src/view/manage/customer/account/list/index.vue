<template>
  <div>
    <top-bar>
      <section>
        <div class="item">
          <span>登陆账号：</span>
          <el-input
            v-model="form.username"
            placeholder="请输入登陆账号"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>姓名：</span>
          <el-input
            v-model="form.name"
            placeholder="请输入姓名"
            style="width: 200px;"
          />
        </div>
        <div class="item">
          <span>手机号码：</span>
          <el-input
            v-model="form.mobile"
            placeholder="请输入手机号码"
            style="width: 200px;"
          />
        </div>
        <!-- <div class="item">
          <span>部门名称：</span>
          <el-input
            v-model="form.companyName"
            placeholder="请输入部门名称"
            style="width: 200px;"
          />
        </div> -->
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
          v-if="$p('/customer/account/list/addCusAccount')"
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
          prop="username"
          align="center"
          label="登陆账号"
        />
        <el-table-column
          prop="name"
          align="center"
          label="姓名"
        />
        <el-table-column
          prop="mobile"
          align="center"
          label="手机号码"
        />
        <!-- <el-table-column
          prop="companyName"
          align="center"
          label="部门名称"
        /> -->
        <!-- <el-table-column
          prop="roleNames"
          align="center"
          label="角色名称"
        /> -->
        <el-table-column
          prop="status"
          align="center"
          label="状态"
        >
          <template
            slot-scope="{ row }"
          >
            <img :src="require(`../../../../../assets/icon/${row.status === 1 ? 'K_abled.png' : 'K_disabled.png'}`)">
            <span
              :class="{'grey': row.status === 0}"
            >
              {{ row.status === 1 ? '启用' : '禁用' }}
            </span>
          </template>
        </el-table-column>
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
              v-if="$p('/customer/account/list/editCusAccount')"
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
        username: null,
        name: null,
        mobile: null,
        companyName: null,
        status: 99,
        pageCurrent: 1,
        pageSize: 20,
        startTime: null,
        endTime: null,
        level: 5,
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
      this.$api.getAccountList({
        ...this.form,
        // level: this.$store.state.fepUserInfo.level,
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
      this.$router.push({ path: 'edit', query: { userId: row.id } });
    },
    selectDate(val) {
      const [start, end] = val;
      this.form.startTime = start;
      this.form.endTime = end;
    },
    add() {
      this.$router.push('edit');
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
